import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from 'vite-imagetools';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

/**
 * Vite plugin that injects <link rel="preload"> tags for hero images
 * into the built HTML, making the LCP image discoverable by the browser's
 * preload scanner without waiting for JavaScript to execute.
 */
function heroImagePreload(): Plugin {
  return {
    name: 'hero-image-preload',
    enforce: 'post',
    generateBundle(_, bundle) {
      // Find hero images in the build output
      let mobileHeroPath = '';
      let desktopHeroPath = '';

      for (const fileName of Object.keys(bundle)) {
        if (fileName.includes('hero-mobile-kb-press') && fileName.endsWith('.webp')) {
          mobileHeroPath = fileName;
        }
        if (fileName.includes('hero-group-turkish-getup') && fileName.endsWith('.webp')) {
          desktopHeroPath = fileName;
        }
      }

      if (!mobileHeroPath && !desktopHeroPath) return;

      // Find and modify the HTML to inject preload links
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'asset' && chunk.fileName === 'index.html') {
          let preloadTags = '';
          if (mobileHeroPath) {
            preloadTags += `\n    <link rel="preload" as="image" href="/${mobileHeroPath}" type="image/webp" media="(max-width: 767px)" fetchpriority="high">`;
          }
          if (desktopHeroPath) {
            preloadTags += `\n    <link rel="preload" as="image" href="/${desktopHeroPath}" type="image/webp" media="(min-width: 768px)" fetchpriority="high">`;
          }
          chunk.source = (chunk.source as string).replace(
            '<!-- Hero image preloaded via fetchPriority="high" in React component -->',
            `<!-- LCP hero images preloaded for browser discovery -->${preloadTags}`
          );
          break;
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    imagetools(),
    mode === "development" && componentTagger(),
    // Inject CSS via JS to enable deferred loading and reduce render-blocking
    mode === "production" && cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    // Inject hero image preload links at build time for LCP optimization
    heroImagePreload(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'supabase': ['@supabase/supabase-js'],
          'react-query': ['@tanstack/react-query'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
}));
