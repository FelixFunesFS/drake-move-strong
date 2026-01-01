import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 p-3",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-sm" 
          : "bg-muted text-foreground rounded-tl-sm"
      )}>
        <p className="whitespace-pre-wrap leading-relaxed">
          {content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
