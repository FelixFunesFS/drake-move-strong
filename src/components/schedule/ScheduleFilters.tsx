import { Button } from "@/components/ui/button";
import { Monitor, Home, Clock } from "lucide-react";

interface ScheduleFiltersProps {
  locationFilter: "all" | "studio" | "zoom";
  timeFilter: "all" | "morning" | "afternoon" | "evening";
  onLocationChange: (filter: "all" | "studio" | "zoom") => void;
  onTimeChange: (filter: "all" | "morning" | "afternoon" | "evening") => void;
}

export function ScheduleFilters({
  locationFilter,
  timeFilter,
  onLocationChange,
  onTimeChange,
}: ScheduleFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {/* Location Filter */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        <Button
          variant={locationFilter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => onLocationChange("all")}
          className="h-8 px-3 text-xs"
        >
          All
        </Button>
        <Button
          variant={locationFilter === "studio" ? "default" : "ghost"}
          size="sm"
          onClick={() => onLocationChange("studio")}
          className="h-8 px-3 text-xs gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">In-Studio</span>
        </Button>
        <Button
          variant={locationFilter === "zoom" ? "default" : "ghost"}
          size="sm"
          onClick={() => onLocationChange("zoom")}
          className="h-8 px-3 text-xs gap-1.5"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ZOOM</span>
        </Button>
      </div>

      {/* Time Filter */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        <Button
          variant={timeFilter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTimeChange("all")}
          className="h-8 px-3 text-xs"
        >
          All
        </Button>
        <Button
          variant={timeFilter === "morning" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTimeChange("morning")}
          className="h-8 px-3 text-xs gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AM</span>
        </Button>
        <Button
          variant={timeFilter === "afternoon" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTimeChange("afternoon")}
          className="h-8 px-3 text-xs gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Midday</span>
        </Button>
        <Button
          variant={timeFilter === "evening" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTimeChange("evening")}
          className="h-8 px-3 text-xs gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PM</span>
        </Button>
      </div>
    </div>
  );
}
