<script setup>
import sections from '../data/about-sections.json'

const portrait = sections.find(section => section.id === 'who-i-am').gallery[0].src
const inspiration = sections.find(section => section.id === 'inspiration-everyday-life')
const approach = sections.find(section => section.id === 'approach-to-design')
const moodImages = [
  { src: inspiration.gallery[0].src, alt: 'Libri aperti, pagine e parole' },
  { src: inspiration.gallery[1].src, alt: 'Cuffie appoggiate su una collezione di vinili' },
  { src: inspiration.gallery[4].src, alt: 'Cuffie e una canzone, nella luce del sole' },
  { src: inspiration.gallery[5].src, alt: 'La luna fra le nuvole in un cielo notturno' },
  { src: inspiration.gallery[3].src, alt: 'Un cielo stellato fra le sagome degli alberi' },
  { src: inspiration.gallery[6].src, alt: 'La luce del sole attraverso una tenda, fra libri e piccoli oggetti' },
]
const milestones = [
  { date: '2023 — 2027', title: 'Graphic Design e Multimedia', context: 'LABA', text: 'Il mio percorso di studio, con laurea prevista per febbraio 2027. Qui approfondisco design editoriale, branding, web design e fotografia.' },
  { date: '3 luglio 2026 — 4 settembre 2026', title: 'Dallo studio alla pratica', context: 'BOWagency', text: 'Durante il tirocinio in agenzia ho lavorato alla progettazione e all’impaginazione di materiali di comunicazione, tra manuali di identità visiva e template per i social. Un’occasione per mettere in pratica ciò che ho imparato e confrontarmi con il lavoro quotidiano di uno studio creativo.' },
  { date: 'DAL 2025', title: 'Un’esperienza che mi accompagna', context: 'Cooperativa Sociale', text: 'Accanto alla formazione nel design, porto avanti un’esperienza lavorativa all’interno di una Cooperativa Sociale.' },
]
const everydayTools = ['Photoshop', 'Illustrator', 'InDesign', 'Lightroom']
const learningTools = ['Figma', 'Framer']
const process = [
  { title: 'Raccogliere', text: 'Parto dal concept e dalla ricerca: immagini, riferimenti e atmosfere.' },
  { title: 'Dare forma', text: 'Cerco connessioni fra le idee, lavorando su tipografia, immagini e composizione.' },
  { title: 'Curare i dettagli', text: 'Ritorno sul progetto finché riesce a trasmettere la sensazione da cui sono partita.' },
]
</script>

