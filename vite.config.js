import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), reactRefresh()],
  base: '/event-planner/events',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          '404.html': ['./404.html'],
        },
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  rewrites: [
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
});
