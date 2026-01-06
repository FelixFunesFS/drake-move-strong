import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from 'vite-imagetools';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

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
