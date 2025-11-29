import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'strength' | 'movement' | 'purpose';
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const styles = {
    strength: {
      bg: "bg-primary/10",
      text: "text-primary",
      label: "Strength"
    },
    movement: {
      bg: "bg-drake-gold/20",
      text: "text-drake-dark",
      label: "Movement"
    },
    purpose: {
      bg: "bg-muted",
      text: "text-foreground",
      label: "Purpose"
    }
  };

  const style = styles[category];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        style.bg,
        style.text,
        className
      )}
    >
      {style.label}
    </span>
  );
};

export default CategoryBadge;
