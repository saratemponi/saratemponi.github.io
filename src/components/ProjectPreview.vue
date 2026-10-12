<script setup>
import { nextTick, ref } from 'vue'

const dialog = ref(null)
const project = ref(null)

async function open(selectedProject) {
  project.value = selectedProject
  await nextTick()
  dialog.value.showModal()
}

function closeOnBackdrop(event) {
  if (event.target !== dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    dialog.value.close()
  }
}

function close() { dialog.value?.close() }

defineExpose({ open, close })
</script>

<template>
  <dialog ref="dialog" class="preview" aria-labelledby="preview-title" @click="closeOnBackdrop">
    <template v-if="project">
      <div class="preview-bar">
        <h2 id="preview-title">{{ project.title }}</h2>
        <button type="button" class="close" aria-label="Chiudi anteprima" autofocus @click="dialog.close()">
          Chiudi ×
        </button>
      </div>
      <img :src="project.image" :alt="project.alt || project.title">
      <p v-if="project.description">{{ project.description }}</p>
    </template>
  </dialog>
</template>
