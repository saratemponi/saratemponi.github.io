import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createRouter, createMemoryHistory } from 'vue-router'

const projects = JSON.parse(readFileSync('src/data/projects.json'))
const categories = JSON.parse(readFileSync('src/data/categories.json'))
const sections = JSON.parse(readFileSync('src/data/about-sections.json'))
for (const section of sections) {
  for (const image of [section.image, ...section.gallery.map(item => item.src)]) {
    assert(existsSync(`public${image}`), image)
    assert(existsSync(`dist${image}`), `Build: ${image}`)
  }
}
assert.equal(new Set(projects.map(p => p.id)).size, projects.length)
for (const project of projects) {
  assert(categories.some(c => c.id === project.categoryId), project.id)
  assert(project.description.length > 0 && project.description.every(Boolean), project.id)
  assert(project.gallery.length > 0, project.id)
  if (project.pdf) {
    assert(existsSync(`public${project.pdf.src}`), `${project.id}: missing PDF`)
    assert(existsSync(`dist${project.pdf.src}`), `${project.id}: missing built PDF`)
  }
  for (const image of [project.image, ...project.gallery.map(i => i.src)]) {
    assert(existsSync(`public${image}`), image)
    assert(existsSync(`dist${image}`), `Build: ${image}`)
  }
}
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
try {
  const { routes } = await server.ssrLoadModule('/src/routes.js')
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const cases = [
    ['/', 'Hi, I’m'],
    ...categories.map(c => [`/categoria/${c.id}`, c.title]),
    ...projects.map(p => [`/progetto/${p.id}`, p.title]),
    ['/about-me', 'About'],
    ...sections.map(section => [`/about-me/${section.id}`, section.title]),
    ['/contact', 'Contact'],
    ['/about-me/missing', 'Pagina non trovata'],
    ['/categoria/missing', 'Pagina non trovata'],
    ['/progetto/missing', 'Pagina non trovata'],
  ]
  for (const [path, title] of cases) {
    const router = createRouter({ history: createMemoryHistory(), routes })
    const app = createSSRApp(App).use(router)
    await router.push(path)
    await router.isReady()
    const html = await renderToString(app)
    const escaped = title.replaceAll('&', '&amp;')
    assert(html.includes(escaped), `${path}: missing title`)
    assert(html.includes('href="/about-me"'), `${path}: missing About navigation`)
    assert(html.includes('href="/contact"'), `${path}: missing Contact navigation`)
    if (path === '/contact') assert(html.includes('mailto:sara.temponii@gmail.com'), 'Missing email')
    if (path.startsWith('/progetto/') && !path.endsWith('missing')) {
      const project = projects.find(p => path.endsWith(p.id))
      for (const image of project.gallery) assert(html.includes(image.src), `${path}: missing gallery image`)
      if (project.pdf) assert(html.includes(`href="${project.pdf.src}"`), `${path}: missing PDF link`)
      assert(html.includes(`/categoria/${project.categoryId}`), `${path}: missing category link`)
    }
    if (path.startsWith('/categoria/') && !path.endsWith('missing')) {
      for (const project of projects.filter(p => path.endsWith(p.categoryId))) {
        assert(html.includes(`#/progetto/${project.id}`), `${path}: missing project link`)
      }
    }
  }
  console.log(`Verified ${cases.length} routes, ${projects.length} project galleries, category links and all image files.`)
} finally {
  await server.close()
}
