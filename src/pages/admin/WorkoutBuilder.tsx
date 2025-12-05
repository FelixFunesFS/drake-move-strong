import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Plus,
  Search,
  GripVertical,
  Trash2,
  Copy,
  Eye,
  Save,
  Link2,
  Clock,
  Dumbbell,
  X,
  ChevronUp,
  ChevronDown,
  Layers,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
type WorkoutTemplate = Database["public"]["Tables"]["workout_templates"]["Row"];
type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];
type FocusArea = Database["public"]["Enums"]["focus_area"];

interface TemplateExercise {
  id: string;
  exercise_id: string;
  exercise: Exercise;
  order_index: number;
  sets: number | null;
  reps: string | null;
  duration_seconds: number | null;
  rest_seconds: number | null;
  notes: string | null;
  superset_group: number | null;
}

interface TemplateFormData {
  name: string;
  description: string;
  focus_area: FocusArea;
  difficulty_level: DifficultyLevel;
  is_public: boolean;
  tags: string[];
}

const FOCUS_AREAS: { value: FocusArea; label: string }[] = [
  { value: "strength", label: "Strength" },
  { value: "mobility", label: "Mobility" },
  { value: "cardio", label: "Cardio" },
  { value: "hybrid", label: "Hybrid" },
];

const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all_levels", label: "All Levels" },
];

const defaultFormData: TemplateFormData = {
  name: "",
  description: "",
  focus_area: "strength",
  difficulty_level: "all_levels",
  is_public: false,
  tags: [],
};

