import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    strictPort: false,
    hmr: {
      protocol: 'wss',
      host: '5175-i7mpglvirfc0cht6kngvp-f414513e.manusvm.computer',
      clientPort: 443,
    },
  },
})

