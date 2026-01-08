import { Button } from "@/components/ui/button";
import { Monitor, Home, Clock, Sun, Sunset } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();

  // Mobile: Horizontal scrollable compact pills
  if (isMobile) {
    return (
      <div className="space-y-2">
        {/* Location Filter */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
          <FilterPill
            active={locationFilter === "all"}
            onClick={() => onLocationChange("all")}
          >
            All
          </FilterPill>
          <FilterPill
            active={locationFilter === "studio"}
            onClick={() => onLocationChange("studio")}
            icon={<Home className="w-3.5 h-3.5" />}
          >
            In-Studio
          </FilterPill>
          <FilterPill
            active={locationFilter === "zoom"}
            onClick={() => onLocationChange("zoom")}
            icon={<Monitor className="w-3.5 h-3.5" />}
          >
            ZOOM
          </FilterPill>
        </div>

        {/* Time Filter */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
          <FilterPill
            active={timeFilter === "all"}
            onClick={() => onTimeChange("all")}
          >
            All Times
          </FilterPill>
          <FilterPill
            active={timeFilter === "morning"}
            onClick={() => onTimeChange("morning")}
            icon={<Sun className="w-3.5 h-3.5" />}
          >
            AM
          </FilterPill>
          <FilterPill
            active={timeFilter === "afternoon"}
            onClick={() => onTimeChange("afternoon")}
            icon={<Clock className="w-3.5 h-3.5" />}
          >
            Midday
          </FilterPill>
          <FilterPill
            active={timeFilter === "evening"}
            onClick={() => onTimeChange("evening")}
            icon={<Sunset className="w-3.5 h-3.5" />}
          >
            PM
          </FilterPill>
        </div>
      </div>
    );
  }

  // Desktop: Button groups
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
          <Sun className="w-3.5 h-3.5" />
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
          <Sunset className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PM</span>
        </Button>
      </div>
    </div>
  );
}

// Reusable filter pill for mobile
function FilterPill({ 
  active, 
  onClick, 
  icon, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
