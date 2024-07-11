<template>
    <Nav />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Login Page</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <div v-if="error" class="text-red-500 text-sm mt-4">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { supabase } from '../supabase'
  import Nav from '../components/NavHomepage.vue'
  
  export default {
    name: 'LoginView',
    components: {
    Nav,
  },
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)
  
      const login = async () => {
        error.value = null
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        })
        if (loginError) {
          error.value = loginError.message
        } else {
          console.log('OK')
          window.location.href = '/'
        }
      }
  
      return {
        email,
        password,
        error,
        login
      }
    }
  }
  </script>

  