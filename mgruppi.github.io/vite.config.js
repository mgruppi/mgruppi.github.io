import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  base: "",
  server: {
    proxy: {
      "/articles": {
        target: "https://mgruppi.me/archive/blog",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/articles/, ""),
      },
    },
  },
})
