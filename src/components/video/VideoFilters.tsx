import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface VideoFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string | null;
  onDifficultyChange: (difficulty: string | null) => void;
  className?: string;
}

const difficulties = [
  { value: 'all_levels', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function VideoFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  className
}: VideoFiltersProps) {
  const hasFilters = selectedCategory || searchQuery || selectedDifficulty;

  const clearFilters = () => {
    onCategoryChange(null);
    onSearchChange('');
    onDifficultyChange(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select 
          value={selectedDifficulty || "all"} 
          onValueChange={(v) => onDifficultyChange(v === "all" ? null : v)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {difficulties.map(d => (
              <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(null)}
          className="shrink-0"
        >
          All
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.slug ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(cat.slug)}
            className="shrink-0"
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
