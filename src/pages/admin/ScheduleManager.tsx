import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Plus, Calendar, Users, Clock, Trash2, RefreshCw } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

interface ClassType {
  id: string;
  name: string;
  default_duration: number;
  default_capacity: number;
  badge_label: string;
}

interface ScheduledClass {
  id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  status: string;
  class_type: {
    name: string;
    badge_label: string;
  };
}

export default function ScheduleManager() {
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [schedules, setSchedules] = useState<ScheduledClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [selectedClassType, setSelectedClassType] = useState('');
  const [scheduleDate, setScheduleDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [capacity, setCapacity] = useState(12);

  // Sync PunchPass schedule manually
  const handleSyncPunchPass = async () => {
    setIsSyncing(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        toast.error('You must be logged in to sync');
        return;
      }

      const { error } = await supabase.functions.invoke('sync-punchpass-schedule', {
        headers: { Authorization: `Bearer ${session.session.access_token}` }
      });

      if (error) {
        console.error('Sync error:', error);
        toast.error('Failed to sync PunchPass schedule');
        return;
      }

      toast.success('PunchPass schedule synced successfully');
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync PunchPass schedule');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch class types
      const { data: types } = await supabase
        .from('class_types')
        .select('id, name, default_duration, default_capacity, badge_label')
        .eq('is_active', true)
        .order('sort_order');

      setClassTypes(types || []);

      // Fetch upcoming schedules
      const { data: schedulesData } = await supabase
        .from('class_schedules')
        .select(`
          id, start_time, end_time, capacity, booked_count, status,
          classes!inner(class_types!inner(name, badge_label))
        `)
        .gte('start_time', new Date().toISOString())
        .order('start_time')
        .limit(50);

      const formattedSchedules = (schedulesData || []).map((s: any) => ({
        id: s.id,
        start_time: s.start_time,
        end_time: s.end_time,
        capacity: s.capacity,
        booked_count: s.booked_count,
        status: s.status,
        class_type: {
          name: s.classes.class_types.name,
          badge_label: s.classes.class_types.badge_label,
        },
      }));

      setSchedules(formattedSchedules);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassTypeChange = (typeId: string) => {
    setSelectedClassType(typeId);
    const classType = classTypes.find(t => t.id === typeId);
    if (classType) {
      setDuration(classType.default_duration);
      setCapacity(classType.default_capacity);
    }
  };

  const handleCreateSchedule = async () => {
    if (!selectedClassType) {
      toast.error('Please select a class type');
      return;
    }

    setIsSaving(true);
    try {
      // First, get or create a class record for this class type
      let { data: existingClass } = await supabase
        .from('classes')
        .select('id')
        .eq('class_type_id', selectedClassType)
        .limit(1)
        .maybeSingle();

      let classId: string;

      if (existingClass) {
        classId = existingClass.id;
      } else {
        // Create a new class record
        const { data: newClass, error: classError } = await supabase
          .from('classes')
          .insert({ class_type_id: selectedClassType })
          .select('id')
          .single();

        if (classError) throw classError;
        classId = newClass.id;
      }

      // Create the schedule
      const startDateTime = new Date(`${scheduleDate}T${startTime}`);
      const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

      const { error } = await supabase
        .from('class_schedules')
        .insert({
          class_id: classId,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          capacity,
          booked_count: 0,
          status: 'scheduled',
        });

      if (error) throw error;

      toast.success('Class scheduled successfully');
      setShowCreateForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error('Failed to create schedule');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this scheduled class?')) return;

    try {
      const { error } = await supabase
        .from('class_schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) throw error;

      toast.success('Schedule deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    }
  };

  const resetForm = () => {
    setSelectedClassType('');
    setScheduleDate(format(new Date(), 'yyyy-MM-dd'));
    setStartTime('09:00');
    setDuration(60);
    setCapacity(12);
  };

  // Group schedules by date
  const schedulesByDate = schedules.reduce((acc, schedule) => {
    const date = format(new Date(schedule.start_time), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(schedule);
    return acc;
  }, {} as Record<string, ScheduledClass[]>);

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
        title="Schedule Manager" 
        description="Create and manage class schedules for Drake Fitness."
      />
      
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">Schedule</h1>
              <p className="text-muted-foreground mt-1">
                Manage class schedules
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSyncPunchPass}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Sync PunchPass
              </Button>
              <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            </div>
          </div>

          {/* Create Schedule Form */}
          {showCreateForm && (
            <Card className="shadow-card border-primary">
              <CardHeader>
                <CardTitle className="font-hero text-xl uppercase">Schedule New Class</CardTitle>
                <CardDescription>Add a class to the schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Class Type</Label>
                    <Select value={selectedClassType} onValueChange={handleClassTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class type" />
                      </SelectTrigger>
                      <SelectContent>
                        {classTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration (min)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      min={15}
                      max={180}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(parseInt(e.target.value))}
                      min={1}
                      max={50}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateSchedule} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Schedule'
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Classes */}
          <div className="space-y-6">
            {Object.keys(schedulesByDate).length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming classes scheduled</p>
                  <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
                    Schedule Your First Class
                  </Button>
                </CardContent>
              </Card>
            ) : (
              Object.entries(schedulesByDate).map(([date, daySchedules]) => (
                <div key={date}>
                  <h3 className="font-hero text-lg uppercase mb-3">
                    {format(new Date(date), 'EEEE, MMMM d')}
                  </h3>
                  <div className="grid gap-3">
                    {daySchedules.map((schedule) => (
                      <Card key={schedule.id} className="shadow-card">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-semibold text-lg">{schedule.class_type.name}</p>
                                <Badge variant="secondary">{schedule.class_type.badge_label}</Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {format(new Date(schedule.start_time), 'h:mm a')} - {format(new Date(schedule.end_time), 'h:mm a')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {schedule.booked_count}/{schedule.capacity} booked
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={schedule.booked_count >= schedule.capacity ? 'destructive' : 'outline'}
                              >
                                {schedule.booked_count >= schedule.capacity ? 'Full' : `${schedule.capacity - schedule.booked_count} spots left`}
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteSchedule(schedule.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
