import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Plus, Edit2, X, Save } from 'lucide-react';

interface ClassType {
  id: string;
  name: string;
  description: string | null;
  difficulty_level: string;
  default_duration: number;
  default_capacity: number;
  badge_label: string | null;
  is_active: boolean;
}

export default function ClassTypes() {
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty_level: 'all_levels',
    default_duration: 60,
    default_capacity: 12,
    badge_label: '',
    is_active: true,
  });

  useEffect(() => {
    fetchClassTypes();
  }, []);

  const fetchClassTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('class_types')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setClassTypes(data || []);
    } catch (error) {
      console.error('Error fetching class types:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      difficulty_level: 'all_levels',
      default_duration: 60,
      default_capacity: 12,
      badge_label: '',
      is_active: true,
    });
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a class name');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('class_types')
        .insert({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          difficulty_level: formData.difficulty_level as 'beginner' | 'intermediate' | 'advanced' | 'all_levels',
          default_duration: formData.default_duration,
          default_capacity: formData.default_capacity,
          badge_label: formData.badge_label.trim() || null,
          is_active: formData.is_active,
          sort_order: classTypes.length + 1,
        });

      if (error) throw error;

      toast.success('Class type created');
      setShowCreateForm(false);
      resetForm();
      fetchClassTypes();
    } catch (error) {
      console.error('Error creating class type:', error);
      toast.error('Failed to create class type');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (classType: ClassType) => {
    setEditingId(classType.id);
    setFormData({
      name: classType.name,
      description: classType.description || '',
      difficulty_level: classType.difficulty_level,
      default_duration: classType.default_duration,
      default_capacity: classType.default_capacity,
      badge_label: classType.badge_label || '',
      is_active: classType.is_active,
    });
  };

  const handleUpdate = async () => {
    if (!editingId || !formData.name.trim()) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('class_types')
        .update({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          difficulty_level: formData.difficulty_level as 'beginner' | 'intermediate' | 'advanced' | 'all_levels',
          default_duration: formData.default_duration,
          default_capacity: formData.default_capacity,
          badge_label: formData.badge_label.trim() || null,
          is_active: formData.is_active,
        })
        .eq('id', editingId);

      if (error) throw error;

      toast.success('Class type updated');
      setEditingId(null);
      resetForm();
      fetchClassTypes();
    } catch (error) {
      console.error('Error updating class type:', error);
      toast.error('Failed to update class type');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (classType: ClassType) => {
    try {
      const { error } = await supabase
        .from('class_types')
        .update({ is_active: !classType.is_active })
        .eq('id', classType.id);

      if (error) throw error;

      toast.success(classType.is_active ? 'Class type disabled' : 'Class type enabled');
      fetchClassTypes();
    } catch (error) {
      console.error('Error toggling class type:', error);
      toast.error('Failed to update class type');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <SEO 
        title="Manage Class Types" 
        description="Create and manage class types for Drake Fitness."
      />
      
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">Class Types</h1>
              <p className="text-muted-foreground mt-1">
                Manage the types of classes you offer
              </p>
            </div>
            <Button onClick={() => { setShowCreateForm(true); setEditingId(null); resetForm(); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class Type
            </Button>
          </div>

          {/* Create/Edit Form */}
          {(showCreateForm || editingId) && (
            <Card className="shadow-card border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-hero text-xl uppercase">
                    {editingId ? 'Edit Class Type' : 'Create Class Type'}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => { setShowCreateForm(false); setEditingId(null); resetForm(); }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Class Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Foundation Flow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badge Label</Label>
                    <Input
                      value={formData.badge_label}
                      onChange={(e) => setFormData({ ...formData, badge_label: e.target.value })}
                      placeholder="e.g., Beginner Friendly"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this class type..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Default Duration (min)</Label>
                    <Input
                      type="number"
                      value={formData.default_duration}
                      onChange={(e) => setFormData({ ...formData, default_duration: parseInt(e.target.value) })}
                      min={15}
                      max={180}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Capacity</Label>
                    <Input
                      type="number"
                      value={formData.default_capacity}
                      onChange={(e) => setFormData({ ...formData, default_capacity: parseInt(e.target.value) })}
                      min={1}
                      max={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active</Label>
                    <div className="flex items-center h-10">
                      <Switch
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={editingId ? handleUpdate : handleCreate} 
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {editingId ? 'Update' : 'Create'}
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { setShowCreateForm(false); setEditingId(null); resetForm(); }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Class Types List */}
          <div className="grid gap-4">
            {classTypes.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No class types created yet</p>
                </CardContent>
              </Card>
            ) : (
              classTypes.map((classType) => (
                <Card key={classType.id} className={`shadow-card ${!classType.is_active ? 'opacity-60' : ''}`}>
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{classType.name}</p>
                          {classType.badge_label && (
                            <Badge variant="secondary">{classType.badge_label}</Badge>
                          )}
                          {!classType.is_active && (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {classType.description || 'No description'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{classType.default_duration} min</span>
                          <span>Max {classType.default_capacity} people</span>
                          <span className="capitalize">{classType.difficulty_level.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={classType.is_active}
                          onCheckedChange={() => handleToggleActive(classType)}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(classType)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
