// Canvas Compositor Utility for Image Ad Generation

export interface TextOverlay {
  text: string;
  position: 'top' | 'center' | 'bottom';
  fontSize: number;
  fontFamily: 'Oswald' | 'Inter';
  fontWeight: 'normal' | 'bold';
  color: string;
  shadow: boolean;
  textAlign: 'left' | 'center' | 'right';
}

export interface ImageEffect {
  brightness: number;  // 0-200, default 100
  contrast: number;    // 0-200, default 100
  saturation: number;  // 0-200, default 100
  overlay: {
    color: string;
    opacity: number;
    gradient: 'none' | 'top' | 'bottom' | 'full';
  };
}

export interface LogoConfig {
  enabled: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size: number; // percentage of width
}

export interface OutputSize {
  name: string;
  width: number;
  height: number;
}

export interface AdConfig {
  baseImage: string;
  headline?: TextOverlay;
  subheadline?: TextOverlay;
  cta?: TextOverlay;
  effects: ImageEffect;
  logo: LogoConfig;
  outputSize: OutputSize;
}

export const OUTPUT_SIZES: OutputSize[] = [
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook/LinkedIn', width: 1200, height: 630 },
  { name: 'Twitter/X', width: 1200, height: 675 },
];

export const EFFECT_PRESETS = {
  'dark-bold': {
    name: 'Dark & Bold',
    effects: {
      brightness: 90,
      contrast: 110,
      saturation: 90,
      overlay: { color: '#1A1A1A', opacity: 0.5, gradient: 'bottom' as const },
    },
    textColors: { headline: '#FFFFFF', subheadline: '#F2B544', cta: '#F2B544' },
  },
  'light-airy': {
    name: 'Light & Airy',
    effects: {
      brightness: 110,
      contrast: 95,
      saturation: 95,
      overlay: { color: '#FFFFFF', opacity: 0.3, gradient: 'full' as const },
    },
    textColors: { headline: '#1A1A1A', subheadline: '#0B4A52', cta: '#0B4A52' },
  },
  'energetic': {
    name: 'Energetic',
    effects: {
      brightness: 105,
      contrast: 120,
      saturation: 120,
      overlay: { color: '#0B4A52', opacity: 0.2, gradient: 'none' as const },
    },
    textColors: { headline: '#FFFFFF', subheadline: '#F2B544', cta: '#F2B544' },
  },
  'professional': {
    name: 'Professional',
    effects: {
      brightness: 100,
      contrast: 105,
      saturation: 100,
      overlay: { color: '#1A1A1A', opacity: 0.35, gradient: 'bottom' as const },
    },
    textColors: { headline: '#FFFFFF', subheadline: '#FFFFFF', cta: '#F2B544' },
  },
};

export const DEFAULT_AD_CONFIG: AdConfig = {
  baseImage: '',
  headline: {
    text: '',
    position: 'center',
    fontSize: 72,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
    color: '#FFFFFF',
    shadow: true,
    textAlign: 'center',
  },
  subheadline: {
    text: '',
    position: 'center',
    fontSize: 36,
    fontFamily: 'Inter',
    fontWeight: 'normal',
    color: '#F2B544',
    shadow: true,
    textAlign: 'center',
  },
  cta: {
    text: '',
    position: 'bottom',
    fontSize: 28,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#F2B544',
    shadow: true,
    textAlign: 'center',
  },
  effects: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    overlay: {
      color: '#1A1A1A',
      opacity: 0.4,
      gradient: 'bottom',
    },
  },
  logo: {
    enabled: true,
    position: 'bottom-right',
    size: 10,
  },
  outputSize: OUTPUT_SIZES[0],
};

// Load image from URL or import path with timeout and error handling
export function loadImage(src: string, timeoutMs: number = 30000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout - the image took too long to load'));
    }, timeoutMs);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = (event) => {
      clearTimeout(timeout);
      // Try to provide more helpful error info
      const errorMsg = src.startsWith('data:') 
        ? 'Failed to load base64 image - data may be corrupted'
        : src.startsWith('http') 
          ? 'Failed to load image from URL - check CORS settings or image accessibility'
          : 'Failed to load image - check the file path';
      reject(new Error(errorMsg));
    };
    
    img.src = src;
  });
}

// Apply CSS filters to canvas context
function applyFilters(ctx: CanvasRenderingContext2D, effects: ImageEffect) {
  const filters: string[] = [];
  
  if (effects.brightness !== 100) {
    filters.push(`brightness(${effects.brightness}%)`);
  }
  if (effects.contrast !== 100) {
    filters.push(`contrast(${effects.contrast}%)`);
  }
  if (effects.saturation !== 100) {
    filters.push(`saturate(${effects.saturation}%)`);
  }
  
  ctx.filter = filters.length > 0 ? filters.join(' ') : 'none';
}

