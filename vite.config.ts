import { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React y dependencias principales
          'react-vendor': ['react', 'react-dom'],
          // Separar React Router
          'router': ['react-router', 'react-router-dom'],
          // Separar UI components
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-popover', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-tooltip'],
          // Separar utilidades
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          // Separar formularios
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Separar multimedia
          'media': ['react-youtube', 'react-webcam', 'react-dropzone'],
          // Separar charts
          'charts': ['recharts'],
          // Separar query
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Aumentar el límite de warning para chunks
    chunkSizeWarningLimit: 1000,
  },
})