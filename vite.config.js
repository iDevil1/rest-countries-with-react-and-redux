import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInclude: ['**/*.json'] // Include JSON files in the build output

  },
  base: '/rest-countries-with-react-and-redux/'
});
