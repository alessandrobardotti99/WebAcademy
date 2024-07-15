<template>
  <Nav />
  <div class="bg-gray-100 min-h-screen flex">
    <div class="flex w-full">
      <aside class="bg-white w-1/4 min-h-screen p-8 shadow-lg">
        <ul>
          <li class="mb-2">
            <button @click="currentTab = 'profile'" :class="{'text-white font-bold': currentTab === 'profile', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl': currentTab !== 'profile'}" class="p-4 bg-indigo-500 rounded-xl block w-full text-start">Profilo</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'orders'" :class="{'text-white font-bold': currentTab === 'orders', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl': currentTab !== 'orders'}" class="bg-indigo-500 rounded-xl block w-full text-start p-4">Ordini</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'settings'" :class="{'text-white font-bold': currentTab === 'settings', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl': currentTab !== 'settings'}" class="bg-indigo-500 rounded-xl block w-full text-start p-4">Impostazioni</button>
          </li>
        </ul>
      </aside>
      <main class="w-3/4 p-8">
        <div class="max-w-4xl mx-auto">
          <div v-if="currentTab === 'profile'">
            <div v-if="user">
              <h1 class="text-4xl font-bold mb-6 font-monospace text-indigo-500">Profilo Utente</h1>
              <div class="mb-4">
                <label class="block text-gray-700">Email:</label>
                <input v-model="user.email" disabled class="w-full mt-1 p-2 border rounded-lg" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Ultimo accesso:</label>
                <input v-model="formattedLastSignIn" disabled class="w-full mt-1 p-2 border rounded-lg" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Creato il:</label>
                <input v-model="formattedCreatedAt" disabled class="w-full mt-1 p-2 border rounded-lg" />
              </div>
            </div>
            <div v-else class="text-center text-gray-500">
              Caricamento...
            </div>
          </div>

          <div v-if="currentTab === 'orders'">
            <h2 class="text-4xl font-bold mb-6 font-monospace text-indigo-500">Corsi acquistati</h2>
            <div v-if="purchasedCourses.length">
              <ul>
                <li v-for="course in purchasedCourses" :key="course.id" class="mb-2 p-4 border rounded-lg">
                  <h3 class="text-xl font-bold">{{ course.title }}</h3>
                  <p>{{ course.description }}</p>
                  <span class="text-gray-500">Acquistato il: {{ formatDate(course.purchase_date) }}</span>
                  <div v-if="course.videos.length">
                    <h4 class="text-lg font-bold mt-4">Video del corso:</h4>
                    <ul>
                      <li v-for="video in course.videos" :key="video.id" class="mb-2">
                        <router-link :to="{ name: 'VideoView', params: { id: video.id, title: video.title, courseId: course.id } }" class="text-blue-500 hover:underline">
                          {{ video.title }}
                        </router-link>
                        <p>{{ video.description }}</p>
                      </li>
                    </ul>
                  </div>
                  <div v-else class="text-gray-500">
                    Nessun video disponibile.
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="text-center text-gray-500">
              Nessun ordine trovato.
            </div>
          </div>

          <div v-if="currentTab === 'settings'">
            <h2 class="text-2xl font-bold mb-4 font-monospace text-indigo-500">Impostazioni</h2>
            <p>Pagina delle impostazioni (in arrivo).</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user.js'
import { supabase } from '../supabase'
import { format } from 'date-fns'
import Nav from '../components/NavHomepage.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ProfileView',
  components: {
    Nav
  },
  setup() {
    const userStore = useUserStore()
    const user = ref(null)
    const purchasedCourses = ref([])
    const route = useRoute()
    const currentTab = ref(route.query.tab || 'profile')

    const fetchProfile = async () => {
      userStore.loadSessionFromCookies()
      if (userStore.user) {
        user.value = userStore.user
        await fetchPurchasedCourses(user.value.id)
      }
    }

    const fetchPurchasedCourses = async (userId) => {
      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('course_id, purchase_date')
          .eq('user_id', userId)

        if (error) {
          console.error('Error fetching orders:', error)
          return
        }

        const courseIds = orders.map(order => order.course_id)
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds)

        if (coursesError) {
          console.error('Error fetching courses:', coursesError)
          return
        }

        // Fetch videos for each course
        for (const course of courses) {
          const { data: videos, error: videosError } = await supabase
            .from('course_videos')
            .select('*')
            .eq('course_id', course.id)

          if (videosError) {
            console.error('Error fetching videos:', videosError)
            course.videos = []
          } else {
            course.videos = videos
          }
        }

        purchasedCourses.value = courses.map(course => {
          const order = orders.find(order => order.course_id === course.id)
          return { ...course, purchase_date: order.purchase_date }
        })
      } catch (error) {
        console.error('Error fetching purchased courses:', error)
      }
    }

    onMounted(() => {
      fetchProfile()
    })

    const formattedLastSignIn = computed(() => {
      return user.value ? format(new Date(user.value.last_sign_in_at), 'dd/MM/yyyy HH:mm:ss') : ''
    })

    const formattedCreatedAt = computed(() => {
      return user.value ? format(new Date(user.value.created_at), 'dd/MM/yyyy HH:mm:ss') : ''
    })

    const formatDate = (date) => {
      return format(new Date(date), 'dd/MM/yyyy HH:mm:ss')
    }

    return {
      user,
      formattedLastSignIn,
      formattedCreatedAt,
      purchasedCourses,
      formatDate,
      currentTab
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
.text-black {
  color: #000;
}
.font-bold {
  font-weight: bold;
}
</style>
