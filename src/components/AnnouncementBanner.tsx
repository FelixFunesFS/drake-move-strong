import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  background_color: string | null;
  text_color: string | null;
  accent_color: string | null;
  target_pages: string[] | null;
  dismissible: boolean;
}

const AnnouncementBanner = () => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .eq('is_active', true)
          .eq('display_type', 'banner')
          .order('priority', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // No rows returned
            console.error('Error fetching promotion:', error);
          }
          setPromotion(null);
        } else {
          setPromotion(data);
          // Check if this promotion was dismissed
          const dismissedPromotions = JSON.parse(localStorage.getItem('dismissedPromotions') || '[]');
          if (dismissedPromotions.includes(data.id)) {
            setIsDismissed(true);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotion();
  }, []);

  const handleDismiss = () => {
    if (promotion) {
      const dismissedPromotions = JSON.parse(localStorage.getItem('dismissedPromotions') || '[]');
      dismissedPromotions.push(promotion.id);
      localStorage.setItem('dismissedPromotions', JSON.stringify(dismissedPromotions));
    }
    setIsDismissed(true);
  };

  // Check if banner should show on current page
  const shouldShowOnPage = () => {
    if (!promotion?.target_pages) return true;
    if (promotion.target_pages.includes('all')) return true;
    return promotion.target_pages.includes(location.pathname);
  };

  if (isLoading || !promotion || isDismissed || !shouldShowOnPage()) {
    return null;
  }

  const isInternalLink = promotion.cta_link?.startsWith('/');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-50"
        style={{
          backgroundColor: promotion.background_color || 'hsl(var(--primary))',
          color: promotion.text_color || 'white',
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="font-semibold text-sm md:text-base">
                {promotion.title}
              </span>
              {promotion.description && (
                <span className="hidden sm:inline text-sm opacity-90">
                  {promotion.description}
                </span>
              )}
              {promotion.cta_text && promotion.cta_link && (
                isInternalLink ? (
                  <Link
                    to={promotion.cta_link}
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                    style={{
                      backgroundColor: promotion.accent_color || 'hsl(var(--accent))',
                      color: promotion.background_color || 'hsl(var(--primary))',
                    }}
                  >
                    {promotion.cta_text}
                  </Link>
                ) : (
                  <a
                    href={promotion.cta_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                    style={{
                      backgroundColor: promotion.accent_color || 'hsl(var(--accent))',
                      color: promotion.background_color || 'hsl(var(--primary))',
                    }}
                  >
                    {promotion.cta_text}
                  </a>
                )
              )}
            </div>
            {promotion.dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;