// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const fetchUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching session:', error)
    } else {
      user.value = session?.user ?? null
    }
  }

  return {
    user,
    fetchUser
  }
})
