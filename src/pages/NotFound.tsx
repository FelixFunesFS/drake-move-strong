import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Home, Calendar, Phone, Users } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { to: "/", label: "Home", icon: Home },
    { to: "/schedule", label: "Schedule", icon: Calendar },
    { to: "/about", label: "About Us", icon: Users },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Page Not Found | Drake Fitness</title>
      </Helmet>
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-7xl font-black text-primary mb-4">404</h1>
          <p className="text-xl font-semibold text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {popularPages.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
