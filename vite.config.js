import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				titleProp: true,
			},
		}),
	],
	resolve: {
		alias: [
			{ find: "@", replacement: path.resolve(__dirname, "src") },
			{ find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
			{ find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@contexts",
				replacement: path.resolve(__dirname, "src/contexts"),
			},
		],
	},
});
