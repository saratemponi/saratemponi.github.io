<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({ categories: { type: Array, required: true } })
const shell = ref(null)
const panel = ref(null)
const selectors = ref(null)
const activeIndex = ref(0)
const slidePosition = ref(0)
const scrollLinked = ref(false)
const shellHeight = ref(0)
const stickyTop = ref(0)
const activeCategory = computed(() => props.categories[activeIndex.value])
const shellStyle = computed(() => scrollLinked.value ? { height: `${shellHeight.value}px`, '--slider-sticky-top': `${stickyTop.value}px` } : undefined)
let scrollStart = 0
let scrollDistance = 0
let scrollFrame = 0
let measureFrame = 0
let resizeObserver
let motionPreference
let gesture = null
let ignoreClick = false

function setPosition(position) {
  slidePosition.value = Math.max(0, Math.min(position, props.categories.length - 1))
  const index = Math.round(slidePosition.value)
  if (index === activeIndex.value) return
  activeIndex.value = index
  const list = selectors.value
  const button = list?.children[index]
  if (button && list.scrollWidth > list.clientWidth) {
    list.scrollTo({ left: list.scrollLeft + button.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - button.offsetWidth) / 2, behavior: 'auto' })
  }
}

function updateFromScroll() {
  scrollFrame = 0
  if (!scrollLinked.value || !scrollDistance) return
  setPosition((window.scrollY - scrollStart) / scrollDistance * (props.categories.length - 1))
}

function scheduleScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFromScroll)
}

function measure() {
  measureFrame = 0
  if (!shell.value || !panel.value) return
  const header = document.querySelector('.header')
  const headerHeight = header?.getBoundingClientRect().height || 0
  const headerTop = header ? parseFloat(getComputedStyle(header).top) || 0 : 0
  const top = Math.ceil(headerHeight + headerTop + 12)
  const height = Math.ceil(panel.value.getBoundingClientRect().height)
  const fits = height <= window.innerHeight - top - 16
  const enabled = props.categories.length > 1 && !motionPreference.matches && fits
  stickyTop.value = top
  scrollDistance = (props.categories.length - 1) * Math.max(360, Math.min(640, window.innerHeight * .7))
  shellHeight.value = height + scrollDistance
  scrollStart = shell.value.getBoundingClientRect().top + window.scrollY - top
  scrollLinked.value = enabled
  if (enabled) updateFromScroll()
  else setPosition(activeIndex.value)
}

function scheduleMeasure() {
  if (!measureFrame) measureFrame = requestAnimationFrame(measure)
}

function select(index) {
  const target = Math.max(0, Math.min(index, props.categories.length - 1))
  if (scrollLinked.value) {
    window.scrollTo({ top: scrollStart + target / (props.categories.length - 1) * scrollDistance, behavior: 'smooth' })
  } else setPosition(target)
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  window.addEventListener('scroll', scheduleScroll, { passive: true })
  window.addEventListener('resize', scheduleMeasure, { passive: true })
  motionPreference.addEventListener('change', scheduleMeasure)
  resizeObserver = new ResizeObserver(scheduleMeasure)
  resizeObserver.observe(panel.value)
  const header = document.querySelector('.header')
  if (header) resizeObserver.observe(header)
  measure()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleScroll)
  window.removeEventListener('resize', scheduleMeasure)
  motionPreference?.removeEventListener('change', scheduleMeasure)
  resizeObserver?.disconnect()
  cancelAnimationFrame(scrollFrame)
  cancelAnimationFrame(measureFrame)
})

function onKeydown(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key === 'ArrowRight') select(activeIndex.value + 1)
  else if (event.key === 'ArrowLeft') select(activeIndex.value - 1)
  else if (event.key === 'Home') select(0)
  else if (event.key === 'End') select(props.categories.length - 1)
  else return
  event.preventDefault()
}

function startGesture(event) {
  ignoreClick = false
  if (event.button !== 0) return
  gesture = { x: event.clientX, y: event.clientY, id: event.pointerId }
}

