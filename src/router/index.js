import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegistrazioneView from "../views/RegistrazioneView.vue";
import CorsiView from "../views/CorsiView.vue";
import CourseDetail from "../views/CorsiDettaglioView.vue";
import CartView from "../views/CarrelloView.vue";
import ProfiloView from "@/views/ProfiloView.vue";
import FaqView from "@/views/FaqView.vue";
import EsercitazioniView from "../views/EsercitazioniView.vue";
import HtmlExercisesView from "../views/HtmlExercisesView.vue";
import CssExerciseView from '../views/CsslExercisesView.vue'
import JsExercisesView from "../views/JsExercisesView.vue";
import ReturnPaymentCancelView from "../views/ReturnPaymentCancelView.vue";
import ReturnPaymentSuccessView from "../views/ReturnPaymentSuccessView.vue";
import RegistrazioneEffettuataMail from "../views/RegistrazioneEffettuataMail.vue";
import EmailConfirmationView from "../views/EmailConfirmationView.vue";
import VideoView from "../views/VideoView.vue";
import { supabase } from '../supabase';
import Cookies from 'js-cookie';
import { useUserStore } from '../stores/user.js'

const routes = [
  { path: "/", 
    name: "home", 
    component: HomeView
   },
  { path: "/accedi", 
    name: "accedi", 
    component: LoginView },
  {
    path: "/profilo",
    name: "profilo",
    component: ProfiloView,
    meta: { requiresAuth: true },
  },
  {
    path: "/registrazione",
    name: "registrazione",
    component: RegistrazioneView,
  },
  {
    path: "/registrazione-effettuata",
    name: "registrazione-effettuata",
    component: RegistrazioneEffettuataMail,
  },
  { path: "/corsi", 
    name: "corsi", 
    component: CorsiView },
  {
    path: "/corsi/:id",
    name: "CourseDetail",
    component: CourseDetail,
    props: true,
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
  },
  {
    path: "/carrello",
    name: "carrello",
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: "/esercitazioni",
    name: "esercitazioni",
    component: EsercitazioniView,
    meta: { requiresAuth: true },
  },
  {
    path: "/esercitazioni/html",
    name: "esercitazioni-html",
    component: HtmlExercisesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/esercitazioni/html/:exerciseId",
    name: "esercitazioni-html",
    component: HtmlExercisesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/esercitazioni/css/:exerciseId",
    name: "esercitazioni-css",
    component: CssExerciseView,
    meta: { requiresAuth: true },
  },
  {
    path: "/esercitazioni/javascript/:exerciseId",
    name: "esercitazioni-js",
    component: JsExercisesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/video/:courseId/:id',
    name: 'VideoView',
    component: VideoView,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/ordine-completato',
    name: 'OrderCompleted',
    component: ReturnPaymentSuccessView,
    meta: { requiresAuth: true },
  },
  {
    path: '/ordine-fallito',
    name: 'OrderFailed',
    component: ReturnPaymentCancelView,
    meta: { requiresAuth: true },
  },
  {
    path: '/email-confermata',
    name: 'email-confermata',
    component: EmailConfirmationView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore()

  if (requiresAuth) {
    await userStore.loadSessionFromCookies()
    const session = Cookies.get('supabaseSession')
    if (!session || !userStore.user) {
      next({ name: 'accedi' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
