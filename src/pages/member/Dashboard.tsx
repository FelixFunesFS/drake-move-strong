import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, CreditCard, LogOut } from 'lucide-react';
import MemberLayout from '@/components/member/MemberLayout';

export default function MemberDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <>
      <SEO 
        title="Member Dashboard" 
        description="View your upcoming classes, membership status, and class credits."
        canonical="https://drake.fitness/member/dashboard"
      />
      
      <MemberLayout>
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">
                Welcome{profile?.first_name ? `, ${profile.first_name}` : ''}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to move better today?
              </p>
            </div>
            <Button variant="outline" onClick={signOut} className="w-fit">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Membership Status
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">No Active Plan</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Contact admin to activate
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Class Credits
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">—</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Available credits
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Classes
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Booked this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-hero text-xl uppercase flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Book a Class
                </CardTitle>
                <CardDescription>
                  View the schedule and reserve your spot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/schedule">View Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-hero text-xl uppercase flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Your Profile
                </CardTitle>
                <CardDescription>
                  Update your contact info and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/member/profile">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="bg-primary text-primary-foreground shadow-card">
            <CardHeader>
              <CardTitle className="font-hero text-xl uppercase">
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to Drake Fitness! To start booking classes, an admin will need to 
                activate your membership. In the meantime, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-foreground/90">
                <li>Complete your profile with emergency contact info</li>
                <li>Browse the class schedule to see what's available</li>
                <li>Check out our class descriptions and coaches</li>
              </ul>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="secondary">
                  <Link to="/member/profile">Complete Profile</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/classes">View Classes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MemberLayout>
    </>
  );
}
