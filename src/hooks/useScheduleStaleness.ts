import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StalenessInfo {
  isStale: boolean;
  lastSyncedAt: Date | null;
  hoursStale: number;
  isEmpty: boolean;
  isLoading: boolean;
}

export function useScheduleStaleness(maxAgeHours = 24): StalenessInfo {
  const [info, setInfo] = useState<StalenessInfo>({
    isStale: false,
    lastSyncedAt: null,
    hoursStale: 0,
    isEmpty: false,
    isLoading: true,
  });

  useEffect(() => {
    async function checkStaleness() {
      try {
        // Get the most recently synced record and the latest class date
        const { data, error } = await supabase
          .from('punchpass_schedule')
          .select('last_synced_at, class_date')
          .order('last_synced_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error checking schedule staleness:', error);
          setInfo({
            isStale: true,
            lastSyncedAt: null,
            hoursStale: 0,
            isEmpty: true,
            isLoading: false,
          });
          return;
        }

        if (!data) {
          setInfo({
            isStale: true,
            lastSyncedAt: null,
            hoursStale: 0,
            isEmpty: true,
            isLoading: false,
          });
          return;
        }

        const lastSync = new Date(data.last_synced_at);
        const now = new Date();
        const hoursStale = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60);

        // Also check if latest class_date is in the past (all classes expired)
        const latestClassDate = new Date(data.class_date + 'T23:59:59');
        const isDataOutdated = latestClassDate < now;

        setInfo({
          isStale: hoursStale > maxAgeHours || isDataOutdated,
          lastSyncedAt: lastSync,
          hoursStale: Math.round(hoursStale),
          isEmpty: false,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error checking schedule staleness:', error);
        setInfo({
          isStale: true,
          lastSyncedAt: null,
          hoursStale: 0,
          isEmpty: true,
          isLoading: false,
        });
      }
    }

    checkStaleness();
  }, [maxAgeHours]);

  return info;
}
