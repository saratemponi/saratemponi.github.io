<script setup>
import { onBeforeUnmount, ref } from 'vue'

const email = 'sara.temponii@gmail.com'
const copied = ref(false)
const copyFailed = ref(false)
let resetTimer
async function copyEmail() {
  copyFailed.value = false
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 3500)
  } catch {
    copied.value = false
    copyFailed.value = true
    document.getElementById('contact-email').focus()
  }
}
onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <article class="contact-redesign">
    <RouterLink class="back-link back-link-top" to="/">← Torna ai lavori</RouterLink>
    <section class="contact-conversation" aria-labelledby="contact-title">
      <div class="contact-conversation-copy">
        <div class="contact-conversation-heading">
          <p class="eyebrow">CONTACT · FACCIAMO DUE PAROLE</p>
          <h1 id="contact-title" tabindex="-1">Partiamo <br><em>da un ciao.</em></h1>
        </div>
        <div class="contact-conversation-details">
          <p class="contact-new-lead">Un’idea, un progetto<br>o semplicemente due parole.</p>
          <p>Mi piace progettare identità, pagine e immagini. Se vuoi conoscermi meglio, parlare di un progetto o scambiare due idee, mi farà piacere leggerti.</p>
          <div class="contact-interests" aria-label="I miei interessi progettuali"><span>Graphic design</span><span>Branding</span><span>Editorial</span><span>Digital</span></div>
          <a class="contact-cv-link pill-button" href="/assets/pdf/curriculum-sara-temponi.pdf" download="Sara-Temponi-Curriculum.pdf" type="application/pdf">Scarica il CV <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="contact-postcard">
        <div class="contact-postcard-header"><span>UN MESSAGGIO PER SARA</span><svg class="contact-stamp" aria-hidden="true" viewBox="0 0 80 80"><rect x="2" y="2" width="76" height="76" rx="12" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 5" /><path d="M40 18v44M18 40h44M24 24l32 32M24 56l32-32" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" /></svg></div>
        <p class="contact-postcard-label">Puoi scrivermi qui</p>
        <a id="contact-email" class="contact-address" :href="`mailto:${email}`">{{ email }} <span aria-hidden="true">↗</span></a>
        <p class="contact-postcard-help">Clicca sull’indirizzo per aprire la tua email,<br>oppure copialo e scrivimi quando vuoi.</p>
        <button class="contact-copy-button" type="button" @click="copyEmail">{{ copied ? 'Indirizzo copiato ✓' : 'Copia indirizzo email' }} <span v-if="!copied" aria-hidden="true">↗</span></button>
        <p class="contact-copy-status" role="status">{{ copied ? 'Indirizzo email copiato.' : copyFailed ? 'Non riesco a copiarlo automaticamente. Puoi selezionare l’indirizzo qui sopra.' : '' }}</p>
        <span class="contact-postcard-note">Le idee iniziano<br>con una conversazione.</span>
      </div>
    </section>
    <nav class="contact-discover" aria-label="Continua a esplorare"><RouterLink to="/about-me"><span>OLTRE I PROGETTI</span><strong>Conoscimi meglio <em aria-hidden="true">↗</em></strong></RouterLink><RouterLink to="/"><span>IL MIO MONDO VISIVO</span><strong>Esplora i lavori <em aria-hidden="true">↗</em></strong></RouterLink></nav>
  </article>
</template>
