import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useVideoAccess } from "@/hooks/useVideoAccess";
import MemberLayout from "@/components/member/MemberLayout";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import VideoCard from "@/components/video/VideoCard";
import AccessBadge from "@/components/video/AccessBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, User, CheckCircle, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { toast } from "sonner";

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canAccessVideo } = useVideoAccess();
  const queryClient = useQueryClient();

  // Fetch video details
  const { data: video, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          category:video_categories(id, name, slug),
          coach:profiles(first_name, last_name)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Fetch user's progress for this video
  const { data: progress } = useQuery({
    queryKey: ['video-progress', user?.id, id],
    queryFn: async () => {
      if (!user?.id || !id) return null;
      
      const { data, error } = await supabase
        .from('video_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('video_id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!id
  });

  // Fetch related videos from same category
  const { data: relatedVideos = [] } = useQuery({
    queryKey: ['related-videos', video?.category_id, id],
    queryFn: async () => {
      if (!video?.category_id) return [];
      
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          category:video_categories(id, name, slug)
        `)
        .eq('category_id', video.category_id)
        .eq('is_active', true)
        .neq('id', id)
        .limit(4);
      
      if (error) throw error;
      return data;
    },
    enabled: !!video?.category_id
  });

  // Mark as complete mutation
  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !id) return;
      
      const { error } = await supabase
        .from('video_progress')
        .upsert({
          user_id: user.id,
          video_id: id,
          completed: true,
          last_watched_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,video_id'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Video marked as complete!');
      queryClient.invalidateQueries({ queryKey: ['video-progress'] });
    },
    onError: () => {
      toast.error('Failed to update progress');
    }
  });

  // Increment view count on first load
  useQuery({
    queryKey: ['video-view', id],
    queryFn: async () => {
      if (!id) return null;
      await supabase
        .from('videos')
        .update({ view_count: (video?.view_count || 0) + 1 })
        .eq('id', id);
      return true;
    },
    enabled: !!id && !!video,
    staleTime: Infinity // Only run once per session
  });

  const hasAccess = video ? canAccessVideo(video.access_level as 'public' | 'member' | 'vip') : false;

  // Get previous and next videos in category
  const currentIndex = relatedVideos.findIndex(v => v.id === id);
  const prevVideo = relatedVideos[currentIndex - 1];
  const nextVideo = relatedVideos[currentIndex + 1] || relatedVideos[0];

  if (isLoading) {
    return (
      <MemberLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </MemberLayout>
    );
  }

  if (!video) {
    return (
      <MemberLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Video not found</p>
          <Button asChild className="mt-4">
            <Link to="/member/videos">Back to Videos</Link>
          </Button>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Link 
          to="/member/videos" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Videos
        </Link>

        {/* Video Player */}
        {hasAccess ? (
          <YouTubeEmbed
            videoId={video.youtube_video_id}
            title={video.title}
            customThumbnail={video.thumbnail_url || undefined}
            className="rounded-xl overflow-hidden shadow-lg"
          />
        ) : (
          <div className="aspect-video rounded-xl bg-drake-dark flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {video.access_level === 'vip' ? 'VIP Content' : 'Members Only'}
              </h3>
              <p className="text-muted-foreground mb-4">
                Upgrade your membership to access this video
              </p>
              <Button asChild>
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Video Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {video.title}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                {video.coach && (
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Coach {video.coach.first_name} {video.coach.last_name}
                  </span>
                )}
                {video.duration_minutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {video.duration_minutes} minutes
                  </span>
                )}
                <AccessBadge level={video.access_level as 'public' | 'member' | 'vip'} />
              </div>
            </div>

            {hasAccess && !progress?.completed && (
              <Button 
                onClick={() => markCompleteMutation.mutate()}
                disabled={markCompleteMutation.isPending}
                variant="outline"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            )}

            {progress?.completed && (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>

          {video.description && (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {video.description}
            </p>
          )}

          {/* Navigation buttons */}
          {relatedVideos.length > 0 && hasAccess && (
            <div className="flex gap-3 pt-4">
              {prevVideo && (
                <Button variant="outline" onClick={() => navigate(`/member/videos/${prevVideo.id}`)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {nextVideo && nextVideo.id !== id && (
                <Button variant="outline" onClick={() => navigate(`/member/videos/${nextVideo.id}`)}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <section className="pt-8 border-t border-border">
            <h2 className="text-xl font-semibold mb-4">
              More from {video.category?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedVideos.map(relVideo => (
                <VideoCard
                  key={relVideo.id}
                  video={{
                    ...relVideo,
                    access_level: relVideo.access_level as 'public' | 'member' | 'vip',
                    category: relVideo.category
                  }}
                  canAccess={canAccessVideo(relVideo.access_level as 'public' | 'member' | 'vip')}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </MemberLayout>
  );
}
