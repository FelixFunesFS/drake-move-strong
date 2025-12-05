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
import NewYearChallenge from "./pages/NewYearChallenge";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/member/Dashboard";
import MemberProfile from "./pages/member/Profile";
import MyBookings from "./pages/member/MyBookings";

const queryClient = new QueryClient();

// Routes that should not show the standard navigation and footer
const STANDALONE_ROUTES = ['/new-year', '/auth'];

// Routes that use the member portal layout (no standard nav/footer)
const MEMBER_ROUTES_PREFIX = '/member';

const AppLayout = () => {
  const location = useLocation();
  const isStandalonePage = STANDALONE_ROUTES.includes(location.pathname);
  const isMemberPortal = location.pathname.startsWith(MEMBER_ROUTES_PREFIX);
  const hideNavFooter = isStandalonePage || isMemberPortal;

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
            
            {/* Admin Routes (Protected - Admin Only) */}
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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!hideNavFooter && <Footer />}
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
