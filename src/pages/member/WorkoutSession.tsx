import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Check,
  CheckCircle,
  Clock,
  Dumbbell,
  Video,
  X,
  Trophy,
  Star,
  Layers,
} from "lucide-react";
import { format } from "date-fns";

interface Exercise {
  id: string;
  name: string;
  description: string | null;
  instructions: string | null;
  cues: string[] | null;
  video_id: string | null;
}

interface TemplateExercise {
  id: string;
  exercise_id: string;
  order_index: number;
  sets: number | null;
  reps: string | null;
  duration_seconds: number | null;
  rest_seconds: number | null;
  notes: string | null;
  superset_group: number | null;
  exercise: Exercise;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string | null;
  focus_area: string | null;
  estimated_duration_minutes: number | null;
}

interface MemberWorkoutPlan {
  id: string;
  template_id: string;
  custom_notes: string | null;
  template: WorkoutTemplate;
}

export default function WorkoutSession() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState("");
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Fetch workout plan
  const { data: plan, isLoading: planLoading } = useQuery({
    queryKey: ["workout-plan", planId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("member_workout_plans")
        .select("*, workout_templates(*)")
        .eq("id", planId)
        .eq("user_id", user!.id)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        template_id: data.template_id,
        custom_notes: data.custom_notes,
        template: data.workout_templates as unknown as WorkoutTemplate,
      } as MemberWorkoutPlan;
    },
    enabled: !!planId && !!user,
  });

  // Fetch exercises for this template
  const { data: exercises, isLoading: exercisesLoading } = useQuery({
    queryKey: ["template-exercises", plan?.template_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_template_exercises")
        .select("*, exercises(*)")
        .eq("template_id", plan!.template_id)
        .order("order_index");

      if (error) throw error;

      return data.map((item) => ({
        id: item.id,
        exercise_id: item.exercise_id,
        order_index: item.order_index,
        sets: item.sets,
        reps: item.reps,
        duration_seconds: item.duration_seconds,
        rest_seconds: item.rest_seconds,
        notes: item.notes,
        superset_group: item.superset_group,
        exercise: item.exercises as unknown as Exercise,
      })) as TemplateExercise[];
    },
    enabled: !!plan?.template_id,
  });

  // Fetch video info if needed
  const { data: videoInfo } = useQuery({
    queryKey: ["video-info", selectedVideoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("youtube_video_id, title")
        .eq("id", selectedVideoId!)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedVideoId,
  });

  // Start session timer
  useEffect(() => {
    if (!sessionStartTime && exercises && exercises.length > 0) {
      setSessionStartTime(new Date());
    }
  }, [exercises, sessionStartTime]);

  // Rest timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimeRemaining]);

  // Log workout mutation
  const logWorkoutMutation = useMutation({
    mutationFn: async () => {
      const durationMinutes = sessionStartTime
        ? Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000)
        : null;

      const { error } = await supabase.from("workout_logs").insert({
        user_id: user!.id,
        plan_id: planId,
        template_id: plan?.template_id,
        workout_date: format(new Date(), "yyyy-MM-dd"),
        started_at: sessionStartTime?.toISOString(),
        completed_at: new Date().toISOString(),
        duration_minutes: durationMinutes,
        rating,
        notes: notes || null,
        exercises_completed: Array.from(completedExercises),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-workout-logs"] });
      toast.success("Workout logged successfully!");
      navigate("/member/workouts");
    },
    onError: (error) => {
      toast.error("Failed to log workout: " + error.message);
    },
  });

  const currentExercise = exercises?.[currentExerciseIndex];
  const totalExercises = exercises?.length || 0;
  const progressPercent = totalExercises > 0
    ? ((currentExerciseIndex + (completedExercises.has(currentExercise?.id || "") ? 1 : 0)) / totalExercises) * 100
    : 0;

  const handleCompleteSet = () => {
    if (!currentExercise) return;

    const totalSets = currentExercise.sets || 1;
    
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
      // Start rest timer
      if (currentExercise.rest_seconds) {
        setRestTimeRemaining(currentExercise.rest_seconds);
        setIsResting(true);
      }
    } else {
      // Exercise complete
      setCompletedExercises((prev) => new Set([...prev, currentExercise.id]));
      handleNextExercise();
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTimeRemaining(0);
    } else {
      // Workout complete
      setShowCompleteDialog(true);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTimeRemaining(0);
    }
  };

  const handleSkipExercise = () => {
    handleNextExercise();
  };

  const handleFinishWorkout = () => {
    logWorkoutMutation.mutate();
  };

  const openVideoDemo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowVideoDialog(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (planLoading || exercisesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (!plan || !exercises || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <X className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">Workout Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This workout plan doesn't exist or has no exercises.
            </p>
            <Button asChild>
              <Link to="/member/workouts">Back to Workouts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO title={`Workout: ${plan.template.name}`} description="Active workout session" />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/member/workouts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit
                </Link>
              </Button>
              <div className="text-center">
                <p className="font-semibold">{plan.template.name}</p>
                <p className="text-xs text-muted-foreground">
                  Exercise {currentExerciseIndex + 1} of {totalExercises}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCompleteDialog(true)}
              >
                Finish
              </Button>
            </div>
            <Progress value={progressPercent} className="mt-3" />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Rest Timer Overlay */}
          {isResting && (
            <Card className="mb-6 bg-primary text-primary-foreground">
              <CardContent className="py-8 text-center">
                <p className="text-sm uppercase tracking-wider mb-2">Rest Time</p>
                <p className="text-5xl font-bold mb-4">{formatTime(restTimeRemaining)}</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setRestTimeRemaining((prev) => prev + 15)}
                  >
                    +15s
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsResting(false);
                      setRestTimeRemaining(0);
                    }}
                  >
                    Skip Rest
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Exercise */}
          {currentExercise && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    {currentExercise.superset_group && (
                      <Badge variant="outline" className="mb-2">
                        <Layers className="h-3 w-3 mr-1" />
                        Superset {currentExercise.superset_group}
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{currentExercise.exercise.name}</CardTitle>
                    {currentExercise.exercise.description && (
                      <p className="text-muted-foreground mt-1">
                        {currentExercise.exercise.description}
                      </p>
                    )}
                  </div>
                  {currentExercise.exercise.video_id && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openVideoDemo(currentExercise.exercise.video_id!)}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sets/Reps Display */}
                <div className="flex items-center justify-center gap-8 py-6 bg-muted rounded-lg">
                  {currentExercise.sets && (
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">
                        {currentSet}/{currentExercise.sets}
                      </p>
                      <p className="text-sm text-muted-foreground">Sets</p>
                    </div>
                  )}
                  {currentExercise.reps && (
                    <div className="text-center">
                      <p className="text-4xl font-bold">{currentExercise.reps}</p>
                      <p className="text-sm text-muted-foreground">Reps</p>
                    </div>
                  )}
                  {currentExercise.duration_seconds && (
                    <div className="text-center">
                      <p className="text-4xl font-bold">
                        {formatTime(currentExercise.duration_seconds)}
                      </p>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  )}
                </div>

                {/* Coaching Cues */}
                {currentExercise.exercise.cues && currentExercise.exercise.cues.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Coaching Cues:</p>
                    <ul className="space-y-1">
                      {currentExercise.exercise.cues.map((cue, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coach Notes */}
                {currentExercise.notes && (
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-1">Coach Notes:</p>
                    <p className="text-sm">{currentExercise.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={currentExerciseIndex === 0}
                    onClick={handlePreviousExercise}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button className="flex-1" onClick={handleCompleteSet}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {currentSet < (currentExercise.sets || 1) ? "Complete Set" : "Complete Exercise"}
                  </Button>
                  <Button variant="outline" onClick={handleSkipExercise}>
                    Skip
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exercise List Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {exercises.map((ex, index) => (
                    <div
                      key={ex.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        index === currentExerciseIndex
                          ? "bg-primary/10 border border-primary"
                          : completedExercises.has(ex.id)
                          ? "bg-muted/50 text-muted-foreground"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          completedExercises.has(ex.id)
                            ? "bg-green-500 text-white"
                            : index === currentExerciseIndex
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {completedExercises.has(ex.id) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={completedExercises.has(ex.id) ? "line-through" : ""}>
                        {ex.exercise.name}
                      </span>
                      {ex.superset_group && (
                        <Badge variant="outline" className="text-xs ml-auto">
                          SS{ex.superset_group}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>

        {/* Completion Dialog */}
        <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-drake-gold" />
                Workout Complete!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="text-center py-4">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-semibold">Great job!</p>
                <p className="text-muted-foreground">
                  You completed {completedExercises.size} of {totalExercises} exercises
                </p>
                {sessionStartTime && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Duration: {Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000)} minutes
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">How did it feel?</Label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant={rating === value ? "default" : "outline"}
                      size="icon"
                      className="h-12 w-12"
                      onClick={() => setRating(value)}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating >= value ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {rating === 1 && "Too easy"}
                  {rating === 2 && "Easy"}
                  {rating === 3 && "Just right"}
                  {rating === 4 && "Challenging"}
                  {rating === 5 && "Very hard"}
                </p>
              </div>

              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did the workout go? Any modifications?"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCompleteDialog(false)}
                >
                  Continue Workout
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleFinishWorkout}
                  disabled={logWorkoutMutation.isPending}
                >
                  {logWorkoutMutation.isPending ? "Saving..." : "Save & Exit"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Demo Dialog */}
        <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{videoInfo?.title || "Exercise Demo"}</DialogTitle>
            </DialogHeader>
            {videoInfo?.youtube_video_id && (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoInfo.youtube_video_id}?rel=0`}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
