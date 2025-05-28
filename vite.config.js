import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // keeps assets relative for Netlify
  plugins: [react()],
});
