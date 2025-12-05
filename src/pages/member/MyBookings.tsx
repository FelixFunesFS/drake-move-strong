import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import MemberLayout from '@/components/member/MemberLayout';

export default function MyBookings() {
  return (
    <>
      <SEO 
        title="My Bookings" 
        description="View and manage your upcoming class reservations at Drake Fitness."
        canonical="https://drake.fitness/member/bookings"
      />
      
      <MemberLayout>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">My Bookings</h1>
              <p className="text-muted-foreground mt-1">
                Your upcoming class reservations
              </p>
            </div>
            <Button asChild>
              <Link to="/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Class
              </Link>
            </Button>
          </div>

          {/* Empty State */}
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2">No Upcoming Bookings</CardTitle>
              <CardDescription className="max-w-md mb-6">
                You don't have any classes booked yet. Browse the schedule to find a class that works for you.
              </CardDescription>
              <Button asChild>
                <Link to="/schedule">View Schedule</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Past Bookings Section (placeholder) */}
          <div>
            <h2 className="font-hero text-xl uppercase mb-4">Past Classes</h2>
            <Card className="shadow-card">
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No class history yet. Book your first class to get started!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </MemberLayout>
    </>
  );
}
