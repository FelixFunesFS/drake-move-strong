import { Instagram, Facebook, Linkedin, Twitter, Heart, MessageCircle, Send, Bookmark, ThumbsUp, Share2, Repeat2 } from "lucide-react";

interface PlatformPreviewProps {
  platform: string;
  content: string;
}

const InstagramPreview = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const displayText = lines.slice(0, 3).join('\n');
  const hasMore = lines.length > 3 || content.length > 150;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 max-w-[320px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-drake-gold flex items-center justify-center">
          <span className="text-white text-xs font-bold">DF</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">drakefitnesschs</p>
          <p className="text-xs text-gray-500">Charleston, SC</p>
        </div>
      </div>
      
      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-drake-gold/20 flex items-center justify-center">
        <Instagram className="w-16 h-16 text-primary/30" />
      </div>
      
      {/* Actions */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 text-gray-700" />
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <Send className="w-6 h-6 text-gray-700" />
          </div>
          <Bookmark className="w-6 h-6 text-gray-700" />
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-1">1,234 likes</p>
        <div className="text-sm text-gray-900">
          <span className="font-semibold">drakefitnesschs </span>
          <span className="whitespace-pre-wrap">{displayText.substring(0, 150)}</span>
          {hasMore && <span className="text-gray-500">... more</span>}
        </div>
      </div>
    </div>
  );
};

const FacebookPreview = ({ content }: { content: string }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 max-w-[320px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-drake-gold flex items-center justify-center">
          <span className="text-white text-sm font-bold">DF</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Drake Fitness</p>
          <p className="text-xs text-gray-500">Just now · 🌍</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-3 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap line-clamp-6">
          {content.substring(0, 300)}
          {content.length > 300 && '...'}
        </p>
      </div>
      
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <Facebook className="w-12 h-12 text-blue-400" />
      </div>
      
      {/* Reactions */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">👍</span>
              <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">❤️</span>
            </div>
            <span>128</span>
          </div>
          <span>24 comments · 12 shares</span>
        </div>
        <div className="flex items-center justify-around pt-2 border-t border-gray-100">
          <button className="flex items-center gap-2 text-gray-600 text-sm font-medium">
            <ThumbsUp className="w-5 h-5" /> Like
          </button>
          <button className="flex items-center gap-2 text-gray-600 text-sm font-medium">
            <MessageCircle className="w-5 h-5" /> Comment
          </button>
          <button className="flex items-center gap-2 text-gray-600 text-sm font-medium">
            <Share2 className="w-5 h-5" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkedInPreview = ({ content }: { content: string }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 max-w-[320px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-drake-gold flex items-center justify-center">
          <span className="text-white text-sm font-bold">DF</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Drake Fitness</p>
          <p className="text-xs text-gray-500">Functional Strength Training Studio</p>
          <p className="text-xs text-gray-400">1h · 🌍</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-3 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap line-clamp-5">
          {content.substring(0, 400)}
          {content.length > 400 && '...'}
        </p>
        {content.length > 400 && (
          <button className="text-sm text-gray-500 hover:text-blue-600 mt-1">...see more</button>
        )}
      </div>
      
      {/* Reactions */}
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>👍❤️💡</span>
            <span>89</span>
          </div>
          <span>12 comments</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-around p-2 border-t border-gray-100">
        <button className="flex items-center gap-1 text-gray-600 text-xs font-medium px-2 py-1 hover:bg-gray-100 rounded">
          <ThumbsUp className="w-4 h-4" /> Like
        </button>
        <button className="flex items-center gap-1 text-gray-600 text-xs font-medium px-2 py-1 hover:bg-gray-100 rounded">
          <MessageCircle className="w-4 h-4" /> Comment
        </button>
        <button className="flex items-center gap-1 text-gray-600 text-xs font-medium px-2 py-1 hover:bg-gray-100 rounded">
          <Repeat2 className="w-4 h-4" /> Repost
        </button>
        <button className="flex items-center gap-1 text-gray-600 text-xs font-medium px-2 py-1 hover:bg-gray-100 rounded">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
};

const TwitterPreview = ({ content }: { content: string }) => {
  const isThread = Array.isArray(content) || content.includes('---');
  const tweets = isThread ? content.split('---').map(t => t.trim()).filter(Boolean) : [content];
  const firstTweet = tweets[0].substring(0, 280);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 max-w-[320px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 p-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-drake-gold flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">DF</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-gray-900">Drake Fitness</p>
            <span className="text-blue-500">✓</span>
          </div>
          <p className="text-sm text-gray-500">@drakefitnesschs</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-3 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap">
          {firstTweet}
        </p>
        {tweets.length > 1 && (
          <p className="text-sm text-blue-500 mt-2">Show this thread ({tweets.length} posts)</p>
        )}
      </div>
      
      {/* Time */}
      <div className="px-3 pb-2 text-xs text-gray-500">
        12:30 PM · Dec 5, 2024 · <span className="text-gray-900 font-medium">1.2K</span> Views
      </div>
      
      {/* Stats */}
      <div className="flex items-center gap-6 px-3 py-2 border-t border-gray-100 text-xs text-gray-500">
        <span><strong className="text-gray-900">24</strong> Reposts</span>
        <span><strong className="text-gray-900">89</strong> Likes</span>
        <span><strong className="text-gray-900">5</strong> Bookmarks</span>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-around p-2 border-t border-gray-100">
        <MessageCircle className="w-5 h-5 text-gray-500" />
        <Repeat2 className="w-5 h-5 text-gray-500" />
        <Heart className="w-5 h-5 text-gray-500" />
        <Bookmark className="w-5 h-5 text-gray-500" />
        <Share2 className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export const PlatformPreview = ({ platform, content }: PlatformPreviewProps) => {
  switch (platform) {
    case 'instagram':
      return <InstagramPreview content={content} />;
    case 'facebook':
      return <FacebookPreview content={content} />;
    case 'linkedin':
      return <LinkedInPreview content={content} />;
    case 'twitter':
      return <TwitterPreview content={content} />;
    default:
      return null;
  }
};

export default PlatformPreview;
