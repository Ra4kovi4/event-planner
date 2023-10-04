import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    base: '/event-planner/events',
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    '404.html': ['./404.html'],
                },
            },
        },
    },
});
