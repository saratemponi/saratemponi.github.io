<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import categories from '../data/categories.json'
import projects from '../data/projects.json'
const route = useRoute()
const category = computed(() => categories.find(item => item.id === route.params.id))
const works = computed(() => projects.filter(item => item.categoryId === category.value?.id).map(item => ({ ...item, panelColor: category.value.color, panelInk: category.value.ink, href: `#/progetto/${item.id}` })))
</script>

<template>
  <section v-if="category" class="work inner-page" :style="{ '--category-color': category.color, '--category-ink': category.ink }">
    <RouterLink class="back-link back-link-top" to="/">← Torna alle categorie</RouterLink>
    <nav class="breadcrumb" aria-label="Percorso"><RouterLink to="/">Work</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ category.title }}</span></nav>
    <div class="page-intro">
      <p class="eyebrow">CATEGORIA</p>
      <h1 tabindex="-1">{{ category.title }}</h1>
      <p class="intro-description">{{ category.description }}</p>
    </div>
    <div class="section-label"><span>Tutti i progetti</span><span>{{ works.length }} lavori</span></div>
    <div class="category-list">
      <ProjectCard v-for="(project, index) in works" :key="project.id" :project="project" :priority="index === 0" />
    </div>
  </section>
</template>
