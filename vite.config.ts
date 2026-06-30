import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  const plugins = [
    react(),
    tailwindcss({
      config: "./tailwind.config.js"
    }),
  ];

  // Add visualizer in analyze mode
  if (mode === "analyz" || mode === "report") {
    plugins.push(
      visualizer({
        open: mode === "report",
        filename: "stats.html",
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      chunkSizeWarningLimit: 1200,
      cssMinify: "esbuild",
      minify: "esbuild",
      target: "es2020",
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("lucide-react")) return "vendor-icons";
              if (id.includes("react-router")) return "vendor-router";
              if (id.includes("@neondatabase")) return "vendor-auth";
              return "vendor";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
    // Performance optimizations
    esbuild: {
      // Drop console in production builds only
      drop: mode === "production" || mode === "build" ? ["console"] : [],
    },
    // Enable caching for faster rebuilds
    cacheDir: "./node_modules/.vite",
    optimizeDeps: {
      // Pre-bundle dependencies for faster startup
      include: ["react", "react-dom", "react-router-dom"],
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
      // Optimize HMR
      watch: {
        usePolling: true,
      },
    },
  };
});
