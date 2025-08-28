import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config();

export default defineConfig({
  plugins: [
    react(), // Use React plugin for JSX and Fast Refresh
  ],
  define: {
    // Define environment variables to be injected into your code
    'process.env': {},
  },
  server: {
    // You can specify the server settings here, such as port or proxy
    host: '0.0.0.0',
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')], // Add TailwindCSS and autoprefixer plugins for CSS
    },
  },
  optimizeDeps: {
    // Optional: To help optimize some dependencies during development
    include: ['axios', '@reduxjs/toolkit', '@tanstack/react-query'],
  },
});
