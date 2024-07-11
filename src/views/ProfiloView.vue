<template>
  <div class="bg-gray-100 min-h-screen">
    <Nav />
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">Profilo Utente</h1>
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

    return {
      user,
      formattedLastSignIn,
      formattedCreatedAt
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
</style>