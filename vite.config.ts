import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',  // Replace with the URL of your API
        changeOrigin: true,  // Ensure the target server will accept the proxy request
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: rewrite the URL if needed
      },
    },
  },
})
