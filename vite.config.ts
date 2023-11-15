import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      styles: path.resolve(__dirname, "./src/styles"),
      services: path.resolve(__dirname, "./src/services"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
      reducers: path.resolve(__dirname, "./src/reducers"),
      themes: path.resolve(__dirname, "./src/themes"),
    },
  },
});
