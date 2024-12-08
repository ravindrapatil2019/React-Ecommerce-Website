import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded relative to `index.html`
  build: {
    outDir: 'dist', // Optional: Set the output directory for the build
  }, optimizeDeps: {
    include: ['swiper'],
  },
});
