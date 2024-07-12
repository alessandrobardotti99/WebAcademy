<template>
  <div class="bg-gray-100 flex h-screen items-center">
    <router-link to="/">
      <div class="absolute top-4 left-4 z-50 text-white bg-indigo-700 p-2 rounded-xl">
        <span><IconaBack /></span>
      </div>
    </router-link>
    <div class="w-[60%] bg-gradient-to-r from-30% from-black to-indigo-600 h-screen grid place-items-center">
      <div>
        <IconaStudio class="m-auto mb-8 size-28" />
        <img src="/src/assets/img/logoWebAcademy-removebg-white.png" alt="logoWebAcademy" class="max-w-full h-[100px] m-auto">
        <p class="text-white font-bold text-center text-xl mt-8">Formazione digitale a 360 gradi. <br> Corsi, tutorial, notizie e roadmap da seguire.</p>
      </div>
    </div>
    <div class="w-[40%] grid place-items-center">
      <div class="bg-white p-8 rounded-xl shadow-md h-fit w-3/4">
        <h1 class="text-5xl mb-12 text-center font-monospace font-thin">Bentornato!</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-neutral-500 text-sm font-bold mb-2" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-neutral-500 text-sm font-bold mb-2" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div v-if="error" class="text-red-500 text-sm mt-4 bg-red-100 p-4 rounded-xl text-center border-red-500 border mb-4">
            {{ error }}
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-500 text-white font-bold p-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
              :disabled="loading"
            >
              {{ loading ? 'Accesso in corso...' : 'Accedi' }}
            </button>
          </div>
          <div class="mt-8 text-center text-neutral-500">
            <p>Non hai un account? 
              <router-link to="/registrazione">
                <span class="text-neutral-800 font-bold underline cursor-pointer">Registrati</span>
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'
import IconaBack from '../components/icons/IconaBack.vue'
import IconaStudio from '@/components/icons/IconaStudio.vue'

export default {
  name: 'LoginView',
  components: {
    IconaBack,
    IconaStudio
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const loading = ref(false)

    const login = async () => {
      error.value = null
      loading.value = true
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      loading.value = false
      if (loginError) {
        if (loginError.message === 'Invalid login credentials') {
          error.value = 'Credenziali di accesso non valide'
        } else {
          error.value = loginError.message
        }
        password.value = ''
      } else {
        const { access_token, refresh_token, expires_at, user } = data.session
        const session = { access_token, refresh_token, expires_at, user }
        Cookies.set('supabaseSession', JSON.stringify(session), { expires: 1 })
        window.location.href = '/'
      }
    }

    return {
      email,
      password,
      error,
      loading,
      login
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
</style>
