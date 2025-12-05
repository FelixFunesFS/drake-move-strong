import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
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
import NewYearChallenge from "./pages/NewYearChallenge";

const queryClient = new QueryClient();

// Routes that should not show the standard navigation and footer
const STANDALONE_ROUTES = ['/new-year'];

const AppLayout = () => {
  const location = useLocation();
  const isStandalonePage = STANDALONE_ROUTES.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!isStandalonePage && <Navigation />}
        <div className="flex-grow">
          <Routes>
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
            {/* Landing Pages */}
            <Route path="/new-year" element={<NewYearChallenge />} />
            {/* Admin Routes */}
            <Route path="/admin/social-generator" element={<SocialGenerator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!isStandalonePage && <Footer />}
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
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
