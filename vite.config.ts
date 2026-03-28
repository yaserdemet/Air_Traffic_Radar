import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api-proxy": {
        target: "https://opensky-network.org/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ""),
      },
      "/auth-proxy": {
        target: "https://auth.opensky-network.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth-proxy/, ""),
      },
    },
  },
});
