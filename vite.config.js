import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // optional: use @ for src
    },
  },
  build: {
    assetsInlineLimit: 0, // ensures mp4 and other media are copied, not inlined as base64
  },
})
