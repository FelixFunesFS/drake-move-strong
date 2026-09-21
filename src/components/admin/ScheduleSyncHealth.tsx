import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface SyncStatusRow {
  last_attempt_at: string | null;
  last_success_at: string | null;
  rows_written: number | null;
  last_error: string | null;
  source: string | null;
}

const STALE_HOURS = 12;

const sourceLabel = (source: string | null) => {
  if (!source) return null;
  if (source === 'html') return 'Main reader';
  if (source === 'jsonld-only') return 'Backup reader only';
  return 'Main + backup readers';
};

export default function ScheduleSyncHealth() {
  const [status, setStatus] = useState<SyncStatusRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('sync_status')
      .select('last_attempt_at, last_success_at, rows_written, last_error, source')
      .eq('name', 'punchpass-sync')
      .maybeSingle();

    if (error) console.error('Failed to load sync status:', error);
    setStatus((data as SyncStatusRow) ?? null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleRefresh = async () => {
    setIsSyncing(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const { error } = await supabase.functions.invoke('sync-punchpass-schedule', {
        headers: session?.session?.access_token
          ? { Authorization: `Bearer ${session.session.access_token}` }
          : undefined,
      });
      if (error) throw error;
      toast.success('Schedule refreshed from PunchPass');
    } catch (e) {
      console.error('Manual sync failed:', e);
      toast.error('Refresh failed — see the status below');
    } finally {
      setIsSyncing(false);
      await load();
    }
  };

  const lastSuccess = status?.last_success_at ? new Date(status.last_success_at) : null;
  const hoursSince = lastSuccess ? (Date.now() - lastSuccess.getTime()) / 3600000 : Infinity;
  const healthy = !!lastSuccess && hoursSince < STALE_HOURS && !status?.last_error;

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="font-hero text-xl uppercase flex items-center gap-2">
            {healthy ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            )}
            Schedule sync
          </CardTitle>
          <CardDescription>Automatic class times from PunchPass</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isSyncing}>
          {isSyncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh now
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {isLoading ? (
          <p className="text-muted-foreground">Checking…</p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Last updated</p>
                <p className="font-medium">
                  {lastSuccess ? `${formatDistanceToNow(lastSuccess)} ago` : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Classes saved</p>
                <p className="font-medium">{status?.rows_written ?? 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">Read using</p>
                <p className="font-medium">{sourceLabel(status?.source ?? null) ?? '—'}</p>
              </div>
            </div>

            {healthy ? (
              <Badge variant="secondary">Everything is up to date</Badge>
            ) : (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3">
                <p className="font-medium text-destructive">Needs attention</p>
                <p className="text-muted-foreground mt-1">
                  {status?.last_error ||
                    (lastSuccess
                      ? `No successful refresh in over ${STALE_HOURS} hours.`
                      : 'The schedule has never refreshed successfully.')}
                </p>
                <p className="text-muted-foreground mt-1">
                  Visitors see a notice linking to the live PunchPass schedule while this is unresolved.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
