<template>
  <div class="bg-gray-100">
    <Nav />
    <div class="full">
      <h1 class="text-[4rem] font-monospace text-center mt-8">Corsi di Formazione</h1>
      <p class="mt-4 text-center text-black font-bold text-md">Il nostro obiettivo è fornire una formazione di eccellenza e qualità superiore, mantenendo prezzi competitivi e accessibili.</p>
      <p class="mt-2 text-center text-black font-bold text-md">Non sai da dove iniziare il tuo percorso di studio? Visita le nostre <router-link to="/faq"> <span class="font-bold text-indigo-500 underline">FAQ</span> </router-link> per maggiori informazioni.</p>
    </div>
    <div v-if="loading" class="text-center text-gray-500 mt-8">
      <h3 class="mt-[20rem] text-[1rem]">Caricamento in corso...</h3>
    </div>
    <div v-else class="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div v-for="course in courses" :key="course.id" class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2 h-[400px] relative p-4" :style="{ backgroundImage: `url(${course.image_url})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
        <div class="p-4 bg-white transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2 absolute bottom-0">
          <h2 class="text-2xl font-bold">{{ course.title }}</h2>
          <p class="text-lg">{{ course.description }}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-sm text-gray-500">{{ course.duration }}</span>
            <span class="text-lg font-bold">{{ course.price }} €</span>
          </div>
          <div class="flex items-center justify-between">
            <router-link :to="`/corsi/${course.id}`" class="my-0 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-min mt-4">
              Scopri di più
            </router-link>
            <button v-if="isPurchased(course.id)" @click="goToProfile" class="my-0 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-min mt-4 relative">
              <span class="tooltip-text">Acquistato</span>
              <IconaNellaLibreria />
            </button>
            <button v-else-if="isInCart(course.id)" @click="goToProfile" class="my-0 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-min mt-4">
              <IconaNelCarrello />
            </button>
            <button v-else @click="addToCart(course)" class="my-0 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-min mt-4">
              <IconaCarrello />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from '../components/NavHomepage.vue'
import Footer from '../components/FooterHomepage.vue'
import IconaCarrello from '../components/icons/IconaCarrello.vue'
import IconaNelCarrello from '../components/icons/IconaGiaNelCarrello.vue'
import IconaNellaLibreria from '../components/icons/IconaNellaLibreria.vue'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../supabase'
import { useCartStore } from '../stores/counter.js'
import { useUserStore } from '../stores/user.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'CoursesView',
  components: {
    Nav,
    Footer,
    IconaCarrello,
    IconaNelCarrello,
    IconaNellaLibreria
  },
  setup() {
    const courses = ref([])
    const loading = ref(true)
    const cartStore = useCartStore()
    const userStore = useUserStore()
    const user = ref(userStore.user)
    const purchasedCourses = ref([])
    const toast = useToast()
    const router = useRouter()

    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*')
      if (error) {
        console.error(error)
      } else {
        courses.value = data
      }
      loading.value = false
    }

    const fetchPurchasedCourses = async () => {
      if (!user.value) return

      const { data: orders, error } = await supabase
        .from('orders')
        .select('course_id')
        .eq('user_id', user.value.id)

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      purchasedCourses.value = orders.map(order => order.course_id)
    }

    const isPurchased = (courseId) => {
      return purchasedCourses.value.includes(courseId)
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

    const goToProfile = () => {
      router.push('/profilo')
    }

    onMounted(() => {
      fetchCourses()
      userStore.loadSessionFromCookies()
      fetchPurchasedCourses()
      cartStore.loadCart()
    })

    return {
      courses,
      loading,
      addToCart,
      isPurchased,
      isInCart,
      goToProfile
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
.course-card {
  background-size: cover;
  background-position: center;
  height: 350px;
  display: flex;
  align-items: flex-end;
}
.backdrop-filter {
  backdrop-filter: blur(8px);
}
.tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the icon */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

button:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
