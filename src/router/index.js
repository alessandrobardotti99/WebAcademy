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
import CssExerciseView from "../views/CsslExercisesView.vue";
import JsExercisesView from "../views/JsExercisesView.vue";
import ReturnPaymentCancelView from "../views/ReturnPaymentCancelView.vue";
import ReturnPaymentSuccessView from "../views/ReturnPaymentSuccessView.vue";
import RegistrazioneEffettuataMail from "../views/RegistrazioneEffettuataMail.vue";
import EmailConfirmationView from "../views/EmailConfirmationView.vue";
import VideoView from "../views/VideoView.vue";
import { supabase } from "../supabase";
import Cookies from "js-cookie";
import { useUserStore } from "../stores/user.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home - Web Academy" },
  },
  {
    path: "/accedi",
    name: "accedi",
    component: LoginView,
    meta: { title: "Accedi - Web Academy" },
  },
  {
    path: "/profilo",
    name: "profilo",
    component: ProfiloView,
    meta: { requiresAuth: true, title: "Profilo - Web Academy" },
  },
  {
    path: "/registrazione",
    name: "registrazione",
    component: RegistrazioneView,
    meta: { title: "Registrazione - Web Academy" },
  },
  {
    path: "/registrazione-effettuata",
    name: "registrazione-effettuata",
    component: RegistrazioneEffettuataMail,
    meta: { title: "Registrazione Effettuata - Web Academy" },
  },
  {
    path: "/corsi",
    name: "corsi",
    component: CorsiView,
    meta: { title: "Corsi - Web Academy" },
  },
  {
    path: "/corsi/:id",
    name: "CourseDetail",
    component: CourseDetail,
    props: true,
    meta: { title: "Dettaglio Corso - Web Academy" },
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
    meta: { title: "FAQ - Web Academy" },
  },
  {
    path: "/carrello",
    name: "carrello",
    component: CartView,
    meta: { requiresAuth: true, title: "Carrello - Web Academy" },
  },
  {
    path: "/esercitazioni",
    name: "esercitazioni",
    component: EsercitazioniView,
    meta: { requiresAuth: true, title: "Esercitazioni - Web Academy" },
  },
  {
    path: "/esercitazioni/html",
    name: "esercitazioni-html",
    component: HtmlExercisesView,
    meta: { requiresAuth: true, title: "Esercitazioni HTML - Web Academy" },
  },
  {
    path: "/esercitazioni/html/:exerciseId",
    name: "esercitazioni-html",
    component: HtmlExercisesView,
    meta: { requiresAuth: true, title: "Esercitazioni HTML - Web Academy" },
  },
  {
    path: "/esercitazioni/css/:exerciseId",
    name: "esercitazioni-css",
    component: CssExerciseView,
    meta: { requiresAuth: true, title: "Esercitazioni CSS - Web Academy" },
  },
  {
    path: "/esercitazioni/javascript/:exerciseId",
    name: "esercitazioni-js",
    component: JsExercisesView,
    meta: {
      requiresAuth: true,
      title: "Esercitazioni JavaScript - Web Academy",
    },
  },
  {
    path: "/video/:courseId/:id",
    name: "VideoView",
    component: VideoView,
    meta: { requiresAuth: true, title: "Video - Web Academy" },
    props: true,
  },
  {
    path: "/ordine-completato",
    name: "OrderCompleted",
    component: ReturnPaymentSuccessView,
    meta: { requiresAuth: true, title: "Ordine Completato - Web Academy" },
  },
  {
    path: "/ordine-fallito",
    name: "OrderFailed",
    component: ReturnPaymentCancelView,
    meta: { requiresAuth: true, title: "Ordine Fallito - Web Academy" },
  },
  {
    path: "/email-confermata",
    name: "email-confermata",
    component: EmailConfirmationView,
    meta: { title: "Email Confermata - Web Academy" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userStore = useUserStore();

  if (requiresAuth) {
    await userStore.loadSessionFromCookies();
    const session = Cookies.get("supabaseSession");
    if (!session || !userStore.user) {
      next({ name: "accedi" });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Web Academy"; // Default title
  }
});

export default router;
