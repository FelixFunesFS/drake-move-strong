import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'education' | 'trust' | 'conversion';
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const styles = {
    education: {
      bg: "bg-blue-600",
      text: "text-white",
      label: "Education"
    },
    trust: {
      bg: "bg-green-600",
      text: "text-white",
      label: "Trust"
    },
    conversion: {
      bg: "bg-amber-600",
      text: "text-white",
      label: "Conversion"
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
