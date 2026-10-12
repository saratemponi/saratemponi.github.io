import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readdirSync, existsSync } from 'node:fs'

// Serve the saved project pages before Vite falls back to the Vue home.
const publicDirectory = new URL('./public/', import.meta.url)
const archivedPages = new Set(
  readdirSync(publicDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(new URL(`${entry.name}/index.html`, publicDirectory)))
    .map(entry => `/${entry.name}/`),
)

function serveArchives(server) {
  server.middlewares.use((request, response, next) => {
    const url = new URL(request.url, 'http://localhost')
    if (archivedPages.has(url.pathname)) {
      request.url = `${url.pathname}index.html${url.search}`
    }
    next()
  })
}

export default defineConfig({
  plugins: [vue(), {
    name: 'saved-portfolio-pages',
    configureServer: serveArchives,
    configurePreviewServer: serveArchives,
  }],
  build: { assetsDir: 'app-assets' },
})
