import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const user = ref(null)

  const loadCart = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching session:', error)
    } else {
      user.value = session?.user ?? null
    }

    if (user.value) {
      // Load cart from the database
      const { data, error } = await supabase.from('cart').select('*').eq('user_id', user.value.id)
      if (error) {
        console.error('Error loading cart:', error)
      } else {
        items.value = data.map(item => item.course_id)
      }
    }
  }

  const saveCart = async () => {
    if (user.value) {
      // Save cart to the database
      await supabase.from('cart').delete().eq('user_id', user.value.id) // Clear existing cart
      for (const courseId of items.value) {
        const { error } = await supabase.from('cart').insert([{ user_id: user.value.id, course_id: courseId }])
        if (error) {
          console.error('Error saving cart:', error)
        }
      }
    }
  }

  const addToCart = async (course) => {
    if (!items.value.includes(course.id)) {
      items.value.push(course.id)
      await saveCart()
    }
  }

  const isInCart = (courseId) => {
    return items.value.includes(courseId)
  }

  

  const totalItems = computed(() => items.value.length)

  return {
    items,
    totalItems,
    addToCart,
    isInCart,
    loadCart,
    saveCart
  }
})
