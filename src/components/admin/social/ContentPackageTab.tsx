import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PackagePost, TemplateId } from './types';

interface ContentPackageTabProps {
  onLoadPost: (post: PackagePost) => void;
}

const CAMPAIGN_GOALS = [
  { id: 'conversion', label: 'Conversion', desc: 'Drive bookings and sign-ups' },
  { id: 'awareness', label: 'Brand Awareness', desc: 'Grow reach and recognition' },
  { id: 'education', label: 'Education', desc: 'Share fitness knowledge' },
  { id: 'community', label: 'Community', desc: 'Highlight member stories' },
  { id: 'retention', label: 'Retention', desc: 'Keep members engaged' },
];

const PACKAGE_SIZES = [10, 20, 30];

export default function ContentPackageTab({ onLoadPost }: ContentPackageTabProps) {
  const [goal, setGoal] = useState('conversion');
  const [packageSize, setPackageSize] = useState(10);
  const [posts, setPosts] = useState<PackagePost[]>([]);
  const [loading, setLoading] = useState(false);

  const generatePackage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content-package', {
        body: { goal, packageSize },
      });

      if (error) throw error;

      if (data?.posts) {
        setPosts(data.posts);
        toast.success(`Generated ${data.posts.length} posts!`);
      } else {
        throw new Error('No posts returned');
      }
    } catch (err: any) {
      console.error('Package generation error:', err);
      toast.error(err.message || 'Failed to generate package');
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${platform} caption copied!`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign Goal */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Campaign Goal</label>
          <div className="flex gap-2 flex-wrap">
            {CAMPAIGN_GOALS.map(g => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`text-xs px-3 py-2 rounded-lg border transition-all ${goal === g.id ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground hover:border-drake-gold/50'}`}
              >
                <div className="font-medium">{g.label}</div>
                <div className="text-[10px] opacity-70">{g.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Package Size */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Package Size</label>
          <div className="flex gap-2">
            {PACKAGE_SIZES.map(size => (
              <button
                key={size}
                onClick={() => setPackageSize(size)}
                className={`text-sm px-4 py-2 rounded-lg border font-semibold transition-all ${packageSize === size ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground hover:border-drake-gold/50'}`}
              >
                {size} Posts
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={generatePackage} disabled={loading} variant="gold" size="lg" className="w-full">
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
        {loading ? 'Generating…' : `Generate ${packageSize}-Post Package`}
      </Button>

      {/* Generated Posts */}
      {posts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Generated Content ({posts.length} posts)</h3>
          <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-1">
            {posts.map(post => (
              <div key={post.number} className="border border-border rounded-lg p-4 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-drake-teal text-white px-2 py-0.5 rounded">Post #{post.number}</span>
                  <span className="text-[10px] text-muted-foreground">{post.suggested_template}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{post.headline}</div>
                  <div className="text-xs text-muted-foreground">{post.detail}</div>
                </div>
                {/* Captions */}
                <div className="space-y-2">
                  {[
                    { label: 'IG', text: post.caption_ig },
                    { label: 'FB', text: post.caption_fb },
                    { label: 'LinkedIn', text: post.caption_linkedin },
                  ].map(cap => (
                    <div key={cap.label} className="text-xs bg-muted rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{cap.label}</span>
                        <button onClick={() => copyCaption(cap.text, cap.label)} className="text-drake-gold hover:underline flex items-center gap-1">
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                      </div>
                      <p className="text-muted-foreground line-clamp-3">{cap.text}</p>
                    </div>
                  ))}
                </div>
                {post.hashtags?.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {post.hashtags.map(h => (
                      <span key={h} className="text-[10px] text-drake-teal">#{h}</span>
                    ))}
                  </div>
                )}
                <Button size="sm" variant="outline" onClick={() => onLoadPost(post)} className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Open in Editor
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
