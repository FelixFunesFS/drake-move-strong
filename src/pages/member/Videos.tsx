import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useVideoAccess } from "@/hooks/useVideoAccess";
import MemberLayout from "@/components/member/MemberLayout";
import VideoCard from "@/components/video/VideoCard";
import VideoFilters from "@/components/video/VideoFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, Star, Clock } from "lucide-react";

export default function MemberVideos() {
  const { user } = useAuth();
  const { canAccessVideo } = useVideoAccess();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['video-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch videos
  const { data: videos = [], isLoading: videosLoading } = useQuery({
    queryKey: ['videos', selectedCategory, selectedDifficulty, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('videos')
        .select(`
          *,
          category:video_categories(id, name, slug)
        `)
        .eq('is_active', true)
        .order('sort_order')
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        const cat = categories.find(c => c.slug === selectedCategory);
        if (cat) query = query.eq('category_id', cat.id);
      }

      if (selectedDifficulty) {
        query = query.eq('difficulty_level', selectedDifficulty as 'beginner' | 'intermediate' | 'advanced' | 'all_levels');
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: categories.length > 0 || !selectedCategory
  });

  // Fetch user's video progress
  const { data: progressMap = {} } = useQuery({
    queryKey: ['video-progress', user?.id],
    queryFn: async () => {
      if (!user?.id) return {};
      
      const { data, error } = await supabase
        .from('video_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      return data.reduce((acc, p) => {
        acc[p.video_id] = p;
        return acc;
      }, {} as Record<string, typeof data[0]>);
    },
    enabled: !!user?.id
  });

  // Featured videos
  const featuredVideos = videos.filter(v => v.is_featured);

  // Continue watching (videos with progress but not completed)
  const continueWatching = videos.filter(v => {
    const progress = progressMap[v.id];
    return progress && !progress.completed && progress.watched_seconds > 0;
  });

  return (
    <MemberLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <PlayCircle className="h-8 w-8 text-primary" />
            Video Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Watch tutorials, workouts, and exclusive content
          </p>
        </div>

        {/* Filters */}
        <VideoFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
        />

        {/* Featured Videos */}
        {!selectedCategory && !searchQuery && featuredVideos.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-drake-gold" />
              Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.slice(0, 3).map(video => (
                <VideoCard
                  key={video.id}
                  video={{
                    ...video,
                    access_level: video.access_level as 'public' | 'member' | 'vip',
                    category: video.category
                  }}
                  progress={progressMap[video.id]}
                  canAccess={canAccessVideo(video.access_level as 'public' | 'member' | 'vip')}
                />
              ))}
            </div>
          </section>
        )}

        {/* Continue Watching */}
        {!selectedCategory && !searchQuery && continueWatching.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Continue Watching
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueWatching.slice(0, 3).map(video => (
                <VideoCard
                  key={video.id}
                  video={{
                    ...video,
                    access_level: video.access_level as 'public' | 'member' | 'vip',
                    category: video.category
                  }}
                  progress={progressMap[video.id]}
                  canAccess={canAccessVideo(video.access_level as 'public' | 'member' | 'vip')}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Videos */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.name || 'Videos'
              : 'All Videos'
            }
            {searchQuery && ` - "${searchQuery}"`}
          </h2>

          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-xl">
              <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No videos match your search' : 'No videos available yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <VideoCard
                  key={video.id}
                  video={{
                    ...video,
                    access_level: video.access_level as 'public' | 'member' | 'vip',
                    category: video.category
                  }}
                  progress={progressMap[video.id]}
                  canAccess={canAccessVideo(video.access_level as 'public' | 'member' | 'vip')}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </MemberLayout>
  );
}
