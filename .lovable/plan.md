
## Automated PunchPass Schedule Sync with Staleness Detection

### Summary
Implement automated daily synchronization of the PunchPass schedule using `pg_cron`, add staleness detection to the UI components, and provide fallback messaging when data is outdated to ensure users always have access to booking.

---

### Part 1: Database - Enable pg_cron Extension

**Migration SQL:**
```sql
-- Enable required extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to postgres role for cron operations
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;
```

---

### Part 2: Update Edge Function for Cron Compatibility

**File: `supabase/functions/sync-punchpass-schedule/index.ts`**

Add support for service-role authentication (used by cron) while preserving admin manual trigger:

| Change | Description |
|--------|-------------|
| Check for service role key in Authorization header | Allow cron to bypass admin check |
| Add `X-Cron-Source` header detection | Log cron-triggered vs manual syncs |
| Keep existing admin auth flow for manual triggers | Backward compatible |

**Updated auth logic:**
```typescript
// Check if this is a cron-triggered request (service role)
const authHeader = req.headers.get('Authorization');
const isCronRequest = authHeader?.includes(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

if (isCronRequest) {
  console.log('[sync-punchpass-schedule] Cron-triggered sync starting...');
  // Proceed directly to sync
} else {
  // Existing admin auth validation
}
```

---

### Part 3: Create Cron Job via SQL

**SQL to schedule daily sync (run via insert tool, not migration):**
```sql
SELECT cron.schedule(
  'sync-punchpass-daily',
  '0 5 * * *',  -- 5:00 AM UTC daily (midnight EST)
  $$
  SELECT net.http_post(
    url := 'https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/sync-punchpass-schedule',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{"source": "cron"}'::jsonb
  ) AS request_id;
  $$
);
```

**Alternative: Store service role key in vault for cron access**

---

### Part 4: UI Staleness Detection Hook

**New File: `src/hooks/useScheduleStaleness.ts`**
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StalenessInfo {
  isStale: boolean;
  lastSyncedAt: Date | null;
  hoursStale: number;
  isEmpty: boolean;
}

export function useScheduleStaleness(maxAgeHours = 24): StalenessInfo {
  const [info, setInfo] = useState<StalenessInfo>({
    isStale: false,
    lastSyncedAt: null,
    hoursStale: 0,
    isEmpty: false,
  });

  useEffect(() => {
    async function checkStaleness() {
      const { data } = await supabase
        .from('punchpass_schedule')
        .select('last_synced_at, class_date')
        .order('last_synced_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!data) {
        setInfo({ isStale: true, lastSyncedAt: null, hoursStale: 0, isEmpty: true });
        return;
      }

      const lastSync = new Date(data.last_synced_at);
      const now = new Date();
      const hoursStale = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60);
      
      // Also check if latest class_date is in the past
      const latestClassDate = new Date(data.class_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const isDataOutdated = latestClassDate < today;
      
      setInfo({
        isStale: hoursStale > maxAgeHours || isDataOutdated,
        lastSyncedAt: lastSync,
        hoursStale: Math.round(hoursStale),
        isEmpty: false,
      });
    }

    checkStaleness();
  }, [maxAgeHours]);

  return info;
}
```

---

### Part 5: Fallback UI Component

**New File: `src/components/schedule/ScheduleFallbackBanner.tsx`**
```typescript
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertCircle } from "lucide-react";

interface ScheduleFallbackBannerProps {
  hoursStale?: number;
  isEmpty?: boolean;
}

