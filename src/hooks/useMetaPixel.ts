import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

// Pages that trigger ViewContent events for retargeting
const VIEW_CONTENT_PAGES: Record<string, string> = {
  "/pricing": "Pricing",
  "/classes": "Classes",
  "/schedule": "Schedule",
  "/coaching": "Coaching",
  "/try-free-charleston": "Try Free",
};

/**
 * Fires Meta Pixel events. Base PageView is handled by the script in index.html.
 * This hook adds SPA route-change tracking + a helper for conversion events.
 */
export function useMetaPixel() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.fbq !== "function") return;

    // Fire PageView on every SPA navigation (initial is handled by base code)
    window.fbq("track", "PageView");

    // Fire ViewContent on high-value pages
    const contentName = VIEW_CONTENT_PAGES[location.pathname];
    if (contentName) {
      window.fbq("track", "ViewContent", {
        content_name: contentName,
        content_category: "Page View",
      });
    }
  }, [location.pathname]);
}

/** Fire a specific Meta Pixel event from anywhere */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}
