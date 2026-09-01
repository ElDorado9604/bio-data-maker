import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bio-data-maker/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
