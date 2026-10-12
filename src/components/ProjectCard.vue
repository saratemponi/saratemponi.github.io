<script setup>
defineProps({ project: { type: Object, required: true }, priority: Boolean })
defineEmits(['preview'])
</script>

<template>
  <article class="project" :style="{ '--panel-color': project.panelColor || 'var(--paper)', '--panel-ink': project.panelInk || 'var(--ink)' }">
    <component :is="project.href ? 'a' : 'button'" class="project-link" :href="project.href" :type="project.href ? undefined : 'button'" :aria-label="project.href ? undefined : `Apri anteprima: ${project.title}`" @click="!project.href && $emit('preview', project)">
      <div class="cover" :style="{ '--cover-bg': project.tone || '#f4f0e8', '--fit': project.fit || 'cover' }"><img :src="project.image" :alt="project.title" width="1200" height="900" :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'"></div>
      <div class="project-caption">
        <span v-if="project.number" class="category-number" aria-hidden="true">{{ project.number }}</span>
        <div><p class="card-meta">{{ project.category }}</p><h2>{{ project.title }}</h2><p v-if="project.number" class="category-description">{{ project.description }}</p></div>
        <span class="project-icon" aria-hidden="true">↗</span>
      </div>
    </component>
  </article>
</template>
