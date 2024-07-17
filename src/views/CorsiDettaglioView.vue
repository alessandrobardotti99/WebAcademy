<template>
  <div class="bg-gray-100 min-h-screen">
      <Nav />
      <div class="max-w-6xl mx-auto p-8">
          <router-link to="/corsi" class="text-black bg-indigo-500 my-0 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-2 mb-8">
              <span><IconaBack /></span>
          </router-link>
          <div v-if="course">
              <div class="relative mb-8 px-3">
                  <img :src="course.image_url" :alt="course.title" class="w-full h-64 object-cover border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2">
                  <div class="absolute inset-0 bg-opacity-50 flex items-center justify-center rounded-xl">
                      <h1 class="text-4xl font-bold text-white">{{ course.title }}</h1>
                  </div>
              </div>
              <div class="mb-8">
                  <div class="flex justify-between items-center mb-4 gap-4 px-1">
                      <div class="my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal bg-white text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">
                          <span class="text-black font-bold mr-4 flex items-center gap-2 text-lg lg:text-xl"><IconaOrologio /> {{ course.duration }}</span>
                          <span class="text-lg lg:text-xl text-black font-bold flex items-center gap-2"><IconaPrincipianti /> {{ course.level }}</span>
                      </div>
                      <span class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">{{ course.price }} €</span>
                  </div>
                  <p class="text-black font-bold text-justify mb-4 px-2">{{ course.internal_description }}</p>
                  <button @click="addToCart(course)" 
                          class="inline-block text-neutral-800 text-center py-2 px-4 rounded-lg" 
                          :class="{'my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap': !isInCart(course.id), 'my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap': isInCart(course.id)}">
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
