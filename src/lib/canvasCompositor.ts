// Canvas Compositor Utility for Image Ad Generation

export interface TextOverlay {
  text: string;
  position: 'top' | 'center' | 'bottom' | { x: number; y: number };
  fontSize: number;
  fontFamily: 'Oswald' | 'Inter';
  fontWeight: 'normal' | 'bold';
  color: string;
  shadow: boolean;
  textAlign: 'left' | 'center' | 'right';
  rotation?: number;
}

export interface TextBox extends TextOverlay {
  background?: {
    color: string;
    padding: number;
    borderRadius?: number;
    opacity?: number;
  };
  maxWidth?: number;
}

export interface ShapeElement {
  type: 'rectangle' | 'circle' | 'pill' | 'line' | 'corner-accent';
  position: { x: number; y: number };
  size: { width: number; height: number };
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rotation?: number;
  opacity?: number;
  cornerRadius?: number;
}

export interface ImageEffect {
  brightness: number;
  contrast: number;
  saturation: number;
  vignette?: { intensity: number; size: number };
  overlay: {
    color: string;
    opacity: number;
    gradient: 'none' | 'top' | 'bottom' | 'full' | 'radial';
  };
}

export interface LogoConfig {
  enabled: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size: number;
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
  textBoxes?: TextBox[];
  shapes?: ShapeElement[];
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
      vignette: { intensity: 30, size: 60 },
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
      vignette: { intensity: 20, size: 70 },
      overlay: { color: '#1A1A1A', opacity: 0.35, gradient: 'bottom' as const },
    },
    textColors: { headline: '#FFFFFF', subheadline: '#FFFFFF', cta: '#F2B544' },
  },
  'cinematic': {
    name: 'Cinematic',
    effects: {
      brightness: 95,
      contrast: 115,
      saturation: 85,
      vignette: { intensity: 45, size: 50 },
      overlay: { color: '#1A1A1A', opacity: 0.45, gradient: 'radial' as const },
    },
    textColors: { headline: '#FFFFFF', subheadline: '#F2B544', cta: '#FFFFFF' },
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
  textBoxes: [],
  shapes: [],
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

// Draw vignette effect
function drawVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  vignette: { intensity: number; size: number }
) {
  if (vignette.intensity === 0) return;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.max(width, height) * (vignette.size / 100);

  const gradient = ctx.createRadialGradient(
    centerX, centerY, radius * 0.3,
    centerX, centerY, radius
  );

  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.5, `rgba(0, 0, 0, ${vignette.intensity * 0.002})`);
  gradient.addColorStop(1, `rgba(0, 0, 0, ${vignette.intensity * 0.01})`);

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
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
  } else if (overlay.gradient === 'radial') {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(width, height) * 0.8;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.6, 'transparent');
    gradient.addColorStop(1, overlay.color);
    
    ctx.fillStyle = gradient;
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

// Draw shape elements
function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: ShapeElement,
  canvasWidth: number,
  canvasHeight: number
) {
  ctx.save();
  
  const x = (shape.position.x / 100) * canvasWidth;
  const y = (shape.position.y / 100) * canvasHeight;
  const width = (shape.size.width / 100) * canvasWidth;
  const height = (shape.size.height / 100) * canvasHeight;
  
  if (shape.opacity !== undefined) {
    ctx.globalAlpha = shape.opacity;
  }
  
  if (shape.rotation) {
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((shape.rotation * Math.PI) / 180);
    ctx.translate(-(x + width / 2), -(y + height / 2));
  }
  
  ctx.beginPath();
  
  switch (shape.type) {
    case 'rectangle':
      if (shape.cornerRadius) {
        drawRoundedRect(ctx, x, y, width, height, shape.cornerRadius);
      } else {
        ctx.rect(x, y, width, height);
      }
      break;
      
    case 'circle':
      const radius = Math.min(width, height) / 2;
      ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
      break;
      
    case 'pill':
      const pillRadius = height / 2;
      drawRoundedRect(ctx, x, y, width, height, pillRadius);
      break;
      
    case 'line':
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      break;
      
    case 'corner-accent':
      // L-shaped corner accent
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height);
      break;
  }
  
  if (shape.fill) {
    ctx.fillStyle = shape.fill;
    ctx.fill();
  }
  
  if (shape.stroke) {
    ctx.strokeStyle = shape.stroke;
    ctx.lineWidth = shape.strokeWidth || 2;
    ctx.stroke();
  }
  
  ctx.restore();
}

