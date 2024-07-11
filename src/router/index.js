import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrazioneView from '../views/RegistrazioneView.vue'
import CorsiView from '../views/CorsiView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/accedi', name: 'accedi', component: LoginView },
  { path: '/registrazione', name: 'registrazione', component: RegistrazioneView },
  { path: '/corsi', name: 'corsi', component: CorsiView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
