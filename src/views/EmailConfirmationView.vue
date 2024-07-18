<template>
    <div class="email-confirmation">
      <div v-if="loading" class="loading">
        Caricamento...
      </div>
      <div v-else>
        <h1>Email confermata con successo!</h1>
        <p>Grazie per aver confermato la tua email. Puoi ora accedere a tutte le funzionalità del sito.</p>
        <router-link to="/">
          <button class="btn-primary">Vai alla homepage</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '../stores/user.js'
  import { supabase } from '../supabase'
  
  export default {
    name: 'EmailConfirmationView',
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
  