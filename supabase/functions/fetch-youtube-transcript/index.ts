import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Fetch transcript using YouTube's timedtext API
async function fetchTranscript(videoId: string): Promise<string> {
  console.log('Fetching transcript for video:', videoId);
  
  // First, get the video page to extract caption track info
  const videoPageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });
  
  if (!videoPageResponse.ok) {
    throw new Error('Failed to fetch video page');
  }
  
  const pageHtml = await videoPageResponse.text();
  
  // Extract captions data from the page
  const captionsMatch = pageHtml.match(/"captions":\s*(\{[^}]+playerCaptionsTracklistRenderer[^}]+\})/);
  
  if (!captionsMatch) {
    // Try alternative method - look for timedtext in the page
    const timedTextMatch = pageHtml.match(/timedtext[^"]*lang=en[^"]*/);
    if (timedTextMatch) {
      console.log('Found timedtext URL');
    }
    
    // Check if video has auto-generated captions
    const autoGenMatch = pageHtml.match(/"captionTracks":\s*\[([^\]]+)\]/);
    if (autoGenMatch) {
      try {
        const captionsData = JSON.parse(`[${autoGenMatch[1]}]`);
        const englishCaption = captionsData.find((c: any) => 
          c.languageCode === 'en' || c.languageCode?.startsWith('en')
        ) || captionsData[0];
        
        if (englishCaption?.baseUrl) {
          console.log('Found caption URL:', englishCaption.baseUrl);
          const captionResponse = await fetch(englishCaption.baseUrl);
          const captionXml = await captionResponse.text();
          
          // Parse XML transcript
          const textMatches = captionXml.matchAll(/<text[^>]*>([^<]*)<\/text>/g);
          const transcriptParts: string[] = [];
          
          for (const match of textMatches) {
            let text = match[1];
            // Decode HTML entities
            text = text
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\n/g, ' ');
            transcriptParts.push(text);
          }
          
          return transcriptParts.join(' ').trim();
        }
      } catch (e) {
        console.error('Error parsing captions data:', e);
      }
    }
    
    throw new Error('No captions available for this video');
  }
  
  throw new Error('Could not extract transcript');
}

// Alternative: Use a third-party transcript service
async function fetchTranscriptViaService(videoId: string): Promise<string> {
  // Try youtubetranscript.com API (free, no auth required)
  const response = await fetch(`https://youtubetranscript.com/?server_vid2=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
  });
  
  if (!response.ok) {
    throw new Error('Transcript service unavailable');
  }
  
  const html = await response.text();
  
  // Extract transcript text from the response
  const textMatch = html.match(/<text[^>]*>([^<]*)<\/text>/g);
  if (textMatch) {
    return textMatch
      .map(t => t.replace(/<[^>]+>/g, ''))
      .join(' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .trim();
  }
  
  throw new Error('Could not parse transcript');
}

// Get video metadata
async function getVideoMetadata(videoId: string): Promise<{ title: string; description: string }> {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title || '',
        description: ''
      };
    }
  } catch (e) {
    console.error('Error fetching metadata:', e);
  }
  return { title: '', description: '' };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'YouTube URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing video ID:', videoId);

    // Get video metadata
    const metadata = await getVideoMetadata(videoId);
    console.log('Video title:', metadata.title);

    // Try to fetch transcript
    let transcript = '';
    let error = null;

    try {
      transcript = await fetchTranscript(videoId);
    } catch (e) {
      console.log('Primary method failed, trying alternative...');
      try {
        transcript = await fetchTranscriptViaService(videoId);
      } catch (e2) {
        error = 'Could not fetch transcript. The video may not have captions available.';
        console.error('All transcript methods failed:', e2);
      }
    }

    if (!transcript && error) {
      return new Response(
        JSON.stringify({ 
          error,
          videoId,
          title: metadata.title,
          suggestion: 'Try entering the key points of the video manually.'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        videoId,
        title: metadata.title,
        transcript: transcript.substring(0, 10000), // Limit transcript length
        characterCount: transcript.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-youtube-transcript:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to fetch transcript' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