<template>
  <article class="about-narrative">
    <section class="about-introduction" aria-labelledby="about-title">
      <div class="about-introduction-copy">
        <p class="eyebrow">ABOUT ME · SARA TEMPONI</p>
        <h1 id="about-title" tabindex="-1">Piacere, <br><em>Sara.</em></h1>
        <p class="about-lead">Mi piace dare forma<br>alle idee e alle atmosfere.</p>
        <p>Sono Sara Temponi, studentessa di Graphic Design e Multimedia alla LABA. Mi interessano il branding, il design editoriale e i progetti digitali: modi diversi di trasformare un’idea in qualcosa da guardare, leggere o esplorare.</p>
        <p>Sono tranquilla e osservatrice. Mi piace ascoltare, immaginare e trovare nei dettagli quotidiani uno spunto da portare nei miei progetti.</p>
      </div>
      <figure class="about-portrait">
        <span class="about-portrait-tag">Graphic designer in formazione</span>
        <img :src="portrait" alt="Sara Temponi" width="1920" height="1787" fetchpriority="high">
        <svg class="about-spark" aria-hidden="true" viewBox="0 0 80 80"><path d="M40 8v64M8 40h64M17 17l46 46M17 63l46-46" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" /></svg>
        <figcaption>curiosa, osservatrice<br>&amp; un po’ sognatrice.</figcaption>
      </figure>
    </section>

    <section class="about-inspiration" aria-labelledby="inspiration-title">
      <div class="about-inspiration-copy">
        <p class="eyebrow">IL MIO PICCOLO MONDO</p>
        <h2 id="inspiration-title">Le cose che <br>mi <em>ispirano.</em></h2>
        <p>Amo leggere, ascoltare musica e perdermi nei miei pensieri. Nei libri immagino luoghi e personaggi; la musica mi aiuta a concentrarmi e a costruire atmosfere.</p>
        <p>Mi piacciono la fotografia, la pittura e i paesaggi che sanno raccontare una sensazione. La notte ha un posto speciale: tutto rallenta e i dettagli diventano più presenti.</p>
        <p>Libri, vinili, cuffie e una tazza di tè sono piccoli spazi in cui ritrovare calma, ispirazione e familiarità.</p>
        <span class="about-margin-note">Le idee iniziano anche qui.</span>
      </div>
      <div class="about-moodboard" aria-label="Immagini del mio immaginario">
        <figure v-for="image in moodImages" :key="image.src" class="about-mood-image">
          <img :src="image.src" :alt="image.alt" loading="lazy">
        </figure>
      </div>
    </section>

    <section class="about-approach" aria-labelledby="approach-title">
      <figure class="about-approach-photo">
        <img :src="approach.gallery[0].src" alt="Sara in controluce, davanti a un lago" width="3840" height="2560" loading="lazy">
        <figcaption>Atmosfere, prima di tutto.</figcaption>
      </figure>
      <div class="about-approach-copy">
        <p class="eyebrow">COME MI AVVICINO AL DESIGN</p>
        <h2 id="approach-title">Dalle idee <br><em>alle immagini.</em></h2>
        <p>Sono attratta dalle fotografie analogiche, dal bianco e nero e dalle composizioni essenziali. Nei miei progetti cerco un equilibrio fra atmosfera, chiarezza e dettagli.</p>
        <ol class="about-process"><li v-for="step in process" :key="step.title"><h3>{{ step.title }}</h3><p>{{ step.text }}</p></li></ol>
      </div>
      <p class="about-design-note">Cerco sempre di lasciare<br><em>una piccola parte di me</em><br>in quello che creo.</p>
    </section>

    <section class="about-journey" aria-labelledby="journey-title">
      <div class="about-section-heading">
        <div><p class="eyebrow">UN PASSO ALLA VOLTA</p><h2 id="journey-title">Il mio <br><em>percorso.</em></h2></div>
        <p>Il mio percorso nel design è ancora agli inizi. Mi interessano soprattutto il branding e l’editoriale, ma mi piace anche sperimentare con immagini ed esperienze digitali.</p>
      </div>
      <ol class="about-timeline">
        <li v-for="milestone in milestones" :key="milestone.title">
          <span class="about-timeline-date">{{ milestone.date }}</span>
          <div><p class="about-timeline-context">{{ milestone.context }}</p><h3>{{ milestone.title }}</h3></div>
          <p class="about-timeline-text">{{ milestone.text }}</p>
        </li>
      </ol>
      <div class="about-toolbox">
        <div><p class="eyebrow">CON COSA LAVORO</p><ul><li v-for="tool in everydayTools" :key="tool">{{ tool }}</li></ul></div>
        <div><p class="eyebrow">STO APPROFONDENDO</p><ul><li v-for="tool in learningTools" :key="tool">{{ tool }}</li></ul></div>
      </div>
      <p class="about-future">Mi piacerebbe crescere in uno studio creativo, continuando a imparare e a progettare insieme ad altre persone.</p>
      <a class="about-cv-link pill-button" href="/assets/pdf/curriculum-sara-temponi.pdf" download="Sara-Temponi-Curriculum.pdf" type="application/pdf">Scarica il CV <span aria-hidden="true">↓</span></a>
    </section>

    <section class="about-closing" aria-labelledby="about-closing-title">
      <div><p class="eyebrow">DALLE PAROLE AI PROGETTI</p><h2 id="about-closing-title">Ora sai un po’ <br><em>di me.</em></h2></div>
      <div class="about-closing-actions"><RouterLink class="pill-button" to="/">Esplora i lavori <span aria-hidden="true">↗</span></RouterLink><RouterLink class="about-contact-link" to="/contact">Parliamone <span aria-hidden="true">↗</span></RouterLink></div>
    </section>
  </article>
</template>
