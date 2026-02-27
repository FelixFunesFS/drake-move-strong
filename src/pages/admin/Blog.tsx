import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Eye, EyeOff, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seo_title: string | null;
  excerpt: string;
  content: string | null;
  category: string;
  author: string;
  published_at: string;
  read_time: number;
  thumbnail_url: string | null;
  og_image: string | null;
  video_id: string | null;
  featured: boolean;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const emptyPost = {
  title: '',
  seo_title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'education',
  author: 'david',
  published_at: new Date().toISOString().split('T')[0],
  read_time: 5,
  thumbnail_url: '',
  og_image: '',
  video_id: '',
  featured: false,
  tags: [] as string[],
  is_active: true,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const categoryColors: Record<string, string> = {
  education: 'bg-blue-600',
  trust: 'bg-green-600',
  conversion: 'bg-amber-600',
};

export default function BlogAdmin() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof emptyPost & { id?: string }>(emptyPost);
  const [tagsInput, setTagsInput] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: typeof editingPost) => {
      const payload = {
        title: post.title,
        seo_title: post.seo_title || null,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content || '',
        category: post.category,
        author: post.author,
        published_at: post.published_at,
        read_time: post.read_time,
        thumbnail_url: post.thumbnail_url || null,
        og_image: post.og_image || null,
        video_id: post.video_id || null,
        featured: post.featured,
        tags: post.tags,
        is_active: post.is_active,
      };

      if (post.id) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setDialogOpen(false);
      toast({ title: editingPost.id ? 'Post updated' : 'Post created' });
    },
    onError: (err: Error) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });

  const openCreate = () => {
    setEditingPost(emptyPost);
    setTagsInput('');
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost({
      id: post.id,
      title: post.title,
      seo_title: post.seo_title || '',
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content || '',
      category: post.category,
      author: post.author,
      published_at: post.published_at,
      read_time: post.read_time,
      thumbnail_url: post.thumbnail_url || '',
      og_image: post.og_image || '',
      video_id: post.video_id || '',
      featured: post.featured,
      tags: post.tags || [],
      is_active: post.is_active,
    });
    setTagsInput((post.tags || []).join(', '));
    setDialogOpen(true);
  };

  const handleSave = () => {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    saveMutation.mutate({ ...editingPost, tags });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-hero font-bold uppercase">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">{posts.length} posts</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell">Published</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {post.featured && <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />}
                      <span className="font-medium line-clamp-1">{post.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={`${categoryColors[post.category]} text-white`}>
                      {post.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{post.author}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {format(new Date(post.published_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.is_active ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Eye className="w-3 h-3 mr-1" /> Live
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <EyeOff className="w-3 h-3 mr-1" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost.id ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editingPost.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditingPost(p => ({
                    ...p,
                    title,
                    slug: p.id ? p.slug : slugify(title),
                  }));
                }}
              />
            </div>
            <div>
              <Label>SEO Title (optional)</Label>
              <Input
                value={editingPost.seo_title}
                onChange={(e) => setEditingPost(p => ({ ...p, seo_title: e.target.value }))}
                placeholder="Defaults to title if empty"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={editingPost.slug}
                onChange={(e) => setEditingPost(p => ({ ...p, slug: e.target.value }))}
              />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost(p => ({ ...p, excerpt: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={editingPost.category} onValueChange={(v) => setEditingPost(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="trust">Trust</SelectItem>
                    <SelectItem value="conversion">Decision Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Author</Label>
                <Select value={editingPost.author} onValueChange={(v) => setEditingPost(p => ({ ...p, author: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="david">Coach Drake</SelectItem>
                    <SelectItem value="nick">Coach Nick</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Published Date</Label>
                <Input
                  type="date"
                  value={editingPost.published_at}
                  onChange={(e) => setEditingPost(p => ({ ...p, published_at: e.target.value }))}
                />
              </div>
              <div>
                <Label>Read Time (minutes)</Label>
                <Input
                  type="number"
                  value={editingPost.read_time}
                  onChange={(e) => setEditingPost(p => ({ ...p, read_time: parseInt(e.target.value) || 5 }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Thumbnail Filename</Label>
                <Input
                  value={editingPost.thumbnail_url}
                  onChange={(e) => setEditingPost(p => ({ ...p, thumbnail_url: e.target.value }))}
                  placeholder="e.g. david-coaching-form.jpg"
                />
              </div>
              <div>
                <Label>OG Image Filename</Label>
                <Input
                  value={editingPost.og_image}
                  onChange={(e) => setEditingPost(p => ({ ...p, og_image: e.target.value }))}
                  placeholder="e.g. david-coaching-form.jpg"
                />
              </div>
            </div>
            <div>
              <Label>YouTube Video ID (optional)</Label>
              <Input
                value={editingPost.video_id}
                onChange={(e) => setEditingPost(p => ({ ...p, video_id: e.target.value }))}
                placeholder="e.g. Vb91A46rLr8"
              />
            </div>
            <div>
              <Label>Tags (comma-separated)</Label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="mobility, strength, beginners"
              />
            </div>
            <div>
              <Label>Content (HTML)</Label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost(p => ({ ...p, content: e.target.value }))}
                rows={10}
                placeholder="HTML content for posts without custom React components"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingPost.featured}
                  onCheckedChange={(v) => setEditingPost(p => ({ ...p, featured: v }))}
                />
                <Label>Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingPost.is_active}
                  onCheckedChange={(v) => setEditingPost(p => ({ ...p, is_active: v }))}
                />
                <Label>Active (Live)</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
