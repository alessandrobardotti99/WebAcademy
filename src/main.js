import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Toast)
app.use(router)
app.mount('#app')
