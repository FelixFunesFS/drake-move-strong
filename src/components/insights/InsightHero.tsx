import { Calendar, Clock, User } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { InsightPost, authorInfo, categoryInfo } from "@/data/insights";
import { format } from "date-fns";

interface InsightHeroProps {
  post: InsightPost;
}

const InsightHero = ({ post }: InsightHeroProps) => {
  const author = authorInfo[post.author];

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <CategoryBadge category={post.category} className="mb-4" />
          
          <h1 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightHero;
