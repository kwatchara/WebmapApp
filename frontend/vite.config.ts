import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import cesium from 'vite-plugin-cesium'

const root = fileURLToPath(new URL('.', import.meta.url))

// Multi-page app: one landing page + one page per web map API.
export default defineConfig({
  plugins: [cesium()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        leaflet: resolve(root, 'leaflet.html'),
        maplibre: resolve(root, 'maplibre.html'),
        cesium: resolve(root, 'cesium.html'),
      },
    },
  },
})
