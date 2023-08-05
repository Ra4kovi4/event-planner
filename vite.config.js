import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), reactRefresh()],
	base: "/eliftech_delivery-service-frontend/",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"404.html": ["./404.html"],
				},
			},
		},
	},
});
