import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import './palette.css'
import './design.css'
import './personal.css'
import './project-collage.css'
import './home-slider.css'
import './motion.css'
import './expressive.css'
import './about.css'
import './contact.css'

router.afterEach(to => {
  const label = to.path.startsWith('/progetto/') ? 'Progetto' : to.path.startsWith('/categoria/') ? 'Categoria' : 'Portfolio'
  document.title = `${label} — Sara Temponi`
})
const app = createApp(App).use(router)
router.isReady().then(() => app.mount('#app'))
