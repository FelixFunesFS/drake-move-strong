import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, Video, Dumbbell, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];

const MUSCLE_GROUPS = [
  "Chest", "Back", "Shoulders", "Legs", "Core", "Arms", "Glutes", "Full Body"
];

const EQUIPMENT = [
  "Kettlebell", "Barbell", "Dumbbell", "Bodyweight", "Bands", "Mace", "Sandbag", "Cable", "TRX"
];

const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all_levels", label: "All Levels" },
];

interface ExerciseFormData {
  name: string;
  description: string;
  instructions: string;
  muscle_groups: string[];
  equipment: string[];
  difficulty_level: DifficultyLevel;
  video_id: string | null;
  cues: string[];
  is_active: boolean;
}

const defaultFormData: ExerciseFormData = {
  name: "",
  description: "",
  instructions: "",
  muscle_groups: [],
  equipment: [],
  difficulty_level: "all_levels",
  video_id: null,
  cues: [],
  is_active: true,
};

export default function Exercises() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [formData, setFormData] = useState<ExerciseFormData>(defaultFormData);
  const [newCue, setNewCue] = useState("");

  // Fetch exercises
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["admin-exercises"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Exercise[];
    },
  });

  // Fetch videos for linking
  const { data: videos } = useQuery({
    queryKey: ["exercise-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, thumbnail_url")
        .eq("is_active", true)
        .order("title");

      if (error) throw error;
      return data;
    },
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ExerciseFormData) => {
      if (editingExercise) {
        const { error } = await supabase
          .from("exercises")
          .update({
            name: data.name,
            description: data.description,
            instructions: data.instructions,
            muscle_groups: data.muscle_groups,
            equipment: data.equipment,
            difficulty_level: data.difficulty_level,
            video_id: data.video_id || null,
            cues: data.cues,
            is_active: data.is_active,
          })
          .eq("id", editingExercise.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("exercises").insert({
          name: data.name,
          description: data.description,
          instructions: data.instructions,
          muscle_groups: data.muscle_groups,
          equipment: data.equipment,
          difficulty_level: data.difficulty_level,
          video_id: data.video_id || null,
          cues: data.cues,
          is_active: data.is_active,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
      toast.success(editingExercise ? "Exercise updated" : "Exercise created");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error("Failed to save exercise: " + error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("exercises").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
      toast.success("Exercise deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete exercise: " + error.message);
    },
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExercise(null);
    setFormData(defaultFormData);
    setNewCue("");
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setFormData({
      name: exercise.name,
      description: exercise.description || "",
      instructions: exercise.instructions || "",
      muscle_groups: exercise.muscle_groups || [],
      equipment: exercise.equipment || [],
      difficulty_level: exercise.difficulty_level || "all_levels",
      video_id: exercise.video_id,
      cues: exercise.cues || [],
      is_active: exercise.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Exercise name is required");
      return;
    }
    saveMutation.mutate(formData);
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const addCue = () => {
    if (newCue.trim()) {
      setFormData({ ...formData, cues: [...formData.cues, newCue.trim()] });
      setNewCue("");
    }
  };

  const removeCue = (index: number) => {
    setFormData({
      ...formData,
      cues: formData.cues.filter((_, i) => i !== index),
    });
  };

  // Filter exercises
  const filteredExercises = exercises?.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMuscle =
      muscleFilter === "all" ||
      exercise.muscle_groups?.includes(muscleFilter);

    const matchesEquipment =
      equipmentFilter === "all" ||
      exercise.equipment?.includes(equipmentFilter);

    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Exercise Library</h1>
            <p className="text-muted-foreground">
              Manage exercises for workout templates
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setFormData(defaultFormData)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExercise ? "Edit Exercise" : "Add New Exercise"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Exercise Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Kettlebell Swing"
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
                      placeholder="Brief description of the exercise..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Instructions (Markdown)</Label>
                    <Textarea
                      id="instructions"
                      value={formData.instructions}
                      onChange={(e) =>
                        setFormData({ ...formData, instructions: e.target.value })
                      }
                      placeholder="Step-by-step instructions..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Muscle Groups */}
                <div>
                  <Label>Muscle Groups</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {MUSCLE_GROUPS.map((muscle) => (
                      <Badge
                        key={muscle}
                        variant={
                          formData.muscle_groups.includes(muscle)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            muscle_groups: toggleArrayItem(
                              formData.muscle_groups,
                              muscle
                            ),
                          })
                        }
                      >
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <Label>Equipment</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {EQUIPMENT.map((equip) => (
                      <Badge
                        key={equip}
                        variant={
                          formData.equipment.includes(equip)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            equipment: toggleArrayItem(
                              formData.equipment,
                              equip
                            ),
                          })
                        }
                      >
                        {equip}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Difficulty & Video */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Difficulty Level</Label>
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

                  <div>
                    <Label>Demo Video</Label>
                    <Select
                      value={formData.video_id || "none"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          video_id: value === "none" ? null : value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select video" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No video</SelectItem>
                        {videos?.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            {video.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Coaching Cues */}
                <div>
                  <Label>Coaching Cues</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newCue}
                      onChange={(e) => setNewCue(e.target.value)}
                      placeholder="e.g., Keep your back flat"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCue())}
                    />
                    <Button type="button" onClick={addCue} variant="outline">
                      Add
                    </Button>
                  </div>
                  {formData.cues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.cues.map((cue, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {cue}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeCue(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? "Saving..." : "Save Exercise"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={muscleFilter} onValueChange={setMuscleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Muscle Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Muscles</SelectItem>
                  {MUSCLE_GROUPS.map((muscle) => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  {EQUIPMENT.map((equip) => (
                    <SelectItem key={equip} value={equip}>
                      {equip}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Exercises ({filteredExercises?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading exercises...
              </div>
            ) : filteredExercises?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No exercises found. Add your first exercise to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Muscle Groups</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Video</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExercises?.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          {exercise.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {exercise.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exercise.muscle_groups?.slice(0, 2).map((muscle) => (
                            <Badge key={muscle} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                          {(exercise.muscle_groups?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{exercise.muscle_groups!.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exercise.equipment?.slice(0, 2).map((equip) => (
                            <Badge key={equip} variant="secondary" className="text-xs">
                              {equip}
                            </Badge>
                          ))}
                          {(exercise.equipment?.length || 0) > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{exercise.equipment!.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {exercise.difficulty_level?.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {exercise.video_id ? (
                          <Video className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={exercise.is_active ? "default" : "secondary"}
                        >
                          {exercise.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditExercise(exercise)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Delete this exercise?")) {
                                deleteMutation.mutate(exercise.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
