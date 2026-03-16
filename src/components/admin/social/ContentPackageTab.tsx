import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, ExternalLink, Loader2, ImageIcon, Wand2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PackagePost, TemplateId, DEFAULT_PHOTOS } from './types';

interface ContentPackageTabProps {
  onLoadPost: (post: PackagePost, imageUrl?: string) => void;
}

const CAMPAIGN_GOALS = [
  { id: 'conversion', label: 'Conversion', desc: 'Drive bookings and sign-ups' },
  { id: 'awareness', label: 'Brand Awareness', desc: 'Grow reach and recognition' },
  { id: 'education', label: 'Education', desc: 'Share fitness knowledge' },
  { id: 'community', label: 'Community', desc: 'Highlight member stories' },
  { id: 'retention', label: 'Retention', desc: 'Keep members engaged' },
];

const PACKAGE_SIZES = [10, 20, 30];

const matchPhoto = (tags: string[]): number => {
  if (!tags || tags.length === 0) return 0;
  const scored = DEFAULT_PHOTOS.map((p, idx) => ({
    idx,
    score: tags.filter(t =>
      p.label.toLowerCase().includes(t.toLowerCase())
    ).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].idx : Math.floor(Math.random() * DEFAULT_PHOTOS.length);
};

export default function ContentPackageTab({ onLoadPost }: ContentPackageTabProps) {
  const [goal, setGoal] = useState('conversion');
  const [packageSize, setPackageSize] = useState(10);
  const [posts, setPosts] = useState<PackagePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState<number | null>(null);

  const generatePackage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content-package', {
        body: { goal, packageSize },
      });

      if (error) throw error;

      if (data?.posts) {
        const enriched = data.posts.map((p: PackagePost) => ({
          ...p,
          matchedPhotoIndex: matchPhoto(p.suggested_photo_tags || []),
        }));
        setPosts(enriched);
        toast.success(`Generated ${enriched.length} posts with visual direction!`);
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

  const generateAIImage = async (postIndex: number) => {
    const post = posts[postIndex];
    if (!post?.image_prompt) {
      toast.error('No image prompt for this post');
      return;
    }

    setGeneratingImage(postIndex);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ad-image', {
        body: { prompt: post.image_prompt, style: 'photorealistic' },
      });

      if (error) throw error;
      if (!data?.imageUrl) throw new Error('No image returned');

      setPosts(prev => prev.map((p, i) =>
        i === postIndex ? { ...p, generatedImageUrl: data.imageUrl } : p
      ));
      toast.success('AI graphic generated!');
    } catch (err: any) {
      console.error('Image generation error:', err);
      toast.error(err.message || 'Failed to generate image');
    } finally {
      setGeneratingImage(null);
    }
  };

  const copyCaption = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${platform} caption copied!`);
  };

  const getImageForPost = (post: PackagePost): string | undefined => {
    if (post.generatedImageUrl) return post.generatedImageUrl;
    if (post.matchedPhotoIndex !== undefined) return DEFAULT_PHOTOS[post.matchedPhotoIndex]?.src;
    return undefined;
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
            {posts.map((post, postIndex) => {
              const matchedPhoto = post.matchedPhotoIndex !== undefined ? DEFAULT_PHOTOS[post.matchedPhotoIndex] : null;
              const isGenerating = generatingImage === postIndex;

              return (
                <div key={post.number} className="border border-border rounded-lg p-4 bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-drake-teal text-white px-2 py-0.5 rounded">Post #{post.number}</span>
                    <span className="text-[10px] text-muted-foreground">{post.suggested_template}</span>
                  </div>

                  <div>
                    <div className="font-semibold text-sm">{post.headline}</div>
                    <div className="text-xs text-muted-foreground">{post.detail}</div>
                  </div>

                  {/* Graphic Section */}
                  <div className="border border-border rounded-lg p-3 bg-muted/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <ImageIcon className="h-3.5 w-3.5" />
                      Graphic
                    </div>

                    <div className="flex gap-3 items-start">
                      {/* Matched Photo */}
                      {matchedPhoto && (
                        <div className="space-y-1.5">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden border border-border">
                            <img src={matchedPhoto.src} alt={matchedPhoto.label} className="w-full h-full object-cover" />
                            {!post.generatedImageUrl && (
                              <div className="absolute top-0.5 right-0.5 bg-drake-gold rounded-full p-0.5">
                                <Check className="h-2.5 w-2.5 text-drake-dark" />
                              </div>
                            )}
                          </div>
                          <div className="text-[10px] text-muted-foreground text-center truncate w-20">{matchedPhoto.label}</div>
                        </div>
                      )}

                      {/* AI Generated Image */}
                      {post.generatedImageUrl && (
                        <div className="space-y-1.5">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden border-2 border-drake-gold">
                            <img src={post.generatedImageUrl} alt="AI Generated" className="w-full h-full object-cover" />
                            <div className="absolute top-0.5 right-0.5 bg-drake-gold rounded-full p-0.5">
                              <Check className="h-2.5 w-2.5 text-drake-dark" />
                            </div>
                          </div>
                          <div className="text-[10px] text-drake-gold text-center">AI Generated</div>
                        </div>
                      )}

                      {/* Generate AI button */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          disabled={isGenerating}
                          onClick={() => generateAIImage(postIndex)}
                        >
                          {isGenerating ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <Wand2 className="h-3 w-3 mr-1" />
                          )}
                          {isGenerating ? 'Generating…' : post.generatedImageUrl ? 'Regenerate' : 'Generate AI Graphic'}
                        </Button>
                        {post.image_prompt && (
                          <p className="text-[10px] text-muted-foreground line-clamp-2 italic">
                            "{post.image_prompt}"
                          </p>
                        )}
                      </div>
                    </div>
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

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onLoadPost(post, getImageForPost(post))}
                    className="text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" /> Open in Editor
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
