import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import CoachLayout from '@/components/coach/CoachLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ClipboardList, Clock, Dumbbell, Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string | null;
  difficulty_level: string;
  focus_area: string;
  estimated_duration_minutes: number | null;
  exercise_count: number;
  assigned_count: number;
  is_public: boolean;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
  all_levels: 'bg-blue-100 text-blue-800',
};

const focusLabels: Record<string, string> = {
  strength: 'Strength',
  mobility: 'Mobility',
  cardio: 'Cardio',
  recovery: 'Recovery',
  full_body: 'Full Body',
};

export default function CoachTemplates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    try {
      // Fetch templates created by this coach
      const { data: templatesData } = await supabase
        .from('workout_templates')
        .select('id, name, description, difficulty_level, focus_area, estimated_duration_minutes, is_public, is_active')
        .eq('coach_id', user?.id)
        .eq('is_active', true)
        .order('name');

      if (!templatesData) {
        setTemplates([]);
        setIsLoading(false);
        return;
      }

      // Get exercise counts
      const templateIds = templatesData.map(t => t.id);
      const { data: exerciseCounts } = await supabase
        .from('workout_template_exercises')
        .select('template_id')
        .in('template_id', templateIds);

      const exerciseCountMap = (exerciseCounts || []).reduce((acc, e) => {
        acc[e.template_id] = (acc[e.template_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get assigned counts
      const { data: assignedCounts } = await supabase
        .from('member_workout_plans')
        .select('template_id')
        .in('template_id', templateIds)
        .eq('status', 'active');

      const assignedCountMap = (assignedCounts || []).reduce((acc, a) => {
        acc[a.template_id] = (acc[a.template_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const formattedTemplates = templatesData.map((t: any) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        difficulty_level: t.difficulty_level || 'all_levels',
        focus_area: t.focus_area || 'full_body',
        estimated_duration_minutes: t.estimated_duration_minutes,
        exercise_count: exerciseCountMap[t.id] || 0,
        assigned_count: assignedCountMap[t.id] || 0,
        is_public: t.is_public,
      }));

      setTemplates(formattedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <CoachLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CoachLayout>
    );
  }

  return (
    <>
      <SEO 
        title="Workout Templates" 
        description="Manage your workout templates."
      />
      
      <CoachLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">Workout Templates</h1>
              <p className="text-muted-foreground mt-1">
                {templates.length} template{templates.length !== 1 ? 's' : ''} created by you
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/workout-builder">
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Link>
            </Button>
          </div>

          {/* Templates Grid */}
          {templates.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No workout templates yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first template to start assigning workouts to members.
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/admin/workout-builder">Create Template</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.is_public && (
                        <Badge variant="outline" className="shrink-0">Public</Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {template.description || 'No description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={difficultyColors[template.difficulty_level]}>
                        {template.difficulty_level.replace('_', ' ')}
                      </Badge>
                      <Badge variant="secondary">
                        {focusLabels[template.focus_area] || template.focus_area}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="h-4 w-4" />
                        {template.exercise_count} exercises
                      </span>
                      {template.estimated_duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {template.estimated_duration_minutes} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {template.assigned_count} assigned
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CoachLayout>
    </>
  );
}
