import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Layers, 
  LogOut, 
  Menu,
  X,
  Image,
  Megaphone,
  PlayCircle,
  Mail,
  FileText,
  Dumbbell,
  ClipboardList
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/members', label: 'Members', icon: Users },
  { href: '/admin/schedule', label: 'Schedule', icon: Calendar },
  { href: '/admin/class-types', label: 'Class Types', icon: Layers },
  { href: '/admin/exercises', label: 'Exercises', icon: Dumbbell },
  { href: '/admin/workout-builder', label: 'Workout Builder', icon: ClipboardList },
  { href: '/admin/videos', label: 'Videos', icon: PlayCircle },
  { href: '/admin/contracts', label: 'Contracts', icon: FileText },
  { href: '/admin/notifications', label: 'Notifications', icon: Mail },
  { href: '/admin/promotions', label: 'Promotions', icon: Megaphone },
  { href: '/admin/social-generator', label: 'Content Studio', icon: Image },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Header */}
      <header className="md:hidden bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin/dashboard" className="font-hero text-lg uppercase">
            Admin Portal
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-4 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive 
                      ? "bg-primary-foreground text-primary" 
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium w-full text-left hover:bg-primary-foreground/10"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-screen bg-primary text-primary-foreground fixed left-0 top-0">
          <div className="p-6 border-b border-primary-foreground/10">
            <Link to="/admin/dashboard" className="font-hero text-xl uppercase">
              Admin Portal
            </Link>
            <p className="text-sm text-primary-foreground/70 mt-1">
              {profile?.first_name || 'Admin'}
            </p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
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
                      ? "bg-primary-foreground text-primary" 
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-primary-foreground/10">
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mt-2"
            >
              ← Back to Website
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
