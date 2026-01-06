import { Link } from "react-router-dom";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import { InsightPost, authorInfo } from "@/data/insights";
import OptimizedImage from "@/components/OptimizedImage";
import { format } from "date-fns";

interface BlogArticleCardProps {
  post: InsightPost;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryBadgeConfig = {
  education: "bg-blue-600 text-white",
  trust: "bg-green-600 text-white",
  conversion: "bg-amber-600 text-white",
};

const BlogArticleCard = ({ post, variant = 'default' }: BlogArticleCardProps) => {
  const author = authorInfo[post.author];
  const badgeClass = categoryBadgeConfig[post.category];

  if (variant === 'featured') {
    return (
      <article className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
        <div className="relative h-80 overflow-hidden">
          <OptimizedImage
            src={post.thumbnail}
            alt={post.title}
            className="group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 ${badgeClass} text-xs font-bold rounded-full uppercase tracking-wide`}>
              {post.category}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime} min read
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {author.name}
            </span>
          </div>
          <Link to={`/insights/${post.slug}`}>
            <h3 className="font-hero text-2xl md:text-3xl font-bold mb-4 text-foreground hover:text-primary transition-colors cursor-pointer leading-tight uppercase">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <Link 
            to={`/insights/${post.slug}`}
            className="inline-flex items-center text-primary font-bold hover:text-primary/80 transition-colors text-lg"
          >
            Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-border">
        <div className="relative h-56 overflow-hidden">
          <OptimizedImage
            src={post.thumbnail}
            alt={post.title}
            className="group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 ${badgeClass} text-xs font-bold rounded uppercase`}>
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-3 h-3" /> {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            <span>•</span>
            <Clock className="w-3 h-3" /> {post.readTime} min
          </div>
          <Link to={`/insights/${post.slug}`}>
            <h3 className="font-hero text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer uppercase line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
          <Link 
            to={`/insights/${post.slug}`}
            className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Read More <ArrowRight className="ml-2 w-4 h-4 text-sm" />
          </Link>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
      <div className="relative h-56 overflow-hidden">
        <OptimizedImage
          src={post.thumbnail}
          alt={post.title}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 ${badgeClass} text-xs font-bold rounded uppercase`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-3 h-3" /> {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
          <span>•</span>
          <Clock className="w-3 h-3" /> {post.readTime} min
        </div>
        <Link to={`/insights/${post.slug}`}>
          <h3 className="font-hero text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer uppercase">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <Link 
          to={`/insights/${post.slug}`}
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          Read More <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogArticleCard;
