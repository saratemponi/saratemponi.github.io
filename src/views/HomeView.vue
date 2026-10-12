<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CategorySlider from '../components/CategorySlider.vue'
import categories from '../data/categories.json'
import projects from '../data/projects.json'
const hero = ref(null)
const heroProgress = ref(0)
const fields = ['Graphic design', 'Branding', 'Editorial', 'Digital']
const titleLines = {
  'editorial-branding': ['Editorial &', 'Branding'],
  'digital-design': ['Digital', 'Design'],
  fotografia: ['Still Life &', 'Atmospheres'],
  'graphic-experiments': ['Graphic', 'Experiments'],
  'digital-compositing': ['Digital', 'Compositing'],
}
const cards = categories.map((category, index) => ({
  ...category,
  image: category.id === 'editorial-branding' ? '/assets/mockup/side-character-copertina-mockup.webp' : category.image,
  displayTitle: titleLines[category.id],
  href: `#/categoria/${category.id}`,
  category: `${projects.filter(project => project.categoryId === category.id).length} progetti`,
  number: String(index + 1).padStart(2, '0'),
  panelColor: category.color,
  panelInk: category.ink,
}))
function explore() { document.getElementById('work').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }
let frame = 0
let preference
function updateHero() {
  frame = 0
  if (!hero.value) return
  const bounds = hero.value.getBoundingClientRect()
  heroProgress.value = preference.matches ? 0 : Math.max(0, Math.min(1, -bounds.top / bounds.height))
}
function scheduleHero() { if (!frame) frame = requestAnimationFrame(updateHero) }
onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  window.addEventListener('scroll', scheduleHero, { passive: true })
  window.addEventListener('resize', scheduleHero, { passive: true })
  preference.addEventListener('change', scheduleHero)
  updateHero()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleHero)
  window.removeEventListener('resize', scheduleHero)
  preference?.removeEventListener('change', scheduleHero)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <section ref="hero" class="intro hero expressive-hero" :style="{ '--hero-progress': heroProgress }">
    <div class="hero-copy">
      <p class="eyebrow">SARA TEMPONI · PORTFOLIO</p>
      <h1 tabindex="-1">Hi, I’m<br><span>Sara!</span></h1>
      <p class="intro-description">Graphic design, branding,<br>editorial &amp; digital.</p>
      <button class="pill-button" type="button" @click="explore">Entra nel mio mondo <span aria-hidden="true">↘</span></button>
    </div>
    <div class="hero-collage" aria-label="Una selezione dei miei lavori">
      <span class="collage-tag" aria-hidden="true">Una testa piena di idee</span>
      <RouterLink to="/progetto/il-tempo-di-tornare" class="collage-book" aria-label="Scopri Il tempo di tornare"><img src="/assets/mockup/il-tempo-di-tornare-copertina-mockup.webp" alt="Mockup del libro Il tempo di tornare" width="1536" height="1024" fetchpriority="high"></RouterLink>
      <RouterLink to="/progetto/rifugio-immaginario" class="collage-digital" aria-label="Scopri Rifugio immaginario"><img src="/assets/compositing.webp" alt="Composizione digitale con un castello fra i libri" width="1200" height="900"></RouterLink>
      <span class="collage-note">idee, immagini<br>&amp; un po’ di me.</span>
      <svg class="hero-spark" aria-hidden="true" viewBox="0 0 80 80"><path d="M40 8v64M8 40h64M17 17l46 46M17 63l46-46" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" /></svg>
    </div>
  </section>

  <div class="field-strip" aria-hidden="true"><div class="field-strip-track"><div v-for="copy in 2" :key="copy" class="field-strip-group"><span v-for="field in fields" :key="field">{{ field }} <span class="field-star">✳</span></span></div></div></div>

  <section id="work" class="work home-work" aria-label="Categorie dei lavori">
    <div class="work-heading"><div><p class="eyebrow">IL MIO MONDO, IN CINQUE PARTI</p><h2>Things I<br><em>love to make.</em></h2></div><p>Identità, pagine, immagini e mondi digitali.<br>Esplora i progetti, una categoria alla volta.</p></div>
    <div class="section-label"><span>ESPLORA I MIEI LAVORI</span><span>01 — 05</span></div>
    <CategorySlider :categories="cards" />
  </section>
  <section class="home-contact"><div><p class="eyebrow">FACCIAMO SPAZIO A NUOVE IDEE</p><h2>Let’s make<br><em>something.</em></h2></div><a class="pill-button" href="mailto:sara.temponii@gmail.com">Scrivimi <span aria-hidden="true">↗</span></a></section>
</template>
