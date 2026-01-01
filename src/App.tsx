import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import AnnouncementBanner from "./components/AnnouncementBanner";
import ChatBot from "./components/chat/ChatBot";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Coaching from "./pages/Coaching";
import Pricing from "./pages/Pricing";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import SuccessStories from "./pages/SuccessStories";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Insights from "./pages/Insights";
import InsightPost from "./pages/InsightPost";
import SocialGenerator from "./pages/admin/SocialGenerator";
import Promotions from "./pages/admin/Promotions";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMembers from "./pages/admin/Members";
import AdminMemberDetail from "./pages/admin/MemberDetail";
import AdminScheduleManager from "./pages/admin/ScheduleManager";
import AdminClassTypes from "./pages/admin/ClassTypes";
import NewYearChallenge from "./pages/NewYearChallenge";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/member/Dashboard";
import MemberProfile from "./pages/member/Profile";
import MyBookings from "./pages/member/MyBookings";
import MemberVideos from "./pages/member/Videos";
import MemberVideoPlayer from "./pages/member/VideoPlayer";
import MemberContracts from "./pages/member/Contracts";
import MemberWorkouts from "./pages/member/Workouts";
import MemberWorkoutSession from "./pages/member/WorkoutSession";
import AdminVideos from "./pages/admin/Videos";
import AdminNotifications from "./pages/admin/Notifications";
import AdminContracts from "./pages/admin/Contracts";
import AdminExercises from "./pages/admin/Exercises";
import WorkoutBuilder from "./pages/admin/WorkoutBuilder";
import AdminAnalytics from "./pages/admin/Analytics";
import CoachDashboard from "./pages/coach/Dashboard";
import CoachMembers from "./pages/coach/Members";
import CoachClasses from "./pages/coach/Classes";
import CoachTemplates from "./pages/coach/Templates";
import CoachProgress from "./pages/coach/Progress";
import Consultation from "./pages/Consultation";
import MobilityTrainingCharleston from "./pages/services/MobilityTrainingCharleston";
import StrengthTrainingOver40Charleston from "./pages/services/StrengthTrainingOver40Charleston";
import LowImpactFitnessCharleston from "./pages/services/LowImpactFitnessCharleston";
import PersonalTrainingAvondale from "./pages/services/PersonalTrainingAvondale";

const queryClient = new QueryClient();

// Routes that should not show the standard navigation and footer
const STANDALONE_ROUTES = ['/new-year', '/auth', '/consultation'];

// Route prefixes that use custom layouts (no standard nav/footer)
const CUSTOM_LAYOUT_PREFIXES = ['/member', '/admin', '/coach'];

const AppLayout = () => {
  const location = useLocation();
  const isStandalonePage = STANDALONE_ROUTES.includes(location.pathname);
  const hasCustomLayout = CUSTOM_LAYOUT_PREFIXES.some(prefix => location.pathname.startsWith(prefix));
  const hideNavFooter = isStandalonePage || hasCustomLayout;

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!hideNavFooter && <AnnouncementBanner />}
        {!hideNavFooter && <Navigation />}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Landing Pages */}
            <Route path="/new-year" element={<NewYearChallenge />} />
            <Route path="/consultation" element={<Consultation />} />
            
            {/* Local SEO Service Pages */}
            <Route path="/mobility-training-charleston" element={<MobilityTrainingCharleston />} />
            <Route path="/strength-training-over-40-charleston" element={<StrengthTrainingOver40Charleston />} />
            <Route path="/low-impact-fitness-charleston" element={<LowImpactFitnessCharleston />} />
            <Route path="/personal-training-avondale" element={<PersonalTrainingAvondale />} />
            
            {/* Member Portal (Protected) */}
            <Route path="/member/dashboard" element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            } />
            <Route path="/member/profile" element={
              <ProtectedRoute>
                <MemberProfile />
              </ProtectedRoute>
            } />
            <Route path="/member/bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/member/videos" element={
              <ProtectedRoute>
                <MemberVideos />
              </ProtectedRoute>
            } />
            <Route path="/member/videos/:id" element={
              <ProtectedRoute>
                <MemberVideoPlayer />
              </ProtectedRoute>
            } />
            <Route path="/member/contracts" element={
              <ProtectedRoute>
                <MemberContracts />
              </ProtectedRoute>
            } />
            <Route path="/member/workouts" element={
              <ProtectedRoute>
                <MemberWorkouts />
              </ProtectedRoute>
            } />
            <Route path="/member/workouts/:planId/session" element={
              <ProtectedRoute>
                <MemberWorkoutSession />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes (Protected - Admin Only) */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/members" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminMembers />
              </ProtectedRoute>
            } />
            <Route path="/admin/members/:id" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminMemberDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin/schedule" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminScheduleManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/class-types" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminClassTypes />
              </ProtectedRoute>
            } />
            <Route path="/admin/social-generator" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <SocialGenerator />
              </ProtectedRoute>
            } />
            <Route path="/admin/promotions" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Promotions />
              </ProtectedRoute>
            } />
            <Route path="/admin/videos" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminVideos />
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminNotifications />
              </ProtectedRoute>
            } />
            <Route path="/admin/contracts" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminContracts />
              </ProtectedRoute>
            } />
            <Route path="/admin/exercises" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminExercises />
              </ProtectedRoute>
            } />
            <Route path="/admin/workout-builder" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <WorkoutBuilder />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            
            {/* Coach Routes (Protected - Coach and Admin) */}
            <Route path="/coach/dashboard" element={
              <ProtectedRoute requiredRoles={['coach', 'admin']}>
                <CoachDashboard />
              </ProtectedRoute>
            } />
            <Route path="/coach/members" element={
              <ProtectedRoute requiredRoles={['coach', 'admin']}>
                <CoachMembers />
              </ProtectedRoute>
            } />
            <Route path="/coach/classes" element={
              <ProtectedRoute requiredRoles={['coach', 'admin']}>
                <CoachClasses />
              </ProtectedRoute>
            } />
            <Route path="/coach/templates" element={
              <ProtectedRoute requiredRoles={['coach', 'admin']}>
                <CoachTemplates />
              </ProtectedRoute>
            } />
            <Route path="/coach/progress" element={
              <ProtectedRoute requiredRoles={['coach', 'admin']}>
                <CoachProgress />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!hideNavFooter && <Footer />}
        {!hideNavFooter && <ChatBot />}
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
