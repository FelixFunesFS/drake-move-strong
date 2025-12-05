import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Calendar, Clock, User, PlayCircle } from 'lucide-react';

interface MemberLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/member/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/schedule', label: 'Book Class', icon: Calendar },
  { href: '/member/bookings', label: 'My Bookings', icon: Clock },
  { href: '/member/videos', label: 'Videos', icon: PlayCircle },
  { href: '/member/profile', label: 'Profile', icon: User },
];

export default function MemberLayout({ children }: MemberLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Navigation */}
      <nav className="md:hidden bg-background border-b sticky top-0 z-40">
        <div className="flex overflow-x-auto py-2 px-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-background border-r p-6">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
