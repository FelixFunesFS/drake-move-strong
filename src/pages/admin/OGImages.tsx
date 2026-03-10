import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, ImageIcon, Trash2, Wand2, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BucketImagePicker from '@/components/admin/BucketImagePicker';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const OG_BUCKET_BASE = `${SUPABASE_URL}/storage/v1/object/public/og-images`;
const BLOG_IMAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/blog-images`;

interface PageMapping {
  path: string;
  label: string;
  suggestedSource: string;
}

const PAGE_MAPPINGS: PageMapping[] = [
  { path: '/', label: 'Home', suggestedSource: 'hero-group-turkish-getup.jpg' },
  { path: '/about', label: 'About', suggestedSource: 'david-coaching-turkish-getup.jpg' },
  { path: '/classes', label: 'Classes', suggestedSource: 'classes-hero-outdoor-mace.jpg' },
  { path: '/coaching', label: 'Coaching', suggestedSource: 'hero-coaching-session.jpg' },
  { path: '/pricing', label: 'Pricing', suggestedSource: 'pricing-hero-kettlebell.jpg' },
  { path: '/schedule', label: 'Schedule', suggestedSource: 'schedule-community-group.jpg' },
  { path: '/contact', label: 'Contact', suggestedSource: 'contact-hero-class-turkish-getup.jpg' },
  { path: '/success-stories', label: 'Success Stories', suggestedSource: 'testimonial-group-training.jpg' },
  { path: '/insights', label: 'Insights', suggestedSource: 'insights-hero-turkish-getup-class.jpg' },
  { path: '/try-free-charleston', label: '3-Class Intro', suggestedSource: 'ruckathon-hero-group.jpg' },
  { path: '/intro', label: 'Intro (Referral)', suggestedSource: 'ruckathon-hero-group.jpg' },
  { path: '/strength-training-charleston', label: 'Strength Training Charleston', suggestedSource: 'hero-kettlebell-training.jpg' },
  { path: '/west-ashley-fitness', label: 'West Ashley Fitness', suggestedSource: 'david-double-kb-storefront-new.jpg' },
  { path: '/low-impact-fitness-charleston', label: 'Low Impact Fitness', suggestedSource: 'community-plank-rows-group.jpg' },
  { path: '/faq', label: 'FAQ', suggestedSource: 'community-group-photo-large.jpg' },
];

interface OgRecord {
  path: string;
  image_filename: string;
  source_description: string | null;
}

interface BlogPost {
  slug: string;
  title: string;
  og_image: string | null;
}

export default function OGImages() {
  const [ogRecords, setOgRecords] = useState<OgRecord[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageMapping | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');

  const fetchRecords = async () => {
    const [{ data: ogData }, { data: blogData }] = await Promise.all([
      supabase.from('page_og_images').select('path, image_filename, source_description'),
      supabase.from('blog_posts').select('slug, title, og_image').eq('is_active', true).order('published_at', { ascending: false }),
    ]);
    setOgRecords((ogData as OgRecord[]) || []);
    setBlogPosts((blogData as BlogPost[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchRecords(); }, []);

  const getRecord = (path: string) => ogRecords.find(r => r.path === path);

  const handleGenerate = async () => {
    if (!selectedPage || !sourceUrl) return;

    setGenerating(selectedPage.path);
    setDialogOpen(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
        return;
      }

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/generate-og-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            sourceImageUrl: sourceUrl,
            pagePath: selectedPage.path,
            description: `Source: ${selectedPage.suggestedSource}`,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast({ title: 'Generation failed', description: result.error || 'Unknown error', variant: 'destructive' });
        return;
      }

      toast({ title: 'OG image generated!', description: `Saved for ${selectedPage.label}` });
      await fetchRecords();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to generate OG image', variant: 'destructive' });
    } finally {
      setGenerating(null);
    }
  };

  const handleDelete = async (path: string) => {
    const record = getRecord(path);
    if (!record) return;

    const { error: storageErr } = await supabase.storage
      .from('og-images')
      .remove([record.image_filename]);

    if (storageErr) {
      toast({ title: 'Error', description: 'Failed to delete image file', variant: 'destructive' });
      return;
    }

    const { error: dbErr } = await supabase
      .from('page_og_images')
      .delete()
      .eq('path', path);

    if (dbErr) {
      toast({ title: 'Error', description: 'Failed to remove record', variant: 'destructive' });
      return;
    }

    toast({ title: 'Deleted', description: 'Reverted to default OG image' });
    await fetchRecords();
  };

  const openGenerateDialog = (page: PageMapping) => {
    setSelectedPage(page);
    setSourceUrl('');
    setDialogOpen(true);
  };

  const openBlogGenerateDialog = (post: BlogPost) => {
    const blogPage: PageMapping = {
      path: `/insights/${post.slug}`,
      label: post.title,
      suggestedSource: post.og_image || '',
    };
    setSelectedPage(blogPage);
    setSourceUrl(post.og_image ? `${BLOG_IMAGE_BASE}/${post.og_image}` : '');
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-hero font-bold uppercase">OG Image Manager</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered social preview images. Generate face-aware 1200×630 crops from hero images.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Page OG Images</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAGE_MAPPINGS.map((page) => {
                  const record = getRecord(page.path);
                  const isGenerating = generating === page.path;

                  return (
                    <TableRow key={page.path}>
                      <TableCell className="font-medium">{page.label}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">{page.path}</TableCell>
                      <TableCell>
                        {record ? (
                          <a
                            href={`${OG_BUCKET_BASE}/${record.image_filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <img
                              src={`${OG_BUCKET_BASE}/${record.image_filename}?t=${Date.now()}`}
                              alt={`OG image for ${page.label}`}
                              className="w-48 h-auto rounded border border-border object-cover"
                            />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-sm italic">Default</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record ? (
                          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                            <ImageIcon className="h-3.5 w-3.5" /> Custom
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Default</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openGenerateDialog(page)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : (
                            <Wand2 className="h-4 w-4 mr-1" />
                          )}
                          {isGenerating ? 'Generating…' : 'Generate'}
                        </Button>
                        {record && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(page.path)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Blog Post OG Images */}
        {blogPosts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Blog Post OG Images</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => {
                    const blogPath = `/insights/${post.slug}`;
                    const record = getRecord(blogPath);
                    const isGenerating = generating === blogPath;

                    return (
                      <TableRow key={post.slug}>
                        <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                        <TableCell>
                          {record ? (
                            <a
                              href={`${OG_BUCKET_BASE}/${record.image_filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={`${OG_BUCKET_BASE}/${record.image_filename}?t=${Date.now()}`}
                                alt={`OG image for ${post.title}`}
                                className="w-48 h-auto rounded border border-border object-cover"
                              />
                            </a>
                          ) : post.og_image ? (
                            <img
                              src={`${BLOG_IMAGE_BASE}/${post.og_image}`}
                              alt={`Current OG for ${post.title}`}
                              className="w-48 h-auto rounded border border-border object-cover opacity-60"
                            />
                          ) : (
                            <span className="text-muted-foreground text-sm italic">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {record ? (
                            <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                              <ImageIcon className="h-3.5 w-3.5" /> AI Cropped
                            </span>
                          ) : post.og_image ? (
                            <span className="text-sm text-amber-600">Raw (uncropped)</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Missing</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openBlogGenerateDialog(post)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <Wand2 className="h-4 w-4 mr-1" />
                            )}
                            {isGenerating ? 'Generating…' : 'Generate'}
                          </Button>
                          {record && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(blogPath)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Preview section for og-redirect links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Share Preview Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These are the URLs that should be used when sharing on social media to get rich previews.
            </p>
            <div className="space-y-2">
              {PAGE_MAPPINGS.map((page) => {
                const ogUrl = `${SUPABASE_URL}/functions/v1/og-redirect${page.path}`;
                return (
                  <div key={page.path} className="flex items-center gap-3 text-sm">
                    <span className="font-medium w-32">{page.label}:</span>
                    <a
                      href={ogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate flex items-center gap-1"
                    >
                      {ogUrl}
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    </a>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate OG Image for {selectedPage?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Tabs defaultValue="picker" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="picker">Browse Images</TabsTrigger>
                <TabsTrigger value="url">Paste URL</TabsTrigger>
              </TabsList>
              <TabsContent value="picker" className="mt-3">
                <BucketImagePicker
                  bucket="blog-images"
                  selectedUrl={sourceUrl}
                  onSelect={(url) => setSourceUrl(url)}
                />
              </TabsContent>
              <TabsContent value="url" className="mt-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Source Image URL</label>
                  <Input
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="Paste a public image URL"
                  />
                  {selectedPage?.suggestedSource && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Suggested source: <code>{selectedPage.suggestedSource}</code>
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            {sourceUrl && (
              <div>
                <label className="text-sm font-medium mb-1 block">Selected Source Preview</label>
                <img
                  src={sourceUrl}
                  alt="Source preview"
                  className="w-full max-h-48 object-contain rounded border border-border bg-muted"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <Button onClick={handleGenerate} disabled={!sourceUrl} className="w-full">
              <Wand2 className="h-4 w-4 mr-2" />
              Generate 1200×630 OG Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
