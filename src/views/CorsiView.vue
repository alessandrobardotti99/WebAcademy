<template>
  <div class="bg-gray-100 h-screen">
    <Nav />
    <div class="full">
      <h1 class="text-[4rem] font-monospace text-center mt-8">Corsi di Formazione</h1>
      <p class="mt-4 text-center text-neutral-500">Il nostro obiettivo è fornire una formazione di eccellenza e qualità superiore, mantenendo prezzi competitivi e accessibili.</p>
      <p class="mt-2 text-center text-neutral-500">Non sai da dove iniziare il tuo percorso di studio? Visita le nostre <span class="font-bold text-neutral-800 underline">FAQ</span> per maggiori informazioni.</p>
    </div>
    <div v-if="loading" class="text-center text-gray-500 mt-8">
      Caricamento in corso...
    </div>
    <div v-else class="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div v-for="course in courses" :key="course.id" class="course-card rounded-xl relative" :style="{ backgroundImage: `url(${course.image_url})` }">
        <div class="p-4 bg-white rounded-xl m-[10px] backdrop-filter backdrop-blur-lg bg-opacity-80">
          <h2 class="text-xl font-bold">{{ course.title }}</h2>
          <p class="text-gray-700">{{ course.description }}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-sm text-gray-500">{{ course.duration }}</span>
            <span class="text-lg font-bold">{{ course.price }} €</span>
          </div>
          <router-link :to="`/corsi/${course.id}`" class="block mt-4 bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700">
            Scopri di più
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/NavHomepage.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

export default {
  name: 'CoursesView',
  components: {
    Nav
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
