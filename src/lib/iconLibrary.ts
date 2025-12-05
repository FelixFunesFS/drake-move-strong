// SVG Path Library for Fitness Icons
// All icons are designed for a 24x24 viewBox

export interface IconDefinition {
  name: string;
  category: 'fitness' | 'ui' | 'social';
  path: string;
  viewBox?: string;
}

export const FITNESS_ICONS: Record<string, IconDefinition> = {
  kettlebell: {
    name: 'Kettlebell',
    category: 'fitness',
    path: 'M12 2C10.34 2 9 3.34 9 5C9 5.35 9.06 5.69 9.17 6H14.83C14.94 5.69 15 5.35 15 5C15 3.34 13.66 2 12 2ZM7 8C5.34 8 4 9.34 4 11V13C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13V11C20 9.34 18.66 8 17 8H7ZM12 18C9.24 18 7 15.76 7 13V11H17V13C17 15.76 14.76 18 12 18Z',
  },
  dumbbell: {
    name: 'Dumbbell',
    category: 'fitness',
    path: 'M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z',
  },
  barbell: {
    name: 'Barbell',
    category: 'fitness',
    path: 'M17 4V8H19V4H21V20H19V16H17V20H15V14H9V20H7V16H5V20H3V4H5V8H7V4H9V10H15V4H17Z',
  },
  heart: {
    name: 'Heart',
    category: 'fitness',
    path: 'M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z',
  },
  heartPulse: {
    name: 'Heart Pulse',
    category: 'fitness',
    path: 'M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35ZM16 11H13L11 14L9 10L7 13H4.5C4.18 12.23 4 11.39 4 10.5C4 7.46 6.46 5 9.5 5C11.06 5 12.5 5.67 13.5 6.74L12 8.5L13.5 6.74C14.5 5.67 15.94 5 17.5 5C20.54 5 23 7.46 23 10.5C23 11.39 22.82 12.23 22.5 13H20L18 10L16 13L14 10L12 14L10 11H8',
  },
  timer: {
    name: 'Timer',
    category: 'fitness',
    path: 'M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z',
  },
  trophy: {
    name: 'Trophy',
    category: 'fitness',
    path: 'M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.63 7.39 12.94C8.02 14.44 9.37 15.57 11 15.9V19H7V21H17V19H13V15.9C14.63 15.57 15.98 14.44 16.61 12.94C19.08 12.63 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM12 14C10.35 14 9 12.65 9 11V5H15V11C15 12.65 13.65 14 12 14ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z',
  },
  flame: {
    name: 'Flame',
    category: 'fitness',
    path: 'M13.5 0.67S14.74 3.78 14.74 6C14.74 8.09 13.22 9.33 12 9.33C10.78 9.33 9.26 8.09 9.26 6C9.26 3.78 10.5 0.67 10.5 0.67C7.56 3.56 5 7.28 5 11C5 14.94 8.56 18 12 18C15.44 18 19 14.94 19 11C19 7.28 16.44 3.56 13.5 0.67ZM11.71 15C10.32 15 9.2 13.88 9.2 12.5C9.2 11.21 10.12 10.09 11.46 9.96C13.03 11.44 14.15 13.32 14.42 15H11.71Z',
  },
  star: {
    name: 'Star',
    category: 'ui',
    path: 'M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z',
  },
  checkmark: {
    name: 'Checkmark',
    category: 'ui',
    path: 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z',
  },
  checkCircle: {
    name: 'Check Circle',
    category: 'ui',
    path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z',
  },
  arrowUp: {
    name: 'Arrow Up',
    category: 'ui',
    path: 'M4 12L5.41 13.41L11 7.83V20H13V7.83L18.58 13.42L20 12L12 4L4 12Z',
  },
  arrowRight: {
    name: 'Arrow Right',
    category: 'ui',
    path: 'M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z',
  },
  lightning: {
    name: 'Lightning',
    category: 'ui',
    path: 'M11 21H13L14 14H18L8 3V10H4L11 21Z',
  },
  target: {
    name: 'Target',
    category: 'fitness',
    path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z',
  },
  muscle: {
    name: 'Muscle',
    category: 'fitness',
    path: 'M5 5C5.55 5 6 5.45 6 6V10C6 10.55 5.55 11 5 11H4V13H5C5.55 13 6 13.45 6 14V18C6 18.55 5.55 19 5 19H3V5H5ZM19 5C18.45 5 18 5.45 18 6V10C18 10.55 18.45 11 19 11H20V13H19C18.45 13 18 13.45 18 14V18C18 18.55 18.45 19 19 19H21V5H19ZM15 7H9V9H11V15H9V17H15V15H13V9H15V7Z',
  },
};

// Draw icon on canvas
export function drawIcon(
  ctx: CanvasRenderingContext2D,
  iconKey: string,
  x: number,
  y: number,
  size: number,
  color: string,
  rotation: number = 0
) {
  const icon = FITNESS_ICONS[iconKey];
  if (!icon) return;

  ctx.save();
  
  // Move to position and apply rotation
  ctx.translate(x, y);
  if (rotation) {
    ctx.rotate((rotation * Math.PI) / 180);
  }
  
  // Scale the path
  const scale = size / 24; // Icons are designed for 24x24
  ctx.scale(scale, scale);
  
  // Draw the icon
  ctx.fillStyle = color;
  const path = new Path2D(icon.path);
  ctx.fill(path);
  
  ctx.restore();
}

// Get icons by category
export function getIconsByCategory(category?: 'fitness' | 'ui' | 'social'): IconDefinition[] {
  return Object.values(FITNESS_ICONS).filter(
    icon => !category || icon.category === category
  );
}

// Get all icon keys
export function getIconKeys(): string[] {
  return Object.keys(FITNESS_ICONS);
}