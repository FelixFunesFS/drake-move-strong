import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

// Build the OG redirect URL for social sharing so crawlers get proper meta tags
const OG_REDIRECT_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/og-redirect`;

export function getShareUrl(slug: string): string {
  return `${OG_REDIRECT_BASE}/insights/${slug}`;
}

interface SocialShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
}

const SocialShareButtons = ({ url, title, excerpt }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt ? `${title} - ${excerpt}` : title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("twitter")}
        className="gap-2 text-muted-foreground hover:text-foreground hover:border-primary"
        aria-label="Share on X (Twitter)"
      >
        <Twitter size={16} />
        <span className="hidden sm:inline">X</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("facebook")}
        className="gap-2 text-muted-foreground hover:text-foreground hover:border-primary"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("linkedin")}
        className="gap-2 text-muted-foreground hover:text-foreground hover:border-primary"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2 text-muted-foreground hover:text-foreground hover:border-primary"
        aria-label="Copy link"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
