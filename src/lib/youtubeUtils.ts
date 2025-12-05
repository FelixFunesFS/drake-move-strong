/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://youtu.be/VIDEO_ID
 * - https://youtu.be/VIDEO_ID?si=SHARE_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&other=params
 * - https://www.youtube.com/embed/VIDEO_ID
 * - VIDEO_ID (already just the ID)
 */
export function extractYouTubeId(input: string): string {
  if (!input) return '';
  
  const trimmed = input.trim();
  
  // If it's already just an ID (11 characters, alphanumeric with - and _)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  try {
    const url = new URL(trimmed);
    
    // youtu.be format
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1).split('/')[0];
    }
    
    // youtube.com/watch?v= format
    if (url.hostname.includes('youtube.com')) {
      const videoId = url.searchParams.get('v');
      if (videoId) return videoId;
      
      // youtube.com/embed/VIDEO_ID format
      const pathParts = url.pathname.split('/');
      const embedIndex = pathParts.indexOf('embed');
      if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
        return pathParts[embedIndex + 1];
      }
    }
  } catch {
    // Not a valid URL, return as-is (might be partial input)
  }
  
  return trimmed;
}
