<template>
  <Nav />
    <div class="email-confirmation overflow-hidden">
      <div v-if="loading" class="loading">
        Caricamento...
      </div>
      <div v-else>
        <div class="h-screen grid place-items-center">
        <div>
          <EmailConfermata class="m-auto mb-16" />
        <h1 class="text-center font-monospace text-[4rem] font-bold">Email confermata con successo!</h1>
        <p class="mt-4 text-center text-black leading-8 font-semibold text-xl">Grazie per aver confermato la tua email. Puoi ora accedere a tutte le funzionalità del sito.</p>
        <div class="text-center">
                <router-link to="/">
                    <button
                        class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap mt-8">Torna
                        alla home</button>
                </router-link>
            </div>
      </div>
    </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '../stores/user.js'
  import { supabase } from '../supabase'
  import Nav from '../components/NavCorsi.vue'
  import EmailConfermata from '../components/icons/IconaMailConfermata.vue'
  
  export default {
    name: 'EmailConfirmationView',
    components: {
      Nav,
      EmailConfermata
    },
    setup() {
      const loading = ref(true)
      const userStore = useUserStore()
  
      onMounted(async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search)
          const email = urlParams.get('email')
          const token = urlParams.get('token')
  
          if (!email || !token) {
            throw new Error('Email o token mancante')
          }
  
          const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup'
          })
  
          if (error) {
            console.error('Errore durante la verifica dell\'email:', error)
            loading.value = false
            return
          }
  
          await userStore.setSession(data.session)
          await userStore.fetchUser() // Fetch the user after email verification
          loading.value = false
        } catch (error) {
          console.error('Errore durante la conferma dell\'email:', error)
          loading.value = false
        }
      })
  
      return {
        loading
      }
    }
  }
  </script>
  
  <style scoped>
  .loading {
    text-align: center;
    margin-top: 2rem;
  }
  .btn-primary {
    background-color: #4CAF50; 
    color: white; 
    padding: 14px 20px; 
    margin: 8px 0; 
    border: none; 
    cursor: pointer;
    width: 100%;
  }
  .btn-primary:hover {
    opacity: 0.8;
  }
  </style>
  