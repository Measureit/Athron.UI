// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: `/Athron.UI/`, // Base URL dla GitHub Pages subdirectory
  plugins: [
    react()
  ],
  server: {
    port: 5175,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})