<template>
    <div class="bg-gray-100 min-h-screen">
      <Nav />
      <div class="max-w-6xl mx-auto p-8">
        <h1 class="text-4xl font-bold mb-6">Il tuo carrello</h1>
        <div v-if="cartItems.length">
          <div v-for="course in cartItems" :key="course.id" class="mb-4 p-4 bg-white rounded-xl shadow-md flex justify-between items-center">
            <div class="flex items-center">
              <img :src="course.image_url" :alt="course.title" class="w-20 h-20 object-cover rounded-xl mr-4">
              <div>
                <h2 class="text-xl font-bold">{{ course.title }}</h2>
                <p class="text-gray-500">{{ course.duration }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold mr-4">{{ course.price }} €</span>
              <button @click="removeFromCart(course.id)" class="bg-red-500 text-white py-1 px-3 rounded-xl hover:bg-red-600">Rimuovi</button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          <h3 class="mt-[20rem] text-[1.5rem]">Il tuo carrello è vuoto</h3>
          <div>
            <CarrelloVuoto class="m-auto max-w-full w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../supabase'
  import Nav from '../components/NavHomepage.vue'
  import CarrelloVuoto from '../components/icons/IconaCarrelloVuoto.vue'
  
  export default {
    name: 'CarrelloView',
    components: {
      Nav,
      CarrelloVuoto
    },
    setup() {
      const cartItems = ref([])
  
      const fetchCartItems = async () => {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error fetching session:', error)
        } else {
          const user = session?.user ?? null
          if (user) {
            const { data, error } = await supabase
              .from('cart')
              .select('course_id')
              .eq('user_id', user.id)
            if (error) {
              console.error('Error fetching cart items:', error)
            } else {
              const courseIds = data.map(item => item.course_id)
              if (courseIds.length > 0) {
                const { data: courses, error } = await supabase
                  .from('courses')
                  .select('*')
                  .in('id', courseIds)
                if (error) {
                  console.error('Error fetching courses:', error)
                } else {
                  cartItems.value = courses
                }
              }
            }
          }
        }
      }
  
      const removeFromCart = async (courseId) => {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error fetching session:', error)
        } else {
          const user = session?.user ?? null
          if (user) {
            const { error } = await supabase
              .from('cart')
              .delete()
              .eq('user_id', user.id)
              .eq('course_id', courseId)
            if (error) {
              console.error('Error removing item from cart:', error)
            } else {
              cartItems.value = cartItems.value.filter(course => course.id !== courseId)
            }
          }
        }
      }
  
      onMounted(() => {
        fetchCartItems()
      })
  
      return {
        cartItems,
        removeFromCart
      }
    }
  }
  </script>
  
  <style scoped>
  .font-monospace {
    font-family: monospace;
  }
  </style>
