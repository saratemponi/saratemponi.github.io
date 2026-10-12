# Sara Temponi — Portfolio

Portfolio personale in Vue 3 e Vite, indipendente da Adobe. Comprende le categorie, 21 progetti, About me e Contatti.

## Modificare il portfolio

Aprire questa cartella in Visual Studio Code. Dal terminale:

```sh
npm install
npm run dev
```

- `src/data/projects.json`: descrizioni, crediti, immagini e PDF dei progetti.
- `src/data/categories.json`: categorie e copertine.
- `src/views/AboutView.vue`: presentazione personale e percorso.
- `src/views/ContactView.vue`: contatti e curriculum.
- `src/palette.css`: colori.
- `src/expressive.css`, `src/about.css`, `src/contact.css`: composizione delle pagine.
- `public/assets/`: immagini, font e PDF usati dal sito.
- `public/assets/pdf/curriculum-sara-temponi.pdf`: curriculum scaricabile.

## Pubblicazione su GitHub Pages

Questa configurazione è predisposta per il repository `saratemponi.github.io`, con il sito all’indirizzo `https://saratemponi.github.io/` dopo l’attivazione.

In GitHub, aprire **Settings → Pages**, quindi scegliere **GitHub Actions** come sorgente. Il workflow `.github/workflows/deploy.yml` genera il sito e controlla le pagine e le immagini prima di pubblicarlo.

Dopo l’attivazione, ogni caricamento di modifiche nel ramo `main` aggiorna automaticamente il sito. Il codice e i materiali presenti in questo repository sono pubblici; l’archivio dei lavori e le versioni precedenti restano nelle cartelle locali.

## Verifica locale

```sh
npm run build
node scripts/check-pages.mjs
npm run preview
```

`dist/` viene rigenerata dalla build e non va modificata a mano. I collegamenti delle pagine Vue usano URL hash, compatibili con GitHub Pages.
