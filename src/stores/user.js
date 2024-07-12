import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const fetchUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching session:', error)
    } else {
      user.value = session?.user ?? null
      if (session) {
        // Save session data to cookies
        Cookies.set('supabaseSession', JSON.stringify(session), { expires: 1 }) // Expire in 1 day
      }
    }
  }

  const removeSession = () => {
    Cookies.remove('supabaseSession')
    user.value = null
  }

  const loadSessionFromCookies = async () => {
    const sessionData = Cookies.get('supabaseSession')
    if (sessionData) {
      const session = JSON.parse(sessionData)
      user.value = session.user
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      })
    }
  }

  return {
    user,
    fetchUser,
    removeSession,
    loadSessionFromCookies
  }
})
