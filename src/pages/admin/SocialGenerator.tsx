import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Loader2, Instagram, Facebook, Linkedin, Twitter, Sparkles, Youtube, X, FileText, Eye, Code, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { insightPosts, authorInfo } from "@/data/insights";
import { PlatformPreview } from "@/components/admin/PlatformPreview";
import { ImageAdGenerator } from "@/components/admin/ImageAdGenerator";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-500" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { id: "twitter", label: "Twitter/X", icon: Twitter, color: "text-foreground" },
];

const TONES = [
  { id: "educational", label: "Educational", description: "Tips, how-tos, and valuable insights" },
  { id: "motivational", label: "Motivational", description: "Inspiring and encouraging content" },
  { id: "community", label: "Community", description: "Behind-the-scenes and member stories" },
  { id: "promotional", label: "Promotional", description: "Classes, events, and special offers" },
];

const CATEGORY_LABELS: Record<string, string> = {
  strength: "Strength",
  movement: "Movement",
  purpose: "Purpose"
};

interface GeneratedPosts {
  posts: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string | string[];
    raw?: string;
  };
}

interface YouTubeData {
  videoId: string;
  title: string;
  transcript: string;
  characterCount: number;
}

// Strip HTML tags and convert to plain text
function stripHtml(html: string): string {
  return html
    .replace(/<h3>/g, '\n\n## ')
    .replace(/<\/h3>/g, '\n')
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '')
    .replace(/<ul>/g, '\n')
    .replace(/<\/ul>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const SocialGenerator = () => {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [selectedTone, setSelectedTone] = useState("educational");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPosts | null>(null);
  
  // YouTube state
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isFetchingTranscript, setIsFetchingTranscript] = useState(false);
  const [youtubeData, setYoutubeData] = useState<YouTubeData | null>(null);
  
  // Blog post state
  const [selectedPostId, setSelectedPostId] = useState<string>("");

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
    
    if (postId === "none") {
      return;
    }
    
    const post = insightPosts.find(p => p.id === postId);
    if (!post) return;
    
    const author = authorInfo[post.author];
    const plainContent = stripHtml(post.content);
    
    const postContent = `Title: ${post.title}

Category: ${CATEGORY_LABELS[post.category]}
Author: ${author.name}, ${author.title}

Excerpt: ${post.excerpt}

Full Content:
${plainContent}

Tags: ${post.tags.join(', ')}`;
    
    setContent(prev => prev ? `${prev}\n\n---\n\n${postContent}` : postContent);
    
    // If the post has a video, set the YouTube URL
    if (post.videoId) {
      setYoutubeUrl(`https://youtube.com/watch?v=${post.videoId}`);
      toast.info(`This post has an associated video. Click "Fetch" to add the transcript.`);
    }
    
    toast.success(`Loaded: ${post.title}`);
  };

  const handleFetchTranscript = async () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setIsFetchingTranscript(true);
    setYoutubeData(null);

    try {
      const { data, error } = await supabase.functions.invoke("fetch-youtube-transcript", {
        body: { url: youtubeUrl.trim() },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to fetch transcript");
      }

      if (data?.error) {
        toast.error(data.error);
        if (data.suggestion) {
          toast.info(data.suggestion);
        }
        return;
      }

      setYoutubeData(data);
      
      // Auto-populate content with transcript
      const transcriptContent = data.title 
        ? `Video: ${data.title}\n\n${data.transcript}`
        : data.transcript;
      
      setContent(prev => prev ? `${prev}\n\n---\n\n${transcriptContent}` : transcriptContent);
      toast.success(`Transcript loaded: ${data.characterCount.toLocaleString()} characters`);
    } catch (error) {
      console.error("Transcript fetch error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch transcript");
    } finally {
      setIsFetchingTranscript(false);
    }
  };

  const clearYoutubeData = () => {
    setYoutubeUrl("");
    setYoutubeData(null);
  };

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content to transform");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setIsGenerating(true);
    setGeneratedPosts(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-social-content", {
        body: {
          content: content.trim(),
          platforms: selectedPlatforms,
          tone: selectedTone,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to generate content");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setGeneratedPosts(data);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${platform} post copied to clipboard!`);
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = PLATFORMS.find(p => p.id === platformId);
    if (!platform) return null;
    const Icon = platform.icon;
    return <Icon className={`h-5 w-5 ${platform.color}`} />;
  };

  return (
    <>
      <SEO
        title="Social Media Generator | Drake Fitness Admin"
        description="Generate platform-optimized social media content for Drake Fitness"
      />
      
      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-8 w-8 text-drake-gold" />
                <h1 className="font-hero text-3xl md:text-4xl font-bold uppercase">
                  Social Media Generator
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Transform your content into platform-optimized social media posts with Drake Fitness brand voice.
              </p>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="content" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Content Generator
                </TabsTrigger>
                <TabsTrigger value="images" className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image Ads
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    {/* Blog Post Selector */}
                    <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle>Blog Post</CardTitle>
                    </div>
                    <CardDescription>
                      Select an existing Insights post to auto-populate content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedPostId} onValueChange={handlePostSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blog post..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">-- Select a post --</SelectItem>
                        {insightPosts.map((post) => (
                          <SelectItem key={post.id} value={post.id}>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                post.category === 'strength' ? 'bg-red-100 text-red-700' :
                                post.category === 'movement' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {CATEGORY_LABELS[post.category]}
                              </span>
                              <span className="truncate">{post.title}</span>
                              {post.videoId && <Youtube className="h-3 w-3 text-red-500 shrink-0" />}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedPostId && selectedPostId !== "none" && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {insightPosts.find(p => p.id === selectedPostId)?.excerpt}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* YouTube Input */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      <CardTitle>YouTube Video</CardTitle>
                    </div>
                    <CardDescription>
                      Paste a YouTube URL to automatically extract the transcript.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleFetchTranscript}
                        disabled={isFetchingTranscript || !youtubeUrl.trim()}
                      >
                        {isFetchingTranscript ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Fetch"
                        )}
                      </Button>
                    </div>
                    
                    {youtubeData && (
                      <div className="bg-muted rounded-lg p-3 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{youtubeData.title || "Video loaded"}</p>
                          <p className="text-xs text-muted-foreground">
                            {youtubeData.characterCount.toLocaleString()} characters extracted
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0"
                          onClick={clearYoutubeData}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Content Input */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content Input</CardTitle>
                    <CardDescription>
                      Your content appears here. Edit or add more context as needed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter your content here... Select a blog post above, fetch a YouTube transcript, or type/paste your own content."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] resize-y"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-muted-foreground">
                        {content.length} characters
                      </p>
                      {content && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setContent("");
                            setSelectedPostId("");
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Platforms</CardTitle>
                    <CardDescription>
                      Select the platforms you want to generate content for.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <div
                            key={platform.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedPlatforms.includes(platform.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handlePlatformToggle(platform.id)}
                          >
                            <Checkbox
                              id={platform.id}
                              checked={selectedPlatforms.includes(platform.id)}
                              onCheckedChange={() => handlePlatformToggle(platform.id)}
                            />
                            <Icon className={`h-5 w-5 ${platform.color}`} />
                            <Label htmlFor={platform.id} className="cursor-pointer font-medium">
                              {platform.label}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Tone Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tone</CardTitle>
                    <CardDescription>
                      Choose the tone for your content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TONES.map((tone) => (
                        <div
                          key={tone.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedTone === tone.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedTone(tone.id)}
                        >
                          <p className="font-semibold">{tone.label}</p>
                          <p className="text-sm text-muted-foreground">{tone.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isGenerating || !content.trim() || selectedPlatforms.length === 0}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                <h2 className="font-semibold text-xl">Generated Content</h2>
                
                {!generatedPosts && !isGenerating && (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        Your generated content will appear here.
                      </p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Select a blog post, fetch a video, or enter content manually.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {isGenerating && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                      <p className="text-muted-foreground">
                        Generating platform-optimized content...
                      </p>
                    </CardContent>
                  </Card>
                )}

                {generatedPosts?.posts && !isGenerating && (
                  <div className="space-y-4">
                    {Object.entries(generatedPosts.posts).map(([platform, postContent]) => {
                      if (!postContent || platform === "raw") return null;
                      
                      const displayContent = Array.isArray(postContent)
                        ? postContent.join("\n\n---\n\n")
                        : postContent;
                      
                      return (
                        <Card key={platform}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getPlatformIcon(platform)}
                                <CardTitle className="text-lg capitalize">
                                  {platform === "twitter" ? "Twitter/X" : platform}
                                </CardTitle>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(displayContent, platform)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="preview" className="w-full">
                              <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="preview" className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  Preview
                                </TabsTrigger>
                                <TabsTrigger value="text" className="flex items-center gap-2">
                                  <Code className="h-4 w-4" />
                                  Text
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="preview" className="mt-0">
                                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                                  <PlatformPreview platform={platform} content={displayContent} />
                                </div>
                              </TabsContent>
                              <TabsContent value="text" className="mt-0">
                                <div className="bg-muted rounded-lg p-4">
                                  <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                                    {displayContent}
                                  </pre>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {displayContent.length} characters
                                </p>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      );
                    })}
                    
                    {generatedPosts.posts.raw && (
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Raw Output</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generatedPosts.posts.raw!, "content")}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted rounded-lg p-4">
                            <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                              {generatedPosts.posts.raw}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
              </TabsContent>

              <TabsContent value="images">
                <ImageAdGenerator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialGenerator;
