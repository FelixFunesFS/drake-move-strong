// Shared Image Utilities for Social Media Generator

export interface ImageValidationResult {
  valid: boolean;
  width: number;
  height: number;
  size: number;
  error?: string;
}

export interface ConversionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
}

const DEFAULT_MAX_DIMENSION = 2048;
const DEFAULT_QUALITY = 0.85;
const MAX_BASE64_SIZE = 4 * 1024 * 1024; // 4MB limit for API payload

/**
 * Load an image from URL and return image element with dimensions
 */
export async function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout - please try again'));
    }, 30000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to load image - check if the image URL is accessible'));
    };
    
    img.src = src;
  });
}

/**
 * Validate image dimensions and estimate size
 */
export async function validateImage(imageUrl: string): Promise<ImageValidationResult> {
  try {
    const img = await loadImageElement(imageUrl);
    
    // Estimate compressed size (rough calculation)
    const estimatedSize = (img.width * img.height * 3) / 10; // ~10:1 compression ratio
    
    if (img.width > 4096 || img.height > 4096) {
      return {
        valid: false,
        width: img.width,
        height: img.height,
        size: estimatedSize,
        error: 'Image dimensions too large (max 4096x4096). Will be automatically compressed.'
      };
    }
    
    return {
      valid: true,
      width: img.width,
      height: img.height,
      size: estimatedSize
    };
  } catch (error) {
    return {
      valid: false,
      width: 0,
      height: 0,
      size: 0,
      error: error instanceof Error ? error.message : 'Failed to validate image'
    };
  }
}

/**
 * Convert image URL to base64, with optional compression
 */
export async function convertToBase64(
  imageUrl: string,
  options: ConversionOptions = {}
): Promise<string> {
  const {
    maxWidth = DEFAULT_MAX_DIMENSION,
    maxHeight = DEFAULT_MAX_DIMENSION,
    quality = DEFAULT_QUALITY,
    format = 'image/jpeg'
  } = options;

  // If already base64, check if it needs compression
  if (imageUrl.startsWith('data:image')) {
    const base64Size = imageUrl.length * 0.75; // Approximate byte size
    if (base64Size < MAX_BASE64_SIZE) {
      return imageUrl;
    }
    // Need to compress existing base64
  }

  try {
    const img = await loadImageElement(imageUrl);
    
    // Calculate new dimensions while maintaining aspect ratio
    let newWidth = img.width;
    let newHeight = img.height;
    
    if (img.width > maxWidth || img.height > maxHeight) {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      newWidth = Math.round(img.width * ratio);
      newHeight = Math.round(img.height * ratio);
    }

    // Create canvas and draw resized image
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not create canvas context');
    }

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Convert to base64 with specified format and quality
    let base64 = canvas.toDataURL(format, quality);
    
    // If still too large, reduce quality further
    let currentQuality = quality;
    while (base64.length * 0.75 > MAX_BASE64_SIZE && currentQuality > 0.3) {
      currentQuality -= 0.1;
      base64 = canvas.toDataURL(format, currentQuality);
    }

    // Validate the result
    if (!base64.startsWith('data:image')) {
      throw new Error('Failed to generate valid base64 image');
    }

    return base64;
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `Image conversion failed: ${error.message}` 
        : 'Failed to convert image to base64'
    );
  }
}

/**
 * Compress an image to reduce file size
 */
export async function compressImage(
  imageUrl: string,
  targetSizeKB: number = 500
): Promise<string> {
  const img = await loadImageElement(imageUrl);
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');
  
  ctx.drawImage(img, 0, 0);
  
  // Binary search for optimal quality
  let minQuality = 0.1;
  let maxQuality = 1.0;
  let result = canvas.toDataURL('image/jpeg', maxQuality);
  
  const targetBytes = targetSizeKB * 1024;
  const iterations = 5;
  
  for (let i = 0; i < iterations; i++) {
    const midQuality = (minQuality + maxQuality) / 2;
    result = canvas.toDataURL('image/jpeg', midQuality);
    const currentSize = result.length * 0.75;
    
    if (currentSize > targetBytes) {
      maxQuality = midQuality;
    } else {
      minQuality = midQuality;
    }
  }
  
  return result;
}

/**
 * Get human-readable error message for API errors
 */
export function getImageErrorMessage(error: unknown, statusCode?: number): string {
  if (statusCode === 429) {
    return 'Rate limit exceeded. Please wait a moment before trying again.';
  }
  
  if (statusCode === 402) {
    return 'AI credits exhausted. Please add more credits to continue.';
  }
  
  if (statusCode === 413 || (error instanceof Error && error.message.includes('payload'))) {
    return 'Image too large. Try selecting a smaller image or wait for compression.';
  }
  
  if (error instanceof Error) {
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Check if image URL is valid and accessible
 */
export async function isImageAccessible(url: string): Promise<boolean> {
  try {
    if (url.startsWith('data:image')) return true;
    
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType?.startsWith('image/') === true;
  } catch {
    return false;
  }
}

/**
 * Extract dimensions from base64 image
 */
export async function getBase64Dimensions(base64: string): Promise<{ width: number; height: number }> {
  const img = await loadImageElement(base64);
  return { width: img.width, height: img.height };
}
