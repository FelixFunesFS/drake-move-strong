// Class type color coding for schedule
// Uses brand-aligned colors with left border accent style

export type ClassType = "flow" | "strong" | "default";

export function getClassType(className: string): ClassType {
  const lowerName = className.toLowerCase();
  if (lowerName.includes("flow")) return "flow";
  if (lowerName.includes("strong")) return "strong";
  return "default";
}

// Tailwind classes for left border accent
export function getClassTypeStyles(classType: ClassType): {
  border: string;
  bg: string;
  text: string;
} {
  switch (classType) {
    case "flow":
      return {
        border: "border-l-4 border-l-accent", // Gold for Flow
        bg: "bg-accent/10",
        text: "text-accent",
      };
    case "strong":
      return {
        border: "border-l-4 border-l-primary", // Teal for Strong
        bg: "bg-primary/10",
        text: "text-primary",
      };
    default:
      return {
        border: "border-l-4 border-l-muted-foreground",
        bg: "bg-muted",
        text: "text-muted-foreground",
      };
  }
}

// Get combined card styles for a class
export function getClassCardStyles(className: string): string {
  const classType = getClassType(className);
  const styles = getClassTypeStyles(classType);
  return styles.border;
}
