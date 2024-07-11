<template>
    <div class="bg-gray-100 min-h-screen">
      <Nav />
      <div class="max-w-4xl mx-auto p-8">
        <h1 class="text-4xl font-bold mb-6">Profilo Utente</h1>
        <div class="flex">
          <!-- Sidebar for Tabs -->
          <div class="w-1/4 mr-4">
            <ul class="tabs">
              <li :class="{'active-tab': activeTab === 'info'}" @click="activeTab = 'info'">Informazioni</li>
              <li :class="{'active-tab': activeTab === 'messaging'}" @click="activeTab = 'messaging'">Messaggistica</li>
            </ul>
          </div>
          <!-- Main Content -->
          <div class="w-3/4">
            <div v-if="activeTab === 'info'">
              <div v-if="user">
                <div class="mb-4">
                  <label class="block text-gray-700">Email:</label>
                  <input v-model="user.email" disabled class="w-full mt-1 p-2 border rounded-lg" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Ultimo accesso:</label>
                  <input v-model="formattedLastSignIn" disabled class="w-full mt-1 p-2 border rounded-lg" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Creato il:</label>
                  <input v-model="formattedCreatedAt" disabled class="w-full mt-1 p-2 border rounded-lg" />
                </div>
              </div>
              <div v-else class="text-center text-gray-500">
                Caricamento...
              </div>
            </div>
            <div v-if="activeTab === 'messaging'">
              <h2 class="text-2xl font-bold mb-4">Messaggistica</h2>
              <textarea v-model="message" class="w-full mt-1 p-2 border rounded-lg" rows="4" placeholder="Scrivi il tuo messaggio..."></textarea>
              <button @click="sendMessage" class="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4">Invia</button>
              <div v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</div>
              <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { useUserStore } from '../stores/user.js'
  import { supabase } from '../supabase'
  import { format } from 'date-fns'
  import Nav from '../components/NavHomepage.vue'
  
  export default {
    name: 'ProfileView',
    components: {
      Nav
    },
    setup() {
      const userStore = useUserStore()
      const user = ref(null)
      const activeTab = ref('info')
      const message = ref('')
      const successMessage = ref('')
      const errorMessage = ref('')
      const recipientEmail = 'alessandro.accomazzi@gmail.com' // Modifica questo valore con l'email del destinatario
  
      const fetchProfile = async () => {
        await userStore.fetchUser()
        if (userStore.user) {
          user.value = userStore.user
        }
      }
  
      onMounted(() => {
        fetchProfile()
      })
  
      const formattedLastSignIn = computed(() => {
        return user.value ? format(new Date(user.value.last_sign_in_at), 'dd/MM/yyyy HH:mm:ss') : ''
      })
  
      const formattedCreatedAt = computed(() => {
        return user.value ? format(new Date(user.value.created_at), 'dd/MM/yyyy HH:mm:ss') : ''
      })
  
      const sendMessage = async () => {
        if (message.value.trim() === '') {
          errorMessage.value = 'Il messaggio non può essere vuoto.'
          return
        }
  
        const { error } = await supabase
          .from('messages')
          .insert([
            { sender: user.value.email, recipient: recipientEmail, message: message.value }
          ])
  
        if (error) {
          errorMessage.value = 'Errore nell\'invio del messaggio.'
          console.error('Error sending message:', error)
        } else {
          successMessage.value = 'Messaggio inviato con successo.'
          message.value = ''
        }
      }
  
      return {
        user,
        activeTab,
        message,
        successMessage,
        errorMessage,
        formattedLastSignIn,
        formattedCreatedAt,
        sendMessage
      }
    }
  }
  </script>
  
  <style scoped>
  .tabs {
    list-style: none;
    padding: 0;
  }
  
  .tabs li {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  
  .active-tab {
    background-color: #333;
    color: #fff;
  }
  
  .font-monospace {
    font-family: monospace;
  }
  </style>
  