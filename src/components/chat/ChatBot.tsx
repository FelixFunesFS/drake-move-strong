import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Calendar, DollarSign, Phone, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import LeadCaptureForm from "./LeadCaptureForm";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change - using RAF to prevent forced reflow
  useEffect(() => {
    if (scrollAreaRef.current) {
      requestAnimationFrame(() => {
        const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const streamChat = useCallback(async (
    userMessages: Message[],
    onDelta: (text: string) => void,
    onDone: () => void,
    leadData?: { name?: string; email: string; phone?: string; interest?: string }
  ) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ 
        messages: userMessages,
        captureLeadData: leadData 
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to get response');
    }

    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Flush remaining buffer
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      await streamChat(
        newMessages,
        updateAssistant,
        () => setIsLoading(false)
      );
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      toast({
        title: "Connection error",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'reset-week':
        sendMessage("What is Reset Week and how do I get started?");
        break;
      case 'schedule':
        sendMessage("What classes do you offer and how can I book one?");
        break;
      case 'pricing':
        sendMessage("What are your membership options and pricing?");
        break;
      case 'contact':
        setShowLeadForm(true);
        break;
    }
  };

  const handleLeadSubmit = async (data: { name: string; email: string; phone?: string }) => {
    setIsSubmittingLead(true);
    
    try {
      // Send a message with the lead data attached
      const userMsg: Message = { role: 'user', content: `I'd like Coach David to reach out. My name is ${data.name || 'not provided'} and my email is ${data.email}.` };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setShowLeadForm(false);

      let assistantContent = "";
      const updateAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
          }
          return [...prev, { role: 'assistant', content: assistantContent }];
        });
      };

      await streamChat(
        newMessages,
        updateAssistant,
        () => {
          setIsSubmittingLead(false);
          setIsLoading(false);
        },
        { ...data, interest: 'general inquiry' }
      );

      toast({
        title: "Thanks!",
        description: "We'll be in touch soon.",
      });
    } catch (error) {
      console.error('Lead capture error:', error);
      setIsSubmittingLead(false);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowLeadForm(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          isOpen && "rotate-90"
        )}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background border border-border rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden",
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Drake Fitness</h3>
              <p className="text-xs opacity-80">We typically reply instantly</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Clear chat"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="h-[350px] bg-background">
          <div className="p-2">
            {messages.length === 0 ? (
              <div className="p-4 space-y-4">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-sm text-foreground">
                    Hi there! 👋 I'm here to help you learn about Drake Fitness. What can I help you with?
                  </p>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground px-1">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleQuickAction('reset-week')}
                      className="text-xs h-8 bg-drake-gold text-drake-dark hover:bg-drake-gold/90"
                    >
                      🎁 Reset Week
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('schedule')}
                      className="text-xs h-8"
                    >
                      <Calendar className="w-3 h-3 mr-1.5" />
                      Classes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('pricing')}
                      className="text-xs h-8"
                    >
                      <DollarSign className="w-3 h-3 mr-1.5" />
                      Pricing
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    role={msg.role}
                    content={msg.content}
                    isStreaming={isLoading && i === messages.length - 1 && msg.role === 'assistant'}
                  />
                ))}
              </>
            )}

            {/* Lead Capture Form */}
            {showLeadForm && (
              <div className="p-2">
                <LeadCaptureForm
                  onSubmit={handleLeadSubmit}
                  onCancel={() => setShowLeadForm(false)}
                  isSubmitting={isSubmittingLead}
                />
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3 p-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-background">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 text-sm"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!input.trim() || isLoading}
              className="shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
