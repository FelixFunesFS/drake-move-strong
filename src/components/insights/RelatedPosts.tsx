import { InsightPost } from "@/data/insights";
import BlogArticleCard from "./BlogArticleCard";

interface RelatedPostsProps {
  posts: InsightPost[];
  currentPostId: string;
}

const RelatedPosts = ({ posts, currentPostId }: RelatedPostsProps) => {
  // Get 3 related posts (excluding current)
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-hero text-2xl md:text-3xl font-bold uppercase tracking-tight text-center mb-10">
          Continue Reading
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedPosts.map((post) => (
            <BlogArticleCard key={post.id} post={post} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
