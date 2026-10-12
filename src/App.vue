<script setup>
import { nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
let observer
function revealContent() {
  observer?.disconnect()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target) }
    }
  }, { threshold: 0.08 })
  document.querySelectorAll('.project, .project-collage .collage-item, .personal-story, .personal-image-grid .gallery-image, .experience-row').forEach(element => { element.classList.add('reveal-target', 'is-pending'); observer.observe(element) })
}
onMounted(revealContent)
onBeforeUnmount(() => observer?.disconnect())
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'auto' }) }
function skipToContent() { document.getElementById('main-content').focus() }
watch(() => route.fullPath, async () => {
  await nextTick()
  revealContent()
  const heading = document.querySelector('main h1')
  if (heading) {
    document.title = `${heading.textContent} — Sara Temponi`
    heading.focus({ preventScroll: true })
  }
})
</script>

<template>
  <a class="skip" href="#main-content" @click.prevent="skipToContent">Vai al contenuto</a>
  <header class="header">
    <RouterLink to="/" class="wordmark" aria-label="Sara Temponi, home">
      Sara Temponi<span aria-hidden="true">.</span>
    </RouterLink>
    <nav aria-label="Navigazione principale">
      <RouterLink :class="{ active: !route.path.startsWith('/about-me') && route.path !== '/contact' }" to="/">Work</RouterLink>
      <RouterLink :class="{ active: route.path.startsWith('/about-me') }" to="/about-me">About me</RouterLink>
      <RouterLink class="contact-link" :class="{ active: route.path === '/contact' }" to="/contact">Contact</RouterLink>
    </nav>
  </header>
  <main id="main-content" tabindex="-1">
    <RouterView />
  </main>
  <footer>
    <RouterLink class="wordmark" to="/">Sara Temponi<span>.</span></RouterLink>
    <button class="text-button" type="button" @click="scrollToTop">Torna su ↑</button>
  </footer>
</template>
