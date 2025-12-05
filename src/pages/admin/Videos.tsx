import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, PlayCircle, Eye, Star, GripVertical } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { extractYouTubeId } from "@/lib/youtubeUtils";

const difficulties = ['all_levels', 'beginner', 'intermediate', 'advanced'];
const accessLevels = ['public', 'member', 'vip'];

export default function AdminVideos() {
  const queryClient = useQueryClient();
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Form state for video
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    youtube_video_id: '',
    thumbnail_url: '',
    category_id: '',
    access_level: 'member',
    duration_minutes: '',
    difficulty_level: 'all_levels',
    is_featured: false,
    is_active: true,
  });

  // Form state for category
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Video',
    is_active: true,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['admin-video-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  // Fetch videos
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['admin-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          category:video_categories(id, name)
        `)
        .order('sort_order')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch coaches for dropdown
  const { data: coaches = [] } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .not('first_name', 'is', null);
      if (error) throw error;
      return data;
    }
  });

  // Video mutations
  const saveVideoMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        duration_minutes: data.duration_minutes ? parseInt(data.duration_minutes) : null,
        category_id: data.category_id || null,
      };
      
      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update(payload)
          .eq('id', editingVideo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('videos')
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingVideo ? 'Video updated!' : 'Video added!');
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      setVideoDialogOpen(false);
      resetVideoForm();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to save video');
    }
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Video deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
    }
  });

  // Category mutations
  const saveCategoryMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingCategory) {
        const { error } = await supabase
          .from('video_categories')
          .update(data)
          .eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('video_categories')
          .insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingCategory ? 'Category updated!' : 'Category added!');
      queryClient.invalidateQueries({ queryKey: ['admin-video-categories'] });
      setCategoryDialogOpen(false);
      resetCategoryForm();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to save category');
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('video_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Category deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-video-categories'] });
    }
  });

  const resetVideoForm = () => {
    setVideoForm({
      title: '',
      description: '',
      youtube_video_id: '',
      thumbnail_url: '',
      category_id: '',
      access_level: 'member',
      duration_minutes: '',
      difficulty_level: 'all_levels',
      is_featured: false,
      is_active: true,
    });
    setEditingVideo(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      icon: 'Video',
      is_active: true,
    });
    setEditingCategory(null);
  };

  const openEditVideo = (video: any) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      description: video.description || '',
      youtube_video_id: video.youtube_video_id,
      thumbnail_url: video.thumbnail_url || '',
      category_id: video.category_id || '',
      access_level: video.access_level,
      duration_minutes: video.duration_minutes?.toString() || '',
      difficulty_level: video.difficulty_level || 'all_levels',
      is_featured: video.is_featured,
      is_active: video.is_active,
    });
    setVideoDialogOpen(true);
  };

  const openEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || 'Video',
      is_active: category.is_active,
    });
    setCategoryDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Video Library</h1>
            <p className="text-muted-foreground">Manage videos and categories</p>
          </div>
        </div>

        <Tabs defaultValue="videos">
          <TabsList>
            <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={videoDialogOpen} onOpenChange={(open) => {
                setVideoDialogOpen(open);
                if (!open) resetVideoForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    saveVideoMutation.mutate(videoForm);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label>Title *</Label>
                        <Input
                          value={videoForm.title}
                          onChange={(e) => setVideoForm(f => ({ ...f, title: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={videoForm.description}
                          onChange={(e) => setVideoForm(f => ({ ...f, description: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="col-span-2">
                        <Label>YouTube Video ID or URL *</Label>
                        <Input
                          value={videoForm.youtube_video_id}
                          onChange={(e) => setVideoForm(f => ({ ...f, youtube_video_id: extractYouTubeId(e.target.value) }))}
                          placeholder="Paste YouTube URL or video ID (e.g., dQw4w9WgXcQ)"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Accepts full YouTube URLs or just the video ID
                        </p>
                        {videoForm.youtube_video_id && (
                          <div className="mt-2">
                            <YouTubeEmbed
                              videoId={videoForm.youtube_video_id}
                              title="Preview"
                              className="max-w-sm"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label>Category</Label>
                        <Select
                          value={videoForm.category_id || "none"}
                          onValueChange={(v) => setVideoForm(f => ({ ...f, category_id: v === "none" ? "" : v }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Category</SelectItem>
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Access Level *</Label>
                        <Select
                          value={videoForm.access_level}
                          onValueChange={(v) => setVideoForm(f => ({ ...f, access_level: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {accessLevels.map(level => (
                              <SelectItem key={level} value={level} className="capitalize">
                                {level === 'public' ? '🔓 Public' : level === 'member' ? '👤 Member' : '⭐ VIP'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={videoForm.duration_minutes}
                          onChange={(e) => setVideoForm(f => ({ ...f, duration_minutes: e.target.value }))}
                          min={1}
                        />
                      </div>

                      <div>
                        <Label>Difficulty</Label>
                        <Select
                          value={videoForm.difficulty_level}
                          onValueChange={(v) => setVideoForm(f => ({ ...f, difficulty_level: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {difficulties.map(d => (
                              <SelectItem key={d} value={d} className="capitalize">
                                {d.replace('_', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-2">
                        <Label>Custom Thumbnail URL (optional)</Label>
                        <Input
                          value={videoForm.thumbnail_url}
                          onChange={(e) => setVideoForm(f => ({ ...f, thumbnail_url: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={videoForm.is_featured}
                            onCheckedChange={(v) => setVideoForm(f => ({ ...f, is_featured: v }))}
                          />
                          <Label>Featured</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={videoForm.is_active}
                            onCheckedChange={(v) => setVideoForm(f => ({ ...f, is_active: v }))}
                          />
                          <Label>Active</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setVideoDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={saveVideoMutation.isPending}>
                        {saveVideoMutation.isPending ? 'Saving...' : 'Save Video'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map(video => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <img
                          src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_video_id}/default.jpg`}
                          alt=""
                          className="w-16 h-10 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{video.title}</div>
                        {video.is_featured && (
                          <Star className="h-3 w-3 text-drake-gold inline ml-1" />
                        )}
                      </TableCell>
                      <TableCell>{video.category?.name || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={
                          video.access_level === 'public' ? 'secondary' :
                          video.access_level === 'vip' ? 'default' : 'outline'
                        }>
                          {video.access_level}
                        </Badge>
                      </TableCell>
                      <TableCell>{video.duration_minutes ? `${video.duration_minutes}m` : '-'}</TableCell>
                      <TableCell>{video.view_count || 0}</TableCell>
                      <TableCell>
                        <Badge variant={video.is_active ? 'default' : 'secondary'}>
                          {video.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditVideo(video)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Delete this video?')) {
                                deleteVideoMutation.mutate(video.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {videos.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No videos yet. Add your first video!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={categoryDialogOpen} onOpenChange={(open) => {
                setCategoryDialogOpen(open);
                if (!open) resetCategoryForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    saveCategoryMutation.mutate(categoryForm);
                  }} className="space-y-4">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setCategoryForm(f => ({ 
                            ...f, 
                            name,
                            slug: editingCategory ? f.slug : generateSlug(name)
                          }));
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Slug *</Label>
                      <Input
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm(f => ({ ...f, slug: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm(f => ({ ...f, description: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Icon (Lucide icon name)</Label>
                      <Input
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm(f => ({ ...f, icon: e.target.value }))}
                        placeholder="e.g., Video, Dumbbell, Heart"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={categoryForm.is_active}
                        onCheckedChange={(v) => setCategoryForm(f => ({ ...f, is_active: v }))}
                      />
                      <Label>Active</Label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={saveCategoryMutation.isPending}>
                        {saveCategoryMutation.isPending ? 'Saving...' : 'Save Category'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(cat => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                      <TableCell className="max-w-xs truncate">{cat.description || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={cat.is_active ? 'default' : 'secondary'}>
                          {cat.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditCategory(cat)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Delete this category?')) {
                                deleteCategoryMutation.mutate(cat.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
