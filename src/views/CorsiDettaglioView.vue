<template>
  <div class="bg-gray-100 min-h-screen">
      <Nav />
      <div class="max-w-6xl mx-auto p-8">
          <router-link to="/corsi" class="inline-block bg-indigo-600 text-white text-center py-2 px-4 rounded-lg hover:bg-indigo-700 mb-6">
              <span><IconaBack /></span>
          </router-link>
          <div v-if="course">
              <div class="relative mb-8">
                  <img :src="course.image_url" :alt="course.title" class="w-full h-64 object-cover rounded-xl">
                  <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                      <h1 class="text-4xl font-bold text-white">{{ course.title }}</h1>
                  </div>
              </div>
              <div class="mb-8">
                  <div class="flex justify-between items-center mb-4 gap-4">
                      <div class="flex items-center border-2 border-neutral-800 py-2 px-4 rounded-xl">
                          <span class="text-sm text-gray-500 mr-4 flex items-center gap-2"><IconaOrologio /> {{ course.duration }}</span>
                          <span class="text-sm text-gray-500 flex items-center gap-2"><IconaPrincipianti /> {{ course.level }}</span>
                      </div>
                      <span class="text-lg font-bold bg-gradient-to-r from-30% from-black to-indigo-600 py-2 px-4 text-white rounded-xl">{{ course.price }} €</span>
                  </div>
                  <p class="text-gray-700 mb-6">{{ course.internal_description }}</p>
                  <button @click="addToCart(course)" 
                          class="inline-block text-neutral-800 text-center py-2 px-4 rounded-lg" 
                          :class="{'bg-YellowWebAcademy hover:bg-HoverYwlloWebAcademt': !isInCart(course.id), 'bg-indigo-500 text-white': isInCart(course.id)}">
                    {{ isInCart(course.id) ? 'Già nel carrello' : 'Aggiungi al carrello' }}
                  </button>
              </div>
          </div>
          <div v-else class="text-center text-gray-500">
              Caricamento...
          </div>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import { useCartStore } from '../stores/counter.js'
import Nav from '../components/NavHomepage.vue'
import IconaBack from '../components/icons/IconaBack.vue'
import IconaOrologio from '../components/icons/IconaOrologio.vue'
import IconaPrincipianti from '../components/icons/IconaPrincipianti.vue'
import { useToast } from 'vue-toastification'

export default {
name: 'CourseDetail',
components: {
  Nav,
  IconaBack,
  IconaOrologio,
  IconaPrincipianti
},
setup() {
  const route = useRoute()
  const course = ref(null)
  const cartStore = useCartStore()
  const user = ref(null)
  const toast = useToast()

  const fetchCourse = async () => {
    if (route.params.id) {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', route.params.id)
        .single()
      if (error) {
        console.error(error)
      } else {
        course.value = data
      }
    }
  }

  const fetchUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching session:', error)
    } else {
      user.value = session?.user ?? null
    }
  }

  const addToCart = async (course) => {
    if (!user.value) {
      toast.error('Devi effettuare il login per aggiungere i corsi al carrello.')
      return
    }

    if (!cartStore.isInCart(course.id)) {
      await cartStore.addToCart(course)
      toast.success('Corso aggiunto al carrello.')
    } else {
      toast.info('Il corso è già nel carrello.')
    }
  }

  const isInCart = (courseId) => {
    return cartStore.isInCart(courseId)
  }

  onMounted(() => {
    fetchCourse()
    fetchUser()
    cartStore.loadCart()
  })

  return {
    course,
    addToCart,
    isInCart
  }
}
}
</script>

<style scoped>
.font-monospace {
font-family: monospace;
}
</style>
