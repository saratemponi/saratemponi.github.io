import HomeView from './views/HomeView.vue'
import CategoryView from './views/CategoryView.vue'
import ProjectView from './views/ProjectView.vue'
import AboutView from './views/AboutView.vue'
import AboutDetailView from './views/AboutDetailView.vue'
import ContactView from './views/ContactView.vue'
import aboutSections from './data/about-sections.json'
import NotFoundView from './views/NotFoundView.vue'
import categories from './data/categories.json'
import projects from './data/projects.json'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/categoria/:id', component: CategoryView, beforeEnter: to => categories.some(item => item.id === to.params.id) || '/non-trovato' },
  { path: '/progetto/:id', component: ProjectView, beforeEnter: to => projects.some(item => item.id === to.params.id) || '/non-trovato' },
  { path: '/about-me', component: AboutView },
  { path: '/about-me/:id', component: AboutDetailView, beforeEnter: to => aboutSections.some(item => item.id === to.params.id) || '/non-trovato' },
  { path: '/contact', component: ContactView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

