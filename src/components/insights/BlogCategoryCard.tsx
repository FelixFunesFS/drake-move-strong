import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Target, ArrowRight } from "lucide-react";

interface BlogCategoryCardProps {
  category: 'education' | 'trust' | 'conversion';
  name: string;
  description: string;
  articleCount: number;
}

const categoryConfig = {
  education: {
    icon: GraduationCap,
    gradient: "from-blue-500 to-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  trust: {
    icon: ShieldCheck,
    gradient: "from-green-500 to-green-700",
    badge: "bg-green-100 text-green-700",
  },
  conversion: {
    icon: Target,
    gradient: "from-amber-500 to-amber-700",
    badge: "bg-amber-100 text-amber-700",
  }
};

const BlogCategoryCard = ({ category, name, description, articleCount }: BlogCategoryCardProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
      <div className={`h-64 overflow-hidden bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
        <Icon className="text-white w-24 h-24" strokeWidth={1.5} />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 ${config.badge} text-xs font-bold rounded-full uppercase tracking-wide`}>
            {name}
          </span>
          <span className="text-sm text-muted-foreground">{articleCount} Articles</span>
        </div>
        <h3 className="font-hero text-2xl font-bold mb-4 uppercase text-foreground">
          {name === "Decision Support" ? "Decision Support" : `${name} Content`}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        <Link 
          to={`/insights?category=${category}`} 
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          Browse {name} Articles <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCategoryCard;
