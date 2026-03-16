import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Filter, CheckSquare, Square, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScheduleClass } from './types';
import { toast } from 'sonner';

interface SchedulePresetsProps {
  onApplyPreset: (data: {
    headline: string;
    programLine: string;
    detailLine: string;
    ctaText: string;
    eyebrow: string;
    showBadge: boolean;
    scheduleClasses: ScheduleClass[];
    suggestedTemplate: 'schedule-grid' | 'class-highlight';
  }) => void;
}

export default function SchedulePresets({ onApplyPreset }: SchedulePresetsProps) {
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<'today' | 'week'>('week');
  const [filterOpen, setFilterOpen] = useState(false);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      if (dateRange === 'week') endDate.setDate(endDate.getDate() + 7);
      const end = endDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('punchpass_schedule')
        .select('*')
        .gte('class_date', today)
        .lte('class_date', end)
        .order('class_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
      setSelectedIds(new Set((data || []).map(c => c.id)));
    } catch (err) {
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedule(); }, [dateRange]);

  const toggleClass = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === classes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(classes.map(c => c.id)));
    }
  };

  const selectedClasses = classes.filter(c => selectedIds.has(c.id));

  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
  };

  const applyTodaysClasses = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayClasses = selectedClasses.filter(c => c.class_date === today);
    if (todayClasses.length === 0) {
      toast.error('No classes selected for today');
      return;
    }
    const classNames = [...new Set(todayClasses.map(c => c.class_name))].join(' · ');
    onApplyPreset({
      headline: "Today's Classes",
      programLine: classNames,
      detailLine: todayClasses.map(c => `${formatTime(c.start_time)} — ${c.class_name}`).join(' | '),
      ctaText: 'Book Now →',
      eyebrow: 'WEST ASHLEY · CHARLESTON',
      showBadge: false,
      scheduleClasses: todayClasses,
      suggestedTemplate: 'schedule-grid',
    });
  };

  const applyTodaysCrew = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayClasses = selectedClasses.filter(c => c.class_date === today);
    const instructors = [...new Set(todayClasses.map(c => c.instructor).filter(Boolean))];
    onApplyPreset({
      headline: "Today's Crew",
      programLine: instructors.join(' & ') || 'Drake Fitness Coaches',
      detailLine: todayClasses.map(c => `${c.instructor || 'TBD'} — ${c.class_name} ${formatTime(c.start_time)}`).join(' | '),
      ctaText: 'Join Us Today →',
      eyebrow: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase(),
      showBadge: false,
      scheduleClasses: todayClasses,
      suggestedTemplate: 'class-highlight',
    });
  };

  const applyWeekSchedule = () => {
    if (selectedClasses.length === 0) {
      toast.error('No classes selected');
      return;
    }
    onApplyPreset({
      headline: "This Week's Schedule",
      programLine: 'Strength & Mobility Classes',
      detailLine: `${selectedClasses.length} classes this week`,
      ctaText: 'Book Your Spot →',
      eyebrow: 'WEST ASHLEY · CHARLESTON',
      showBadge: false,
      scheduleClasses: selectedClasses,
      suggestedTemplate: 'schedule-grid',
    });
  };

  const applySingleClass = (cls: ScheduleClass) => {
    const dayName = new Date(cls.class_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' });
    onApplyPreset({
      headline: cls.class_name,
      programLine: cls.instructor || 'Drake Fitness',
      detailLine: `${dayName} at ${formatTime(cls.start_time)}`,
      ctaText: 'Book This Class →',
      eyebrow: 'WEST ASHLEY · CHARLESTON',
      showBadge: false,
      scheduleClasses: [cls],
      suggestedTemplate: 'class-highlight',
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
          <Calendar className="h-3.5 w-3.5 text-drake-gold" />
          Schedule
        </h3>
        <div className="flex gap-1.5">
          <button
            onClick={() => setDateRange('today')}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${dateRange === 'today' ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground'}`}
          >Today</button>
          <button
            onClick={() => setDateRange('week')}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${dateRange === 'week' ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground'}`}
          >Week</button>
        </div>
      </div>

      {/* Quick Apply Pills */}
      <div className="flex gap-1.5 flex-wrap">
        <button onClick={applyTodaysClasses} className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-border hover:border-drake-gold/50 text-muted-foreground hover:text-foreground transition-all bg-card">
          <Clock className="h-3 w-3" /> Today's Classes
        </button>
        <button onClick={applyTodaysCrew} className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-border hover:border-drake-gold/50 text-muted-foreground hover:text-foreground transition-all bg-card">
          <Users className="h-3 w-3" /> Today's Crew
        </button>
        <button onClick={applyWeekSchedule} className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-border hover:border-drake-gold/50 text-muted-foreground hover:text-foreground transition-all bg-card">
          <Calendar className="h-3 w-3" /> Week Schedule
        </button>
      </div>

      {/* Collapsible filter */}
      {classes.length > 0 && (
        <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Filter className="h-3 w-3" />
            Filter classes ({selectedIds.size}/{classes.length})
            <ChevronDown className={`h-3 w-3 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-1">
            <div className="flex items-center justify-between mb-1">
              <button onClick={toggleAll} className="text-[10px] text-drake-gold hover:underline">
                {selectedIds.size === classes.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-0.5 pr-1">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => toggleClass(cls.id)}
                  className={`w-full flex items-center gap-1.5 text-[10px] px-2 py-1 rounded text-left transition-colors ${selectedIds.has(cls.id) ? 'bg-drake-gold/10' : 'hover:bg-muted'}`}
                >
                  {selectedIds.has(cls.id) ? <CheckSquare className="h-3 w-3 text-drake-gold flex-shrink-0" /> : <Square className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
                  <span className="font-medium truncate">{cls.class_name}</span>
                  <span className="text-muted-foreground ml-auto flex-shrink-0">
                    {new Date(cls.class_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })} {formatTime(cls.start_time)}
                  </span>
                </button>
              ))}
            </div>
            {/* Single Class Spotlight */}
            <div className="pt-1">
              <span className="text-[10px] text-muted-foreground block mb-1">Spotlight</span>
              <div className="flex gap-1 flex-wrap">
                {classes.slice(0, 6).map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => applySingleClass(cls)}
                    className="text-[9px] px-1.5 py-0.5 rounded border border-border hover:border-drake-gold/50 transition-colors text-muted-foreground"
                  >
                    {cls.class_name}
                  </button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {loading && <p className="text-[10px] text-muted-foreground">Loading…</p>}
    </div>
  );
}
