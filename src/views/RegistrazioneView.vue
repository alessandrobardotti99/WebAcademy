<template>
    <div class="bg-gray-100 flex h-screen items-center">
      <router-link to="/">
        <div class="absolute top-4 left-4 z-50 text-black bg-YellowWebAcademy my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-2 mb-8">
          <span><IconaBack class="text-slate-800" /></span>
        </div>
      </router-link>
      <div class="w-[60%] bg-YellowWebAcademy h-screen grid place-items-center border-r-4 border-gray-900">
        <div>
          <img src="/src/assets/img/logoWebAcademy-removebg-preview.png" alt="logoWebAcademy" class="max-w-full h-[100px]">
          <p class="text-black font-bold text-center text-xl mt-8">Formazione digitale a 360 gradi. <br> Corsi, tutorial, notizie e roadmap da seguire.</p>
        </div>
      </div>
      <div class="w-[40%] grid place-items-center">
        <div class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2   relative p-4 h-fit w-3/4">
          <h1 class="text-5xl mb-12 text-center font-monospace font-thin">Registrati</h1>
          <form @submit.prevent="register">
            <div class="mb-4">
              <label class="text-lg lg:text-xl w-full text-black font-medium mb-2" for="username">Nome utente</label>
              <input
                v-model="username"
                type="text"
                id="username"
                class="text-neutral-800 p-4 bg-white hover:bg-neutral-200 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2"
                required
              />
            </div>
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
                class="my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl text-black font-medium whitespace-nowrap mt-2 w-full text-center"
                :disabled="loading"
              >
                {{ loading ? 'Registrazione in corso...' : 'Registrati' }}
              </button>
            </div>
            <hr class="">
            <div class="mt-8 text-center text-black text-lg lg:text-xl font-bold">
              <p>Hai già un account? 
                <router-link to="/accedi">
                <span class="text-neutral-800 font-bold underline cursor-pointer">Accedi</span>
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
  
  export default {
    name: 'RegisterView',
    components: {
      IconaBack
    },
    setup() {
      const username = ref('')
      const email = ref('')
      const password = ref('')
      const error = ref(null)
      const loading = ref(false)
  
      const register = async () => {
        error.value = null
        loading.value = true
        const { user, error: registerError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        }, {
          data: { 
            username: username.value,
            email: email.value
          }
        })
        loading.value = false
        if (registerError) {
          error.value = registerError.message
          password.value = '' // Reset password value
        } else {
          Cookies.set('supabaseSession', JSON.stringify(user), { expires: 1 })
          window.location.href = '/'
        }
      }
  
      return {
        username,
        email,
        password,
        error,
        loading,
        register
      }
    }
  }
  </script>
  
  <style scoped>
  .font-monospace {
    font-family: monospace;
  }
  </style>
  