import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/love-site/',
  plugins: [
    ViteImageOptimizer({
      jpeg: { quality: 80, progressive: true },
      jpg:  { quality: 80, progressive: true },
      png:  { quality: 80, compressionLevel: 9 },
      webp: { quality: 80 },
    }),
  ],
})