export default function WorkoutBuilder() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WorkoutTemplate | null>(null);
  const [formData, setFormData] = useState<TemplateFormData>(defaultFormData);
  const [templateExercises, setTemplateExercises] = useState<TemplateExercise[]>([]);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [nextSupersetGroup, setNextSupersetGroup] = useState(1);

  // Fetch templates
  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ["workout-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as WorkoutTemplate[];
    },
  });

  // Fetch exercises for selection
  const { data: exercises } = useQuery({
    queryKey: ["exercises-for-builder"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data as Exercise[];
    },
  });

  // Fetch template exercises when editing
  const fetchTemplateExercises = async (templateId: string) => {
    const { data, error } = await supabase
      .from("workout_template_exercises")
      .select("*, exercises(*)")
      .eq("template_id", templateId)
      .order("order_index");

    if (error) throw error;

    return data.map((item) => ({
      id: item.id,
      exercise_id: item.exercise_id,
      exercise: item.exercises as Exercise,
      order_index: item.order_index,
      sets: item.sets,
      reps: item.reps,
      duration_seconds: item.duration_seconds,
      rest_seconds: item.rest_seconds,
      notes: item.notes,
      superset_group: item.superset_group,
    }));
  };

  // Save template mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      let templateId: string;

      if (editingTemplate) {
        const { error } = await supabase
          .from("workout_templates")
          .update({
            name: formData.name,
            description: formData.description,
            focus_area: formData.focus_area,
            difficulty_level: formData.difficulty_level,
            is_public: formData.is_public,
            tags: formData.tags,
            estimated_duration_minutes: calculateEstimatedDuration(),
          })
          .eq("id", editingTemplate.id);

        if (error) throw error;
        templateId = editingTemplate.id;

        // Delete existing exercises
        await supabase
          .from("workout_template_exercises")
          .delete()
          .eq("template_id", templateId);
      } else {
        const { data, error } = await supabase
          .from("workout_templates")
          .insert({
            name: formData.name,
            description: formData.description,
            focus_area: formData.focus_area,
            difficulty_level: formData.difficulty_level,
            is_public: formData.is_public,
            tags: formData.tags,
            coach_id: user?.id,
            estimated_duration_minutes: calculateEstimatedDuration(),
          })
          .select()
          .single();

        if (error) throw error;
        templateId = data.id;
      }

      // Insert exercises
      if (templateExercises.length > 0) {
        const exercisesData = templateExercises.map((ex, index) => ({
          template_id: templateId,
          exercise_id: ex.exercise_id,
          order_index: index,
          sets: ex.sets,
          reps: ex.reps,
          duration_seconds: ex.duration_seconds,
          rest_seconds: ex.rest_seconds,
          notes: ex.notes,
          superset_group: ex.superset_group,
        }));

        const { error } = await supabase
          .from("workout_template_exercises")
          .insert(exercisesData);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-templates"] });
      toast.success(editingTemplate ? "Template updated" : "Template created");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error("Failed to save template: " + error.message);
    },
  });

  // Delete template mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("workout_template_exercises").delete().eq("template_id", id);
      const { error } = await supabase.from("workout_templates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-templates"] });
      toast.success("Template deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete template: " + error.message);
    },
  });

  // Duplicate template
  const duplicateMutation = useMutation({
    mutationFn: async (template: WorkoutTemplate) => {
      const { data: newTemplate, error } = await supabase
        .from("workout_templates")
        .insert({
          name: `${template.name} (Copy)`,
          description: template.description,
          focus_area: template.focus_area,
          difficulty_level: template.difficulty_level,
          is_public: false,
          tags: template.tags,
          coach_id: user?.id,
          estimated_duration_minutes: template.estimated_duration_minutes,
        })
        .select()
        .single();

      if (error) throw error;

      // Copy exercises
      const { data: existingExercises } = await supabase
        .from("workout_template_exercises")
        .select("*")
        .eq("template_id", template.id);

      if (existingExercises && existingExercises.length > 0) {
        const newExercises = existingExercises.map((ex) => ({
          template_id: newTemplate.id,
          exercise_id: ex.exercise_id,
          order_index: ex.order_index,
          sets: ex.sets,
          reps: ex.reps,
          duration_seconds: ex.duration_seconds,
          rest_seconds: ex.rest_seconds,
          notes: ex.notes,
          superset_group: ex.superset_group,
        }));

        await supabase.from("workout_template_exercises").insert(newExercises);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-templates"] });
      toast.success("Template duplicated");
    },
    onError: (error) => {
      toast.error("Failed to duplicate template: " + error.message);
    },
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setFormData(defaultFormData);
    setTemplateExercises([]);
    setPreviewMode(false);
    setNextSupersetGroup(1);
  };

  const handleEditTemplate = async (template: WorkoutTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || "",
      focus_area: template.focus_area || "strength",
      difficulty_level: template.difficulty_level || "all_levels",
      is_public: template.is_public ?? false,
      tags: template.tags || [],
    });

    const exercises = await fetchTemplateExercises(template.id);
    setTemplateExercises(exercises);

    const maxGroup = Math.max(0, ...exercises.map((e) => e.superset_group || 0));
    setNextSupersetGroup(maxGroup + 1);

    setIsDialogOpen(true);
  };

  const addExerciseToTemplate = (exercise: Exercise) => {
    const newExercise: TemplateExercise = {
      id: crypto.randomUUID(),
      exercise_id: exercise.id,
      exercise,
      order_index: templateExercises.length,
      sets: 3,
      reps: "10",
      duration_seconds: null,
      rest_seconds: 60,
      notes: null,
      superset_group: null,
    };
    setTemplateExercises([...templateExercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    setTemplateExercises(templateExercises.filter((e) => e.id !== id));
  };

  const updateExercise = (id: string, updates: Partial<TemplateExercise>) => {
    setTemplateExercises(
      templateExercises.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const moveExercise = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= templateExercises.length) return;

    const newExercises = [...templateExercises];
    [newExercises[index], newExercises[newIndex]] = [
      newExercises[newIndex],
      newExercises[index],
    ];
    setTemplateExercises(newExercises);
  };

  const createSuperset = (exerciseIds: string[]) => {
    setTemplateExercises(
      templateExercises.map((e) =>
        exerciseIds.includes(e.id)
          ? { ...e, superset_group: nextSupersetGroup }
          : e
      )
    );
    setNextSupersetGroup(nextSupersetGroup + 1);
  };

  const removeFromSuperset = (id: string) => {
    updateExercise(id, { superset_group: null });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const calculateEstimatedDuration = () => {
    let totalSeconds = 0;
    templateExercises.forEach((ex) => {
      if (ex.duration_seconds) {
        totalSeconds += ex.duration_seconds * (ex.sets || 1);
      } else {
        // Estimate 30 seconds per set
        totalSeconds += 30 * (ex.sets || 1);
      }
      // Add rest time
      totalSeconds += (ex.rest_seconds || 0) * ((ex.sets || 1) - 1);
    });
    return Math.ceil(totalSeconds / 60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }
    saveMutation.mutate();
  };

  const filteredTemplates = templates?.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExercises = exercises?.filter(
    (e) =>
      e.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
      e.muscle_groups?.some((m) =>
        m.toLowerCase().includes(exerciseSearch.toLowerCase())
      )
  );

  // Group exercises by superset
  const groupedExercises = () => {
    const groups: { group: number | null; exercises: TemplateExercise[] }[] = [];
    let currentGroup: number | null = null;
    let currentExercises: TemplateExercise[] = [];

    templateExercises.forEach((ex, index) => {
      if (ex.superset_group !== currentGroup) {
        if (currentExercises.length > 0) {
          groups.push({ group: currentGroup, exercises: currentExercises });
        }
        currentGroup = ex.superset_group;
        currentExercises = [ex];
      } else {
        currentExercises.push(ex);
      }

      if (index === templateExercises.length - 1) {
        groups.push({ group: currentGroup, exercises: currentExercises });
      }
    });

    return groups;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workout Builder</h1>
            <p className="text-muted-foreground">
              Create and manage workout templates
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setFormData(defaultFormData)}>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{editingTemplate ? "Edit Template" : "Create Workout Template"}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={previewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              {previewMode ? (
                <WorkoutPreview
                  formData={formData}
                  exercises={templateExercises}
                  estimatedDuration={calculateEstimatedDuration()}
                />
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Panel - Template Details & Exercise Selection */}
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="details">Template Details</TabsTrigger>
                          <TabsTrigger value="exercises">Add Exercises</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="flex-1 overflow-auto space-y-4 mt-4">
                          <div>
                            <Label htmlFor="name">Template Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder="e.g., Full Body Strength A"
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                              placeholder="Describe this workout..."
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Focus Area</Label>
                              <Select
                                value={formData.focus_area}
                                onValueChange={(value: FocusArea) =>
                                  setFormData({ ...formData, focus_area: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FOCUS_AREAS.map((area) => (
                                    <SelectItem key={area.value} value={area.value}>
                                      {area.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Difficulty</Label>
                              <Select
                                value={formData.difficulty_level}
                                onValueChange={(value: DifficultyLevel) =>
                                  setFormData({ ...formData, difficulty_level: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DIFFICULTY_LEVELS.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Tags</Label>
                            <div className="flex gap-2 mt-2">
                              <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add tag..."
                                onKeyPress={(e) =>
                                  e.key === "Enter" && (e.preventDefault(), addTag())
                                }
                              />
                              <Button type="button" onClick={addTag} variant="outline">
                                Add
                              </Button>
                            </div>
                            {formData.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="gap-1">
                                    {tag}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => removeTag(tag)}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Switch
                              checked={formData.is_public}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, is_public: checked })
                              }
                            />
                            <Label>Make template public (available for assignment)</Label>
                          </div>

                          <Card className="bg-muted/50">
                            <CardContent className="pt-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Estimated Duration:{" "}
                                  <strong>{calculateEstimatedDuration()} minutes</strong>
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm mt-1">
                                <Dumbbell className="h-4 w-4" />
                                <span>
                                  Exercises: <strong>{templateExercises.length}</strong>
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="exercises" className="flex-1 overflow-hidden flex flex-col mt-4">
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search exercises..."
                              value={exerciseSearch}
                              onChange={(e) => setExerciseSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          <ScrollArea className="flex-1">
                            <div className="space-y-2 pr-4">
                              {filteredExercises?.map((exercise) => (
                                <Card
                                  key={exercise.id}
                                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                                  onClick={() => addExerciseToTemplate(exercise)}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium text-sm">{exercise.name}</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {exercise.muscle_groups?.slice(0, 3).map((mg) => (
                                            <Badge
                                              key={mg}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {mg}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <Plus className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Right Panel - Workout Composition */}
                    <div className="flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Workout Exercises</h3>
                        {templateExercises.length >= 2 && (
                          <SupersetSelector
                            exercises={templateExercises}
                            onCreateSuperset={createSuperset}
                          />
                        )}
                      </div>

                      <ScrollArea className="flex-1">
                        <div className="space-y-3 pr-4">
                          {templateExercises.length === 0 ? (
                            <Card className="border-dashed">
                              <CardContent className="py-8 text-center text-muted-foreground">
                                <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>Add exercises from the left panel</p>
                              </CardContent>
                            </Card>
                          ) : (
                            groupedExercises().map((group, groupIndex) => (
                              <div key={groupIndex}>
                                {group.group && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <Layers className="h-4 w-4 text-primary" />
                                    <span className="text-xs font-medium text-primary">
                                      Superset {group.group}
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={
                                    group.group
                                      ? "border-l-2 border-primary pl-3 space-y-2"
                                      : "space-y-2"
                                  }
                                >
                                  {group.exercises.map((ex, index) => {
                                    const globalIndex = templateExercises.findIndex(
                                      (e) => e.id === ex.id
                                    );
                                    return (
                                      <ExerciseCard
                                        key={ex.id}
                                        exercise={ex}
                                        index={globalIndex}
                                        total={templateExercises.length}
                                        onUpdate={updateExercise}
                                        onRemove={removeExercise}
                                        onMove={moveExercise}
                                        onRemoveFromSuperset={
                                          ex.superset_group ? removeFromSuperset : undefined
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saveMutation.isPending}>
                      <Save className="h-4 w-4 mr-2" />
                      {saveMutation.isPending ? "Saving..." : "Save Template"}
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Templates Grid */}
        {templatesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTemplates?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first workout template to get started
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates?.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => duplicateMutation.mutate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => {
                          if (confirm("Delete this template?")) {
                            deleteMutation.mutate(template.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {template.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {template.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{template.focus_area}</Badge>
                    <Badge variant="secondary">{template.difficulty_level}</Badge>
                    {template.is_public && (
                      <Badge className="bg-green-100 text-green-800">Public</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {template.estimated_duration_minutes || 0} min
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// Exercise Card Component
function ExerciseCard({
  exercise,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
  onRemoveFromSuperset,
}: {
  exercise: TemplateExercise;
  index: number;
  total: number;
  onUpdate: (id: string, updates: Partial<TemplateExercise>) => void;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: "up" | "down") => void;
  onRemoveFromSuperset?: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex flex-col gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={index === 0}
              onClick={() => onMove(index, "up")}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={index === total - 1}
              onClick={() => onMove(index, "down")}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm truncate">{exercise.exercise.name}</p>
              <div className="flex gap-1">
                {onRemoveFromSuperset && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onRemoveFromSuperset(exercise.id)}
                    title="Remove from superset"
                  >
                    <Link2 className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive"
                  onClick={() => onRemove(exercise.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label className="text-xs">Sets</Label>
                <Input
                  type="number"
                  min="1"
                  value={exercise.sets || ""}
                  onChange={(e) =>
                    onUpdate(exercise.id, { sets: parseInt(e.target.value) || null })
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Reps</Label>
                <Input
                  value={exercise.reps || ""}
                  onChange={(e) => onUpdate(exercise.id, { reps: e.target.value })}
                  placeholder="10"
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Duration (s)</Label>
                <Input
                  type="number"
                  value={exercise.duration_seconds || ""}
                  onChange={(e) =>
                    onUpdate(exercise.id, {
                      duration_seconds: parseInt(e.target.value) || null,
                    })
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Rest (s)</Label>
                <Input
                  type="number"
                  value={exercise.rest_seconds || ""}
                  onChange={(e) =>
                    onUpdate(exercise.id, {
                      rest_seconds: parseInt(e.target.value) || null,
                    })
                  }
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div className="mt-2">
              <Input
                placeholder="Coach notes for this exercise..."
                value={exercise.notes || ""}
                onChange={(e) => onUpdate(exercise.id, { notes: e.target.value })}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Superset Selector Component
function SupersetSelector({
  exercises,
  onCreateSuperset,
}: {
  exercises: TemplateExercise[];
  onCreateSuperset: (ids: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (selectedIds.length >= 2) {
      onCreateSuperset(selectedIds);
      setSelectedIds([]);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Layers className="h-4 w-4 mr-1" />
          Create Superset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Superset</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          Select 2 or more exercises to group as a superset
        </p>
        <ScrollArea className="max-h-[300px]">
          <div className="space-y-2">
            {exercises
              .filter((e) => !e.superset_group)
              .map((ex) => (
                <label
                  key={ex.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ex.id)}
                    onChange={() => handleToggle(ex.id)}
                    className="rounded"
                  />
                  <span className="text-sm">{ex.exercise.name}</span>
                </label>
              ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={selectedIds.length < 2}>
            Create Superset ({selectedIds.length} selected)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Workout Preview Component
function WorkoutPreview({
  formData,
  exercises,
  estimatedDuration,
}: {
  formData: TemplateFormData;
  exercises: TemplateExercise[];
  estimatedDuration: number;
}) {
  return (
    <ScrollArea className="flex-1">
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{formData.name || "Untitled Workout"}</h2>
          {formData.description && (
            <p className="text-muted-foreground">{formData.description}</p>
          )}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-sm">
              {formData.focus_area}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {formData.difficulty_level}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {estimatedDuration} min
            </span>
          </div>
        </div>

        {exercises.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>No exercises added yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {exercises.map((ex, index) => (
              <Card key={ex.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{ex.exercise.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        {ex.sets && (
                          <span>
                            <strong>{ex.sets}</strong> sets
                          </span>
                        )}
                        {ex.reps && (
                          <span>
                            <strong>{ex.reps}</strong> reps
                          </span>
                        )}
                        {ex.duration_seconds && (
                          <span>
                            <strong>{ex.duration_seconds}</strong> seconds
                          </span>
                        )}
                        {ex.rest_seconds && (
                          <span className="text-muted-foreground/70">
                            Rest: {ex.rest_seconds}s
                          </span>
                        )}
                      </div>
                      {ex.notes && (
                        <p className="mt-2 text-sm italic text-muted-foreground">
                          {ex.notes}
                        </p>
                      )}
                      {ex.superset_group && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          <Layers className="h-3 w-3 mr-1" />
                          Superset {ex.superset_group}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