function endGesture(event) {
  if (!gesture || gesture.id !== event.pointerId) return
  const dx = event.clientX - gesture.x
  const dy = event.clientY - gesture.y
  gesture = null
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.3) return
  ignoreClick = true
  select(activeIndex.value + (dx < 0 ? 1 : -1))
}

function stopSwipeClick(event) {
  if (!ignoreClick || event.detail === 0) return
  event.preventDefault()
  event.stopPropagation()
  ignoreClick = false
}
</script>

<template>
  <div
    v-if="activeCategory"
    ref="shell"
    class="category-slider-shell"
    :class="{ 'is-scroll-linked': scrollLinked }"
    :style="shellStyle"
  >
  <div
    ref="panel"
    class="category-slider"
    role="region"
    aria-roledescription="carosello"
    aria-label="Esplora le categorie dei lavori"
    :style="{ '--slide-color': activeCategory.panelColor, '--slide-ink': activeCategory.panelInk }"
    @keydown="onKeydown"
  >
    <p class="category-slider-hint"><span aria-hidden="true">{{ scrollLinked ? '↓' : '↔' }}</span>{{ scrollLinked ? 'Scorri per esplorare le categorie' : 'Esplora le categorie con le frecce' }}</p>
    <div
      id="home-category-slides"
      class="category-slider-window"
      @pointerdown="startGesture"
      @pointerup="endGesture"
      @pointercancel="gesture = null"
      @pointerleave="gesture = null"
      @dragstart.prevent
      @click.capture="stopSwipeClick"
    >
      <div class="category-slider-track" :style="{ transform: `translateX(-${slidePosition * 100}%)` }">
        <article
          v-for="(category, index) in categories"
          :key="category.id"
          class="category-slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} di ${categories.length}: ${category.title}`"
          :aria-hidden="index !== activeIndex"
          :inert="index !== activeIndex"
          :style="{ '--slide-color': category.panelColor, '--slide-ink': category.panelInk }"
        >
          <RouterLink :to="`/categoria/${category.id}`" class="category-slide-link" :aria-label="`Esplora ${category.title}`">
            <div class="category-slide-image">
              <img :src="category.image" :alt="category.title" width="1200" height="900" :loading="index === 0 ? 'eager' : 'lazy'" draggable="false">
            </div>
            <div class="category-slide-copy">
              <span class="category-slide-number" aria-hidden="true">{{ category.number }}</span>
              <div><p class="category-slide-meta">{{ category.category }}</p><h3><span v-for="line in category.displayTitle || [category.title]" :key="line">{{ line }}</span></h3><p class="category-slide-description">{{ category.description }}</p></div>
              <span class="category-slide-cta">Esplora i progetti <span aria-hidden="true">↗</span></span>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>

    <div class="category-slider-toolbar">
      <p class="category-slider-status" role="status" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">{{ activeCategory.number }} <span class="category-slider-total">/ {{ String(categories.length).padStart(2, '0') }}</span></span>
        <span class="sr-only">{{ activeCategory.title }}, categoria {{ activeIndex + 1 }} di {{ categories.length }}.</span>
      </p>
      <div class="category-slider-arrows">
        <button type="button" class="category-slider-arrow" aria-label="Categoria precedente" aria-controls="home-category-slides" :disabled="activeIndex === 0" @click="select(activeIndex - 1)"><span aria-hidden="true">←</span></button>
        <button type="button" class="category-slider-arrow" aria-label="Categoria successiva" aria-controls="home-category-slides" :disabled="activeIndex === categories.length - 1" @click="select(activeIndex + 1)"><span aria-hidden="true">→</span></button>
      </div>
    </div>
    <div ref="selectors" class="category-slider-selectors" role="group" aria-label="Scegli una categoria">
      <button v-for="(category, index) in categories" :key="category.id" type="button" class="category-slider-selector" :class="{ 'is-active': index === activeIndex }" :aria-pressed="index === activeIndex" aria-controls="home-category-slides" @click="select(index)">
        <span class="category-selector-number" aria-hidden="true">{{ category.number }}</span><span>{{ category.title }}</span>
      </button>
    </div>
  </div>
  </div>
</template>
