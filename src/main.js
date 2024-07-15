import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import VuePlyr from 'vue-plyr'
import 'vue-toastification/dist/index.css'
import 'vue-plyr/dist/vue-plyr.css'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Toast)
app.use(router)
app.use(VuePlyr, {
  plyr: {}
})

app.mount('#app')
