<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import categories from '../data/categories.json'
import projects from '../data/projects.json'
import ProjectPreview from '../components/ProjectPreview.vue'
const route = useRoute()
const preview = ref(null)
const project = computed(() => projects.find(item => item.id === route.params.id))
const category = computed(() => categories.find(item => item.id === project.value?.categoryId))
const nextProject = computed(() => {
  const siblings = projects.filter(item => item.categoryId === category.value?.id)
  return siblings[(siblings.findIndex(item => item.id === project.value?.id) + 1) % siblings.length]
})
const angles = ['-1.6deg', '1.5deg', '-1deg', '1.1deg', '-.7deg', '1.3deg']
function imageLabel(image, index) {
  const label = image.alt.startsWith(project.value.title)
    ? image.alt.slice(project.value.title.length).replace(/^[\s—–-]+/, '')
    : image.alt
  return label || `Immagine ${index + 1}`
}
function enlarge(image) {
  preview.value.open({ title: project.value.title, image: image.src, alt: image.alt, description: image.caption || '' })
}
watch(() => route.fullPath, () => preview.value?.close())
</script>

<template>
  <article v-if="project && category" class="work inner-page project-detail" :style="{ '--category-color': category.color, '--category-ink': category.ink }">
    <RouterLink class="back-link back-link-top" :to="`/categoria/${category.id}`">← Torna a {{ category.title }}</RouterLink>
    <nav class="breadcrumb" aria-label="Percorso">
      <RouterLink to="/">Work</RouterLink><span aria-hidden="true">/</span>
      <RouterLink :to="`/categoria/${category.id}`">{{ category.title }}</RouterLink><span aria-hidden="true">/</span>
      <span aria-current="page">{{ project.title }}</span>
    </nav>

    <div class="project-lead">
      <div class="page-intro">
        <p class="eyebrow">{{ project.category }}</p>
        <h1 tabindex="-1">{{ project.title }}</h1>
      </div>
      <section class="project-summary" aria-label="Descrizione del progetto">
        <p v-for="paragraph in project.description" :key="paragraph">{{ paragraph }}</p>
        <div v-if="project.pdf || project.website" class="project-documents">
          <a v-if="project.pdf" class="project-pdf-link" :href="project.pdf.src" target="_blank" rel="noopener noreferrer" type="application/pdf" :aria-label="`${project.pdf.label} di ${project.title} in una nuova scheda`">{{ project.pdf.label }} <span aria-hidden="true">↗</span></a>
          <a v-if="project.website" class="project-pdf-link project-website-link" :href="project.website.url" target="_blank" rel="noopener noreferrer" :aria-label="`${project.website.label} di ${project.title} in una nuova scheda`">{{ project.website.label }} <span aria-hidden="true">↗</span></a>
        </div>
        <div class="project-attribution">
          <p v-if="project.role" class="project-role"><span>Il mio contributo</span>{{ project.role }}</p>
          <p v-if="project.credits" class="project-credits detail-credits">{{ project.credits }}</p>
        </div>
      </section>
    </div>

    <div class="section-label"><span>Il progetto in immagini</span><span>{{ project.gallery.length }} {{ project.gallery.length === 1 ? 'immagine' : 'immagini' }}</span></div>
    <section class="project-collage" :class="{ 'is-print': project.galleryStyle === 'print', 'is-single': project.gallery.length === 1, 'is-pair': project.gallery.length === 2 }" :aria-label="`Immagini del progetto ${project.title}`">
      <figure v-for="(image, index) in project.gallery" :key="image.src" class="collage-item" :class="{ 'is-mockup': image.kind === 'mockup', 'collage-last': index === project.gallery.length - 1 && project.gallery.length > 2 && project.gallery.length % 2 === 1 }" :style="{ '--collage-angle': angles[index % angles.length] }">
        <button class="gallery-image collage-image" type="button" :aria-label="`Ingrandisci: ${image.alt}`" @click="enlarge(image)">
          <img :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" :loading="index === 0 ? 'eager' : 'lazy'">
          <span class="enlarge-label" aria-hidden="true">Ingrandisci ↗</span>
        </button>
        <figcaption class="collage-caption"><span>{{ String(index + 1).padStart(2, '0') }}</span><div>{{ imageLabel(image, index) }}<p v-if="image.caption">{{ image.caption }}</p></div></figcaption>
      </figure>
    </section>
    <div class="project-pagination">
      <RouterLink v-if="nextProject && nextProject.id !== project.id" :to="`/progetto/${nextProject.id}`">{{ nextProject.title }} →</RouterLink>
    </div>
    <ProjectPreview ref="preview" />
  </article>
</template>
