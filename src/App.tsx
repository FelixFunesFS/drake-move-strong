import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LazyAuthProvider } from "@/contexts/LazyAuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import AnnouncementBanner from "./components/AnnouncementBanner";
import { TodayClassesBanner } from "./components/schedule/TodayClassesBanner";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

// Create QueryClient outside component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce initial query overhead
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Critical path - loaded immediately
import Home from "./pages/Home";

// Lazy load non-critical routes
const About = lazy(() => import("./pages/About"));
const Classes = lazy(() => import("./pages/Classes"));
const Coaching = lazy(() => import("./pages/Coaching"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Contact = lazy(() => import("./pages/Contact"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const Auth = lazy(() => import("./pages/Auth"));
const Consultation = lazy(() => import("./pages/Consultation"));

// Landing pages
const NewYearChallenge = lazy(() => import("./pages/NewYearChallenge"));
const ResetWeek = lazy(() => import("./pages/ResetWeek"));
const ResetWeekAlt = lazy(() => import("./pages/ResetWeekAlt"));

// Service pages
const LowImpactFitnessCharleston = lazy(() => import("./pages/services/LowImpactFitnessCharleston"));
const MobilityFitnessAvondale = lazy(() => import("./pages/services/MobilityFitnessAvondale"));
const StrengthTrainingCharleston = lazy(() => import("./pages/services/StrengthTrainingCharleston"));
const WestAshleyFitness = lazy(() => import("./pages/services/WestAshleyFitness"));
const ResetWeekCharleston = lazy(() => import("./pages/services/ResetWeekCharleston"));

// Member portal
const MemberDashboard = lazy(() => import("./pages/member/Dashboard"));
const MemberProfile = lazy(() => import("./pages/member/Profile"));
const MyBookings = lazy(() => import("./pages/member/MyBookings"));
const MemberVideos = lazy(() => import("./pages/member/Videos"));
const MemberVideoPlayer = lazy(() => import("./pages/member/VideoPlayer"));
const MemberContracts = lazy(() => import("./pages/member/Contracts"));
const MemberWorkouts = lazy(() => import("./pages/member/Workouts"));
const MemberWorkoutSession = lazy(() => import("./pages/member/WorkoutSession"));

// Admin pages
const SocialGenerator = lazy(() => import("./pages/admin/SocialGenerator"));
const Promotions = lazy(() => import("./pages/admin/Promotions"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminMembers = lazy(() => import("./pages/admin/Members"));
const AdminMemberDetail = lazy(() => import("./pages/admin/MemberDetail"));
const AdminScheduleManager = lazy(() => import("./pages/admin/ScheduleManager"));
const AdminClassTypes = lazy(() => import("./pages/admin/ClassTypes"));
const AdminVideos = lazy(() => import("./pages/admin/Videos"));
const AdminNotifications = lazy(() => import("./pages/admin/Notifications"));
const AdminContracts = lazy(() => import("./pages/admin/Contracts"));
const AdminExercises = lazy(() => import("./pages/admin/Exercises"));
const WorkoutBuilder = lazy(() => import("./pages/admin/WorkoutBuilder"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));

// Coach pages
const CoachDashboard = lazy(() => import("./pages/coach/Dashboard"));
const CoachMembers = lazy(() => import("./pages/coach/Members"));
const CoachClasses = lazy(() => import("./pages/coach/Classes"));
const CoachTemplates = lazy(() => import("./pages/coach/Templates"));
const CoachProgress = lazy(() => import("./pages/coach/Progress"));

// Lazy load ChatBot
const ChatBot = lazy(() => import("./components/chat/ChatBot"));

// QueryClient is now defined at the top of the file with optimized settings

// Routes that should not show the standard navigation and footer
const STANDALONE_ROUTES = ['/new-year', '/reset-week', '/reset', '/auth', '/consultation'];

// Route prefixes that use custom layouts (no standard nav/footer)
const CUSTOM_LAYOUT_PREFIXES = ['/member/', '/admin/', '/coach/'];

const AppLayout = () => {
  const location = useLocation();
  const { isScrolled, isVisible, isPastHeader } = useScrollDirection(100);
  const isHomePage = location.pathname === '/';
  const isStandalonePage = STANDALONE_ROUTES.includes(location.pathname);
  const hasCustomLayout = CUSTOM_LAYOUT_PREFIXES.some(prefix => location.pathname.startsWith(prefix));
  const hideNavFooter = isStandalonePage || hasCustomLayout;

  // Header becomes fixed only AFTER scrolling past it (for home page)
  const headerIsFixed = isHomePage ? isPastHeader : true;

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!hideNavFooter && (
          <header 
            className={cn(
              "w-full z-50 transition-all duration-300",
              headerIsFixed 
                ? "fixed top-0 left-0 right-0" 
                : "relative",
              headerIsFixed && (isVisible ? "translate-y-0" : "-translate-y-full")
            )}
          >
            <AnnouncementBanner />
            <Navigation 
              transparent={false}
              isScrolled={isScrolled} 
            />
          </header>
        )}
        {/* Spacer when header becomes fixed (to prevent content jump) */}
        {!hideNavFooter && headerIsFixed && (
          <div className="h-[112px]" />
        )}
        {!hideNavFooter && !isHomePage && <TodayClassesBanner />}
        <div className="flex-grow">
          <Suspense fallback={<div className="min-h-screen" />}>
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
            <Route path="/reset-week" element={<ResetWeek />} />
            <Route path="/reset" element={<ResetWeekAlt />} />
            <Route path="/consultation" element={<Consultation />} />
            
            {/* Local SEO Service Pages */}
            <Route path="/low-impact-fitness-charleston" element={<LowImpactFitnessCharleston />} />
            <Route path="/mobility-fitness-avondale" element={<MobilityFitnessAvondale />} />
            <Route path="/strength-training-charleston" element={<StrengthTrainingCharleston />} />
            <Route path="/west-ashley-fitness" element={<WestAshleyFitness />} />
            <Route path="/reset-week-charleston" element={<ResetWeekCharleston />} />
            
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
          </Suspense>
        </div>
        {!hideNavFooter && <Footer />}
        {!hideNavFooter && (
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LazyAuthProvider>
          <AppLayout />
        </LazyAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
