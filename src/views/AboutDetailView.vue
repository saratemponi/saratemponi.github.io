<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import sections from '../data/about-sections.json'
import ProjectPreview from '../components/ProjectPreview.vue'
const route = useRoute()
const preview = ref(null)
const section = computed(() => sections.find(item => item.id === route.params.id))
const nextSection = computed(() => sections[(sections.findIndex(item => item.id === section.value?.id) + 1) % sections.length])
const experienceLabels = ['Formazione', 'Interessi progettuali', 'Strumenti', 'Esperienze', 'Il prossimo passo']
function enlarge(image) { preview.value.open({title: section.value.title, image: image.src, alt: image.alt}) }
watch(() => route.fullPath, () => preview.value?.close())
</script>

<template>
  <article v-if="section" class="work inner-page personal-detail" :style="{ '--category-color': section.color, '--category-ink': section.ink }">
    <RouterLink class="back-link back-link-top" to="/about-me">← Torna a About me</RouterLink>
    <nav class="breadcrumb" aria-label="Percorso"><RouterLink to="/about-me">About me</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ section.title }}</span></nav>
    <div class="page-intro"><p class="eyebrow">ABOUT ME</p><h1 tabindex="-1">{{ section.title }}</h1><p class="intro-description">{{ section.description }}</p></div>
    <div v-if="section.id === 'experience'" class="experience-list">
      <section v-for="(paragraph, index) in section.paragraphs" :key="paragraph" class="experience-row"><span class="experience-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><h2>{{ experienceLabels[index] }}</h2><p>{{ paragraph }}</p></section>
    </div>
    <div v-else class="personal-story">
      <button class="personal-photo gallery-image" type="button" :aria-label="`Ingrandisci: ${section.gallery[0].alt}`" @click="enlarge(section.gallery[0])"><img :src="section.gallery[0].src" :alt="section.gallery[0].alt" fetchpriority="high"><span class="enlarge-label" aria-hidden="true">Ingrandisci ↗</span></button>
      <div class="personal-prose"><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></div>
    </div>
    <section v-if="section.gallery.length > 1" class="personal-gallery" aria-label="Il mio immaginario">
      <div class="section-label"><span>IL MIO IMMAGINARIO</span><span>{{ section.gallery.length - 1 }} IMMAGINI</span></div>
      <div class="personal-image-grid"><button v-for="image in section.gallery.slice(1)" :key="image.src" class="gallery-image" type="button" :aria-label="`Ingrandisci: ${image.alt}`" @click="enlarge(image)"><img :src="image.src" :alt="image.alt" loading="lazy"><span class="enlarge-label" aria-hidden="true">Ingrandisci ↗</span></button></div>
    </section>
    <div class="project-pagination"><RouterLink to="/about-me">← Tutte le sezioni</RouterLink><RouterLink :to="`/about-me/${nextSection.id}`">{{ nextSection.title }} →</RouterLink></div>
    <ProjectPreview ref="preview" />
  </article>
</template>
