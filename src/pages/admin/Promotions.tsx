import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  display_type: string;
  background_color: string | null;
  text_color: string | null;
  accent_color: string | null;
  target_pages: string[] | null;
  dismissible: boolean;
  priority: number;
  created_at: string;
}

const defaultPromotion = {
  title: '',
  description: '',
  cta_text: '',
  cta_link: '',
  start_date: new Date().toISOString(),
  end_date: null as string | null,
  is_active: true,
  display_type: 'banner',
  background_color: '#0B4A52',
  text_color: '#FFFFFF',
  accent_color: '#F2B544',
  target_pages: ['all'],
  dismissible: true,
  priority: 0,
};

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState(defaultPromotion);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-promotions', {
        body: { action: 'list' },
      });
      if (error) throw error;
      setPromotions(data.promotions || []);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      toast({ title: 'Error', description: 'Failed to load promotions', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const action = editingPromotion ? 'update' : 'create';
      const body = editingPromotion
        ? { action, id: editingPromotion.id, data: formData }
        : { action, data: formData };

      const { error } = await supabase.functions.invoke('manage-promotions', { body });
      if (error) throw error;

      toast({ title: 'Success', description: `Promotion ${editingPromotion ? 'updated' : 'created'}` });
      setIsDialogOpen(false);
      setEditingPromotion(null);
      setFormData(defaultPromotion);
      fetchPromotions();
    } catch (err) {
      console.error('Error saving promotion:', err);
      toast({ title: 'Error', description: 'Failed to save promotion', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('manage-promotions', {
        body: { action: 'toggle', id },
      });
      if (error) throw error;
      fetchPromotions();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to toggle promotion', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return;

    try {
      const { error } = await supabase.functions.invoke('manage-promotions', {
        body: { action: 'delete', id },
      });
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Promotion removed' });
      fetchPromotions();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete promotion', variant: 'destructive' });
    }
  };

  const openEditDialog = (promo: Promotion) => {
    setEditingPromotion(promo);
    setFormData({
      title: promo.title,
      description: promo.description || '',
      cta_text: promo.cta_text || '',
      cta_link: promo.cta_link || '',
      start_date: promo.start_date,
      end_date: promo.end_date,
      is_active: promo.is_active,
      display_type: promo.display_type,
      background_color: promo.background_color || '#0B4A52',
      text_color: promo.text_color || '#FFFFFF',
      accent_color: promo.accent_color || '#F2B544',
      target_pages: promo.target_pages || ['all'],
      dismissible: promo.dismissible,
      priority: promo.priority,
    });
    setIsDialogOpen(true);
  };

  const getStatus = (promo: Promotion) => {
    const now = new Date();
    const start = new Date(promo.start_date);
    const end = promo.end_date ? new Date(promo.end_date) : null;

    if (!promo.is_active) return { label: 'Inactive', variant: 'secondary' as const };
    if (start > now) return { label: 'Scheduled', variant: 'outline' as const };
    if (end && end < now) return { label: 'Expired', variant: 'destructive' as const };
    return { label: 'Active', variant: 'default' as const };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Megaphone className="w-6 h-6" />
                Promotions Manager
              </h1>
              <p className="text-muted-foreground">Manage seasonal announcements and offers</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingPromotion(null);
              setFormData(defaultPromotion);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-drake-gold text-drake-dark hover:bg-drake-gold/90">
                <Plus className="w-4 h-4 mr-2" /> New Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPromotion ? 'Edit Promotion' : 'Create Promotion'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="🎉 New Year Special: 50% Off!"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Start 2026 stronger — unlimited classes for just $99"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta_text">Button Text</Label>
                      <Input
                        id="cta_text"
                        value={formData.cta_text}
                        onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                        placeholder="Claim Offer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta_link">Button Link</Label>
                      <Input
                        id="cta_link"
                        value={formData.cta_link}
                        onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                        placeholder="/new-year"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.start_date ? format(new Date(formData.start_date), 'PPP') : 'Pick date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.start_date ? new Date(formData.start_date) : undefined}
                            onSelect={(date) => setFormData({ ...formData, start_date: date?.toISOString() || new Date().toISOString() })}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>End Date (optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.end_date ? format(new Date(formData.end_date), 'PPP') : 'No end date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.end_date ? new Date(formData.end_date) : undefined}
                            onSelect={(date) => setFormData({ ...formData, end_date: date?.toISOString() || null })}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="background_color">Background</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text_color">Text</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent_color">Accent</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={formData.accent_color}
                          onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={formData.accent_color}
                          onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Display Type</Label>
                      <Select value={formData.display_type} onValueChange={(v) => setFormData({ ...formData, display_type: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner (top of page)</SelectItem>
                          <SelectItem value="popup">Popup (coming soon)</SelectItem>
                          <SelectItem value="floating">Floating (coming soon)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority (higher = shown first)</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="dismissible"
                        checked={formData.dismissible}
                        onCheckedChange={(v) => setFormData({ ...formData, dismissible: v })}
                      />
                      <Label htmlFor="dismissible">Allow users to dismiss</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                      />
                      <Label htmlFor="is_active">Active</Label>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="border rounded-lg overflow-hidden">
                  <p className="text-sm text-muted-foreground p-2 bg-muted">Preview</p>
                  <div
                    className="p-3 flex items-center justify-center gap-4 text-center"
                    style={{
                      backgroundColor: formData.background_color,
                      color: formData.text_color,
                    }}
                  >
                    <span className="font-semibold text-sm">{formData.title || 'Promotion Title'}</span>
                    {formData.description && (
                      <span className="text-sm opacity-90 hidden sm:inline">{formData.description}</span>
                    )}
                    {formData.cta_text && (
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: formData.accent_color,
                          color: formData.background_color,
                        }}
                      >
                        {formData.cta_text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : editingPromotion ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : promotions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No promotions yet. Create your first one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {promotions.map((promo) => {
              const status = getStatus(promo);
              return (
                <Card key={promo.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={status.variant}>{status.label}</Badge>
                          <Badge variant="outline">{promo.display_type}</Badge>
                          {promo.priority > 0 && (
                            <Badge variant="secondary">Priority: {promo.priority}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{promo.title}</CardTitle>
                        {promo.description && (
                          <p className="text-muted-foreground text-sm mt-1">{promo.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggle(promo.id)}
                          title={promo.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {promo.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(promo)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(promo.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Start: {format(new Date(promo.start_date), 'MMM d, yyyy')}</span>
                      {promo.end_date && <span>End: {format(new Date(promo.end_date), 'MMM d, yyyy')}</span>}
                      {promo.cta_link && <span>Link: {promo.cta_link}</span>}
                    </div>
                    <div
                      className="mt-3 p-2 rounded flex items-center justify-center gap-2 text-sm"
                      style={{
                        backgroundColor: promo.background_color || '#0B4A52',
                        color: promo.text_color || '#FFFFFF',
                      }}
                    >
                      <span className="font-medium truncate">{promo.title}</span>
                      {promo.cta_text && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: promo.accent_color || '#F2B544',
                            color: promo.background_color || '#0B4A52',
                          }}
                        >
                          {promo.cta_text}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotions;