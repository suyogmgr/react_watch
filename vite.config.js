import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/react_watch",
  server: {
    proxy: {
      "/api/khalti": {
        target: "https://dev.khalti.com/api/v2",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/khalti/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Authorization", "Key " + (process.env.VITE_KHALTI_KEY || "7861d724bdcc4e458a3c87b50392c01c"));
          });
        },
      },
    },
  },
})
