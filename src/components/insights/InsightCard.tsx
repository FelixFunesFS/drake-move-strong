import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { InsightPost, authorInfo } from "@/data/insights";
import OptimizedImage from "@/components/OptimizedImage";

interface InsightCardProps {
  post: InsightPost;
}

const InsightCard = ({ post }: InsightCardProps) => {
  const author = authorInfo[post.author];

  return (
    <Link
      to={`/insights/${post.slug}`}
      className="group bg-card rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <OptimizedImage
          src={post.thumbnail}
          alt={post.title}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={post.category} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-hero font-semibold text-xl mb-2 uppercase group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InsightCard;
