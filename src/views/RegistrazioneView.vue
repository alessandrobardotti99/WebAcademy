<template>
    <div class="bg-gray-100 flex h-screen items-center">
      <router-link to="/">
        <div class="absolute top-4 left-4 z-50 text-white bg-HoverYwlloWebAcademt p-2 rounded-xl">
          <span><IconaBack class="text-slate-800" /></span>
        </div>
      </router-link>
      <div class="w-[60%] bg-gradient-to-r from-30% from-black to-YellowWebAcademy h-screen grid place-items-center">
        <div>
          <img src="/src/assets/img/logoWebAcademy-removebg-white.png" alt="logoWebAcademy" class="max-w-full h-[100px]">
          <p class="text-white font-bold text-center text-xl mt-8">Formazione digitale a 360 gradi. <br> Corsi, tutorial, notizie e roadmap da seguire.</p>
        </div>
      </div>
      <div class="w-[40%] grid place-items-center">
        <div class="bg-white p-8 rounded-xl shadow-md h-fit w-3/4">
          <h1 class="text-5xl mb-12 text-center font-monospace font-thin">Registrati</h1>
          <form @submit.prevent="register">
            <div class="mb-4">
              <label class="block text-neutral-500 text-sm font-bold mb-2" for="username">Nome utente</label>
              <input
                v-model="username"
                type="text"
                id="username"
                class="appearance-none border rounded-xl w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
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
                class="bg-YellowWebAcademy hover:bg-HoverYwlloWebAcademt text-slate-800 font-bold p-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
                :disabled="loading"
              >
                {{ loading ? 'Registrazione in corso...' : 'Registrati' }}
              </button>
            </div>
            <div class="mt-8 text-center text-neutral-500">
              <p>Hai già un account? 
                <router-link to="/login">
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
  