export function ScheduleFallbackBanner({ hoursStale, isEmpty }: ScheduleFallbackBannerProps) {
  return (
    <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 mb-6">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800 dark:text-amber-200">
        {isEmpty ? 'Schedule Unavailable' : 'Schedule May Be Outdated'}
      </AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300 mt-2">
        <p className="mb-3">
          {isEmpty 
            ? "We're having trouble loading the class schedule."
            : `The schedule was last updated ${hoursStale} hours ago and may not reflect current availability.`
          }
        </p>
        <Button asChild variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-100">
          <a 
            href="https://drakefitness.punchpass.com/classes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            View Live Schedule on PunchPass
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
```

---

### Part 6: Integrate Staleness into Schedule Components

**File: `src/components/schedule/NativeWeeklySchedule.tsx`**

Add staleness check and conditionally show fallback banner:

```typescript
import { useScheduleStaleness } from "@/hooks/useScheduleStaleness";
import { ScheduleFallbackBanner } from "./ScheduleFallbackBanner";

export function NativeWeeklySchedule() {
  const { isStale, hoursStale, isEmpty } = useScheduleStaleness(24);
  
  // ... existing code ...

  return (
    <div className="space-y-4">
      {isStale && (
        <ScheduleFallbackBanner hoursStale={hoursStale} isEmpty={isEmpty} />
      )}
      
      {/* Rest of existing schedule UI */}
    </div>
  );
}
```

**File: `src/components/schedule/UpcomingClassesWidget.tsx`**

Add same staleness detection - if stale and no classes, show direct PunchPass link instead of hiding entirely.

---

### Part 7: Admin Manual Sync Button (Optional Enhancement)

**File: `src/pages/admin/ScheduleManager.tsx`**

Add a "Sync Now" button for admins to manually trigger schedule refresh:

```typescript
const handleManualSync = async () => {
  setSyncing(true);
  const { data: session } = await supabase.auth.getSession();
  
  const { error } = await supabase.functions.invoke('sync-punchpass-schedule', {
    headers: { Authorization: `Bearer ${session?.session?.access_token}` }
  });
  
  if (!error) {
    toast({ title: "Schedule synced successfully" });
    refetchSchedule();
  }
  setSyncing(false);
};
```

---

### Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│                     SCHEDULE SYNC SYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐         ┌──────────────────────┐            │
│   │   pg_cron    │────────>│  sync-punchpass-     │            │
│   │  (5 AM UTC)  │         │  schedule Edge Fn    │            │
│   └──────────────┘         └──────────┬───────────┘            │
│                                       │                         │
│   ┌──────────────┐                    │                         │
│   │ Admin Manual │────────────────────┤                         │
│   │   Trigger    │                    │                         │
│   └──────────────┘                    ▼                         │
│                            ┌──────────────────────┐            │
│                            │   Tavily Extract     │            │
│                            │   PunchPass Page     │            │
│                            └──────────┬───────────┘            │
│                                       │                         │
│                                       ▼                         │
│                            ┌──────────────────────┐            │
│                            │  punchpass_schedule  │            │
│                            │  (Supabase Table)    │            │
│                            └──────────┬───────────┘            │
│                                       │                         │
│                    ┌──────────────────┼─────────────────┐      │
│                    ▼                  ▼                 ▼      │
│          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│          │   Schedule  │    │  Upcoming   │    │    Home     │ │
│          │    Page     │    │  Classes    │    │   Widget    │ │
│          └──────┬──────┘    └──────┬──────┘    └──────┬──────┘ │
│                 │                  │                  │        │
│                 └──────────────────┴──────────────────┘        │
│                                    │                            │
│                                    ▼                            │
│                          ┌─────────────────┐                   │
│                          │ useSchedule     │                   │
│                          │ Staleness Hook  │                   │
│                          └────────┬────────┘                   │
│                                   │                            │
│                    ┌──────────────┴──────────────┐             │
│                    ▼                             ▼             │
│           ┌────────────────┐           ┌────────────────┐      │
│           │  Fresh Data    │           │  Stale Data    │      │
│           │  Show Schedule │           │  Show Fallback │      │
│           └────────────────┘           │  + PunchPass   │      │
│                                        │  Direct Link   │      │
│                                        └────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Implementation Order

1. **Database**: Run migration to enable `pg_cron` and `pg_net` extensions
2. **Edge Function**: Update to support service-role auth for cron triggers
3. **Cron Job**: Create scheduled task via SQL insert tool
4. **Hook**: Create `useScheduleStaleness` hook
5. **Component**: Create `ScheduleFallbackBanner` component
6. **Integration**: Add staleness detection to `NativeWeeklySchedule` and `UpcomingClassesWidget`
7. **Testing**: Verify cron job executes and UI responds to stale data

---

### Technical Notes

| Concern | Solution |
|---------|----------|
| Cron authentication | Use service role key stored in Supabase vault or passed via environment |
| Staleness threshold | Default 24 hours, configurable per component |
| Fallback UX | Amber warning banner with direct PunchPass link - never blocks users |
| Error handling | If sync fails, existing data remains; staleness banner appears naturally |
| Rate limiting | Single daily sync at 5 AM UTC avoids Tavily API overuse |

