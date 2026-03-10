import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { ReactNode } from "react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

// Friendly labels for known URLs
const friendlyLabels: Record<string, string> = {
  // PunchPass booking links
  'https://drakefitness.punchpass.com/classes': '📅 View Class Schedule',
  'https://drakefitness.punchpass.com/passes': '🎟️ Browse Passes',
  'https://drakefitness.punchpass.com/catalog': '💳 View Membership Options',
  'https://drakefitness.punchpass.com': '📅 Book on PunchPass',
  
  // Intro offer links
  'https://drakefitness.punchpass.com/catalogs/purchase/pass/254246?check=1773100034': '🎁 Claim 3 Free Classes',
  'https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219': '🎁 Claim 3 Free Classes',
  'https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/46002': '🎁 Claim 3 Free Classes',
  
  // Membership purchase links
  'https://drakefitness.punchpass.com/catalogs/purchase/membership/219877?check=1735866784': '💪 Join Foundation Membership',
  'https://drakefitness.punchpass.com/catalogs/purchase/membership/219881?check=1735867211': '⭐ Join Longevity Unlimited',
  'https://drakefitness.punchpass.com/catalogs/purchase/membership/233268?check=1750796776': '🌐 Get Remote Support',
  
  // Drake Fitness website links
  'https://drake.fitness': '🏠 Drake Fitness',
  'https://drake.fitness/pricing': '💰 View Pricing',
  'https://drake.fitness/schedule': '📅 See Schedule',
  'https://drake.fitness/contact': '📞 Contact Us',
  'https://drake.fitness/try-free-charleston': '🎁 3-Class Intro Info',
  'https://drake.fitness/intro': '🎁 3-Class Intro Experience',
  'https://drake.fitness/reset-week-charleston': '🎁 3-Class Intro Info',
  'https://drake.fitness/reset': '🎁 3-Class Intro Experience',
  'https://drake.fitness/about': '👋 About Us',
  'https://drake.fitness/coaching': '🎯 Personal Coaching',
  'https://drake.fitness/consultation': '📋 Book Consultation',
};

const getFriendlyLabel = (url: string): string => {
  // Check exact match first
  if (friendlyLabels[url]) return friendlyLabels[url];
  
  // Check if URL starts with a known base
  for (const [knownUrl, label] of Object.entries(friendlyLabels)) {
    if (url.startsWith(knownUrl)) return label;
  }
  
  // Shorten long URLs for display
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
  } catch {
    return url;
  }
};

const renderContentWithLinks = (text: string): ReactNode[] => {
  // Regex for URLs, phone numbers, and emails
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
  const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  
  // Combined pattern to split by any of these
  const combinedRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  
  const parts = text.split(combinedRegex);
  
  return parts.map((part, index) => {
    // Check if it's a URL
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0; // Reset regex state
      const label = getFriendlyLabel(part);
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {label}
        </a>
      );
    }
    
    // Check if it's a phone number
    if (phoneRegex.test(part)) {
      phoneRegex.lastIndex = 0;
      const cleanPhone = part.replace(/\D/g, '');
      return (
        <a
          key={index}
          href={`tel:+1${cleanPhone}`}
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          📞 {part}
        </a>
      );
    }
    
    // Check if it's an email
    if (emailRegex.test(part)) {
      emailRegex.lastIndex = 0;
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          ✉️ {part}
        </a>
      );
    }
    
    return part;
  });
};

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
          {renderContentWithLinks(content)}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