// Helper for rounded rectangles
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

// Draw text box with background
function drawTextBox(
  ctx: CanvasRenderingContext2D,
  textBox: TextBox,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!textBox.text) return;

  ctx.save();
  
  const fontWeight = textBox.fontWeight === 'bold' ? '700' : '400';
  ctx.font = `${fontWeight} ${textBox.fontSize}px ${textBox.fontFamily}, sans-serif`;
  ctx.textAlign = textBox.textAlign;
  ctx.textBaseline = 'middle';

  // Calculate position
  let x: number, y: number;
  const padding = canvasWidth * 0.08;
  
  if (typeof textBox.position === 'object') {
    x = (textBox.position.x / 100) * canvasWidth;
    y = (textBox.position.y / 100) * canvasHeight;
  } else {
    switch (textBox.textAlign) {
      case 'left': x = padding; break;
      case 'right': x = canvasWidth - padding; break;
      default: x = canvasWidth / 2;
    }
    switch (textBox.position) {
      case 'top': y = canvasHeight * 0.15; break;
      case 'bottom': y = canvasHeight * 0.85; break;
      default: y = canvasHeight / 2;
    }
  }

  // Measure text for background
  const maxWidth = textBox.maxWidth 
    ? (textBox.maxWidth / 100) * canvasWidth 
    : canvasWidth - (padding * 2);
  const lines = wrapText(ctx, textBox.text, maxWidth);
  const lineHeight = textBox.fontSize * 1.3;
  const totalHeight = lines.length * lineHeight;
  
  // Get max line width
  let maxLineWidth = 0;
  for (const line of lines) {
    const metrics = ctx.measureText(line);
    maxLineWidth = Math.max(maxLineWidth, metrics.width);
  }

  // Draw background if specified
  if (textBox.background) {
    const bgPadding = textBox.background.padding;
    const bgWidth = maxLineWidth + bgPadding * 2;
    const bgHeight = totalHeight + bgPadding * 2;
    
    let bgX = x - bgWidth / 2;
    if (textBox.textAlign === 'left') bgX = x - bgPadding;
    if (textBox.textAlign === 'right') bgX = x - bgWidth + bgPadding;
    
    const bgY = y - totalHeight / 2 - bgPadding;
    
    ctx.globalAlpha = textBox.background.opacity ?? 1;
    ctx.fillStyle = textBox.background.color;
    
    if (textBox.background.borderRadius) {
      ctx.beginPath();
      drawRoundedRect(ctx, bgX, bgY, bgWidth, bgHeight, textBox.background.borderRadius);
      ctx.fill();
    } else {
      ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
    }
    
    ctx.globalAlpha = 1;
  }

  // Draw text
  ctx.fillStyle = textBox.color;
  
  if (textBox.shadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  const startY = y - (totalHeight / 2) + (lineHeight / 2);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + (index * lineHeight));
  });

  ctx.restore();
}

// Word wrap helper
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  // Handle explicit line breaks
  const paragraphs = text.split('\n');
  const allLines: string[] = [];
  
  for (const paragraph of paragraphs) {
    const words = paragraph.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        allLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    allLines.push(currentLine);
  }
  
  return allLines;
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
  if (typeof text.position === 'object') {
    x = (text.position.x / 100) * canvasWidth;
    y = (text.position.y / 100) * canvasHeight + yOffset;
  } else {
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
  }

  // Apply rotation if specified
  if (text.rotation) {
    ctx.translate(x, y);
    ctx.rotate((text.rotation * Math.PI) / 180);
    ctx.translate(-x, -y);
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
  const lines = wrapText(ctx, text.text, maxWidth);

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

  // Draw vignette
  if (config.effects.vignette) {
    drawVignette(ctx, width, height, config.effects.vignette);
  }

  // Draw overlay
  drawOverlay(ctx, width, height, config.effects.overlay);

  // Draw shapes (decorative elements)
  if (config.shapes) {
    for (const shape of config.shapes) {
      drawShape(ctx, shape, width, height);
    }
  }

  // Draw text boxes with backgrounds
  if (config.textBoxes) {
    for (const textBox of config.textBoxes) {
      drawTextBox(ctx, textBox, width, height);
    }
  }

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