// Draw gradient overlay
function drawOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  overlay: ImageEffect['overlay']
) {
  if (overlay.opacity === 0) return;

  ctx.save();
  
  if (overlay.gradient === 'none' || overlay.gradient === 'full') {
    ctx.fillStyle = overlay.color;
    ctx.globalAlpha = overlay.opacity;
    ctx.fillRect(0, 0, width, height);
  } else {
    let gradient: CanvasGradient;
    
    if (overlay.gradient === 'top') {
      gradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
      gradient.addColorStop(0, overlay.color);
      gradient.addColorStop(1, 'transparent');
    } else {
      gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, overlay.color);
    }
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = overlay.opacity;
    ctx.fillRect(0, 0, width, height);
  }
  
  ctx.restore();
}

// Draw text with optional shadow
function drawText(
  ctx: CanvasRenderingContext2D,
  text: TextOverlay,
  canvasWidth: number,
  canvasHeight: number,
  yOffset: number = 0
) {
  if (!text.text) return;

  ctx.save();
  
  const fontWeight = text.fontWeight === 'bold' ? '700' : '400';
  ctx.font = `${fontWeight} ${text.fontSize}px ${text.fontFamily}, sans-serif`;
  ctx.fillStyle = text.color;
  ctx.textAlign = text.textAlign;
  ctx.textBaseline = 'middle';

  // Calculate position
  let x: number;
  const padding = canvasWidth * 0.08;
  
  switch (text.textAlign) {
    case 'left':
      x = padding;
      break;
    case 'right':
      x = canvasWidth - padding;
      break;
    default:
      x = canvasWidth / 2;
  }

  let y: number;
  switch (text.position) {
    case 'top':
      y = canvasHeight * 0.15 + yOffset;
      break;
    case 'bottom':
      y = canvasHeight * 0.85 + yOffset;
      break;
    default:
      y = canvasHeight / 2 + yOffset;
  }

  // Draw shadow
  if (text.shadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  // Word wrap for long text
  const maxWidth = canvasWidth - (padding * 2);
  const words = text.text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  // Draw each line
  const lineHeight = text.fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = y - (totalHeight / 2) + (lineHeight / 2);

  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + (index * lineHeight));
  });

  ctx.restore();
}

// Draw logo
async function drawLogo(
  ctx: CanvasRenderingContext2D,
  logoSrc: string,
  config: LogoConfig,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!config.enabled) return;

  try {
    const logo = await loadImage(logoSrc);
    const logoWidth = canvasWidth * (config.size / 100);
    const aspectRatio = logo.height / logo.width;
    const logoHeight = logoWidth * aspectRatio;
    
    const padding = canvasWidth * 0.03;
    let x: number, y: number;

    switch (config.position) {
      case 'top-left':
        x = padding;
        y = padding;
        break;
      case 'top-right':
        x = canvasWidth - logoWidth - padding;
        y = padding;
        break;
      case 'bottom-left':
        x = padding;
        y = canvasHeight - logoHeight - padding;
        break;
      default:
        x = canvasWidth - logoWidth - padding;
        y = canvasHeight - logoHeight - padding;
    }

    ctx.drawImage(logo, x, y, logoWidth, logoHeight);
  } catch (error) {
    console.warn('Failed to load logo:', error);
  }
}

// Main composition function
export async function composeAd(
  canvas: HTMLCanvasElement,
  config: AdConfig,
  logoSrc?: string
): Promise<string> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const { width, height } = config.outputSize;
  canvas.width = width;
  canvas.height = height;

  // Load and draw base image
  const img = await loadImage(config.baseImage);
  
  // Calculate cover dimensions
  const imgRatio = img.width / img.height;
  const canvasRatio = width / height;
  
  let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
  
  if (imgRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imgRatio;
    offsetX = (width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = width;
    drawHeight = width / imgRatio;
    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  // Apply filters and draw image
  applyFilters(ctx, config.effects);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  ctx.filter = 'none';

  // Draw overlay
  drawOverlay(ctx, width, height, config.effects.overlay);

  // Draw text layers
  if (config.headline?.text) {
    const yOffset = config.subheadline?.text ? -config.headline.fontSize * 0.6 : 0;
    drawText(ctx, config.headline, width, height, yOffset);
  }
  
  if (config.subheadline?.text) {
    const yOffset = config.headline?.text ? config.subheadline.fontSize * 1.2 : 0;
    drawText(ctx, config.subheadline, width, height, yOffset);
  }
  
  if (config.cta?.text) {
    drawText(ctx, config.cta, width, height, 0);
  }

  // Draw logo
  if (logoSrc && config.logo.enabled) {
    await drawLogo(ctx, logoSrc, config.logo, width, height);
  }

  return canvas.toDataURL('image/png', 1.0);
}

// Export canvas as downloadable file
export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
