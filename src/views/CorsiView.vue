<template>
  <div class="bg-gray-100 h-screen">
    <Nav />
    <div class="full">
      <h1 class="text-[4rem] font-monospace text-center mt-8">Corsi di Formazione</h1>
      <p class="mt-4 text-center text-neutral-500">Il nostro obiettivo è fornire una formazione di eccellenza e qualità superiore, mantenendo prezzi competitivi e accessibili.</p>
      <p class="mt-2 text-center text-neutral-500">Non sai da dove iniziare il tuo percorso di studio? Visita le nostre <router-link to="/faq"> <span class="font-bold text-neutral-800 underline">FAQ</span> </router-link> per maggiori informazioni.</p>
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

          <router-link :to="`/corsi/${course.id}`" class="my-0 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-min mt-4">
           <IconaCarrello /> 
          </router-link>
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
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

export default {
  name: 'CoursesView',
  components: {
    Nav,
    Footer,
    IconaCarrello
  },
  setup() {
    const courses = ref([])
    const loading = ref(true)

    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*')
      if (error) {
        console.error(error)
      } else {
        courses.value = data
      }
      loading.value = false
    }

    onMounted(() => {
      fetchCourses()
    })

    return {
      courses,
      loading
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
</style>
