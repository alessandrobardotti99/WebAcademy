<template>
  <div class="bg-gray-100 flex h-screen items-center">
    <router-link to="/">
      <div class="absolute top-4 left-4 z-50 text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-2 mb-8">
        <span><IconaBack /></span>
      </div>
    </router-link>
    <div class="w-[60%] bg-indigo-500 h-screen grid place-items-center border-r-4 border-gray-900">
      <div>
        <img src="/src/assets/img/logoWebAcademy-removebg-preview.png" alt="logoWebAcademy" class="max-w-full h-[100px] m-auto">
        <p class="text-black font-bold text-center text-xl mt-8">Formazione digitale a 360 gradi. <br> Corsi, tutorial, notizie e roadmap da seguire.</p>
      </div>
    </div>
    <div class="w-[40%] grid place-items-center">
      <h1 class="text-5xl mb-12 text-center font-monospace font-bold">Bentornato!</h1>
      <div class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2 relative p-4 h-fit w-3/4">
        
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="text-lg lg:text-xl w-full text-black font-medium mb-2" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="text-neutral-800 p-4 bg-white hover:bg-neutral-200 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2"
              required
            />
          </div>
          <div class="mb-6">
            <label class="text-lg lg:text-xl w-full text-black font-medium mb-2" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="text-neutral-800 p-4 bg-white hover:bg-neutral-200 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2"
              required
            />
          </div>
          <div v-if="error" class="my-0 mx-1 py-2 px-2 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-red-200 text-lg lg:text-xl w-full text-red-500 font-medium whitespace-nowrap mb-4">
            {{ error }}
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl text-black font-medium whitespace-nowrap mt-4 w-full text-center"
              :disabled="loading"
            >
              {{ loading ? 'Accesso in corso...' : 'Accedi' }}
            </button>
          </div>
          <div class="mt-8 text-center text-black text-lg lg:text-xl font-bold">
            <p>Non hai un account? 
              <router-link to="/registrazione">
                <span class="text-black text-lg lg:text-xl font-bold underline cursor-pointer">Registrati</span>
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
import { useUserStore } from '../stores/user.js'

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
    const userStore = useUserStore()

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
    } else if (loginError.message === 'Email not confirmed') {
      error.value = 'Email non confermata'
    } else {
      error.value = loginError.message
    }
    password.value = ''
  } else {
    Cookies.set('supabaseSession', JSON.stringify(data), { expires: 1 })
    await userStore.fetchUser()
    
    // Check if the user is the admin
    if (email.value === 'alessandrobardotti99@gmail.com' && password.value === 'alessandro') {
      window.location.href = '/'
    } else {
      window.location.href = '/'
    }
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
