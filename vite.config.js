import { defineConfig } from 'vite';

export default defineConfig({
  root: './public', // Set the root to the public folder
  server: {
    port: 5173,
    open: true, // Automatically open the browser when the server starts
  },
});
