<template>
  <Nav />
  <div class="bg-white min-h-screen flex">
    <div class="flex w-full">
      <aside class="bg-white w-1/4 min-h-screen p-8 shadow-xl">
        <ul>
          <li class="mb-2">
            <button @click="currentTab = 'profile'"
              :class="{ 'text-white font-bold ml-2': currentTab === 'profile', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl hover:bg-neutral-200': currentTab !== 'profile' }"
              class="p-4 bg-indigo-500 rounded-xl block w-full text-start">Profilo</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'orders'"
              :class="{ 'text-white font-bold ml-2': currentTab === 'orders', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl hover:bg-neutral-200': currentTab !== 'orders' }"
              class="bg-indigo-500 rounded-xl block w-full text-start p-4">Corsi acquistati</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'settings'"
              :class="{ 'text-white font-bold ml-2': currentTab === 'settings', 'text-neutral-800 p-4 bg-neutral-100 rounded-xl hover:bg-neutral-200': currentTab !== 'settings' }"
              class="bg-indigo-500 rounded-xl block w-full text-start p-4">Impostazioni</button>
          </li>
        </ul>
      </aside>
      <main class="w-3/4 p-4">
        <div class="mx-auto">
          <div v-if="currentTab === 'profile'">
            <div v-if="user">
              <h1 class="text-4xl font-bold mb-6 font-monospace text-indigo-500">Profilo Utente</h1>
              <div class="mb-4">
                <label class="block text-gray-700">Email:</label>
                <input v-model="user.email" disabled class="w-full mt-1 p-4 border rounded-xl" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Ultimo accesso:</label>
                <input v-model="formattedLastSignIn" disabled class="w-full mt-1 p-4 border rounded-xl" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Creato il:</label>
                <input v-model="formattedCreatedAt" disabled class="w-full mt-1 p-4 border rounded-xl" />
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
                <li v-for="course in purchasedCourses" :key="course.id" class="mb-2 p-4 border rounded-xl">
                  <h3 class="text-xl font-bold">{{ course.title }}</h3>
                  <p>{{ course.description }}</p>
                  <span class="text-gray-500">Acquistato il: {{ formatDate(course.purchase_date) }}</span>
                  <div @click="toggleDropdown(course.id)"
                    class="cursor-pointer flex items-center justify-between bg-neutral-100 p-4 rounded-xl mt-4">
                    <span class="text-lg font-bold">Video del corso</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor"
                      :class="{ 'transform rotate-90': isOpen(course.id), 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true }">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                  </div>
                  <transition name="accordion">
                    <div v-if="isOpen(course.id)">
                      <ul v-if="course.videos.length">
                        <li v-for="video in course.videos" :key="video.id" class="mb-2 bg-indigo-500 p-4 rounded-xl text-white mt-4">
                          <div class="flex justify-between items-center">
                            <div>
                            {{ video.title }}
                            <p>{{ video.description }}</p>
                          </div>
                          <div>
                            <router-link :to="{ name: 'VideoView', params: { id: video.id, title: video.title, courseId: course.id } }"
                            class="hover:underline bg-YellowWebAcademy text-neutral-800 p-2 rounded-xl hover:bg-HoverYwlloWebAcademt hover:text-neutral-950">
                            <button>Vai al video</button> </router-link>
                          </div>
                        </div>
                        </li>
                      </ul>
                      <div v-else class="text-gray-500 p-4">
                        Nessun video disponibile.
                      </div>
                    </div>

                  </transition>
                </li>
              </ul>
            </div>
            <div v-else class="text-center text-gray-500">
              Nessun ordine trovato.
            </div>
          </div>

          <div v-if="currentTab === 'settings'">
            <h2 class="text-4xl font-bold mb-6 font-monospace text-indigo-500">Impostazioni</h2>
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
    const openDropdowns = ref([])

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

    const toggleDropdown = (courseId) => {
      if (openDropdowns.value.includes(courseId)) {
        openDropdowns.value = openDropdowns.value.filter(id => id !== courseId)
      } else {
        openDropdowns.value.push(courseId)
      }
    }

    const isOpen = (courseId) => {
      return openDropdowns.value.includes(courseId)
    }

    return {
      user,
      formattedLastSignIn,
      formattedCreatedAt,
      purchasedCourses,
      formatDate,
      currentTab,
      toggleDropdown,
      isOpen
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}

.accordion-enter,
.accordion-leave-to {
  max-height: 0;
}
</style>
