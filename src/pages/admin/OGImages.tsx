import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, ImageIcon, Trash2, Wand2, ExternalLink } from 'lucide-react';

const OG_BUCKET_BASE = `https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/og-images`;

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
  { path: '/reset-week-charleston', label: 'Reset Week', suggestedSource: 'ruckathon-hero-group.jpg' },
  { path: '/faq', label: 'FAQ', suggestedSource: 'community-group-photo-large.jpg' },
];

interface OgRecord {
  path: string;
  image_filename: string;
  source_description: string | null;
}

export default function OGImages() {
  const [ogRecords, setOgRecords] = useState<OgRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageMapping | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');

  const fetchRecords = async () => {
    const { data } = await supabase
      .from('page_og_images')
      .select('path, image_filename, source_description');
    setOgRecords((data as OgRecord[]) || []);
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-og-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            sourceImageUrl: sourceUrl,
            pagePath: selectedPage.path,
            description: `Hero image: ${selectedPage.suggestedSource}`,
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
    // Pre-populate with a full URL to the asset in the repo
    setSourceUrl(`https://drake.fitness/src/assets/${page.suggestedSource}`);
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
                const ogUrl = `https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect${page.path}`;
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
            <div>
              <label className="text-sm font-medium mb-1 block">Source Image URL</label>
              <Input
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Suggested: <code>{selectedPage?.suggestedSource}</code>
              </p>
            </div>
            {sourceUrl && (
              <div>
                <label className="text-sm font-medium mb-1 block">Source Preview</label>
                <img
                  src={sourceUrl}
                  alt="Source preview"
                  className="w-full max-h-64 object-contain rounded border border-border bg-muted"
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
