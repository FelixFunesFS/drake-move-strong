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
            : `The schedule was last updated ${hoursStale} hours ago and may not reflect current availability.`}
        </p>
        <Button asChild variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-100 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950">
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
