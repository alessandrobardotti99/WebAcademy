<template>
  <NavVideo />
  <div class="bg-gray-100 flex overflow-hidden">
    <div class="flex w-full items-start h-screen">
      <div class="w-[70%] m-4 rounded-xl">
        <vue-plyr :options="plyrOptions" class="w-full h-auto">
          <video ref="videoElement" :src="videoUrl" controls @ended="playNextVideo"></video>
        </vue-plyr>
      </div>
      <div class="w-[30%] p-4 bg-neutral-200 h-screen">
        <ul>
          <li
            v-for="video in courseVideos"
            :key="video.id"
            :class="{
              'bg-indigo-500 text-white cursor-pointer': video.id === currentVideoId,
              'bg-neutral-300 text-neutral-500 cursor-pointer': video.id !== currentVideoId
            }"
            class="mb-2 p-4 rounded-xl"
          >
            <router-link
              :to="{ name: 'VideoView', params: { id: video.id, title: video.title, courseId: courseId } }"
              :class="{'text-white': video.id === currentVideoId, 'text-neutral-500': video.id !== currentVideoId}"
              class="hover:underline"
            >
              {{ video.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavVideo from '../components/NavCorsi.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default {
  name: 'VideoView',
  components: {
    VuePlyr,
    NavVideo
  },
  props: ['id', 'title', 'courseId'],
  setup(props) {
    const videoUrl = ref('')
    const videoTitle = ref(props.title)
    const courseVideos = ref([])
    const route = useRoute()
    const courseId = ref(route.params.courseId)
    const currentVideoId = ref(props.id)
    const videoElement = ref(null)

    const fetchVideoUrl = async (id) => {
      try {
        const { data, error } = await supabase
          .from('course_videos')
          .select('video_url')
          .eq('id', id)
          .single()

        if (error) {
          console.error('Error fetching video URL:', error)
          return
        }

        videoUrl.value = data.video_url
      } catch (error) {
        console.error('Error fetching video URL:', error)
      }
    }

    const fetchCourseVideos = async (courseId) => {
      try {
        const { data, error } = await supabase
          .from('course_videos')
          .select('id, title')
          .eq('course_id', courseId)

        if (error) {
          console.error('Error fetching course videos:', error)
          return
        }

        courseVideos.value = data
      } catch (error) {
        console.error('Error fetching course videos:', error)
      }
    }

    const playNextVideo = () => {
      const currentIndex = courseVideos.value.findIndex(video => video.id === currentVideoId.value)
      const nextIndex = (currentIndex + 1) % courseVideos.value.length
      const nextVideo = courseVideos.value[nextIndex]
      currentVideoId.value = nextVideo.id
      videoTitle.value = nextVideo.title
      fetchVideoUrl(nextVideo.id)
    }

    onMounted(() => {
      fetchVideoUrl(props.id)
      fetchCourseVideos(courseId.value)
    })

    watch(
      () => route.params.id,
      (newId) => {
        currentVideoId.value = newId
        videoTitle.value = route.params.title
        fetchVideoUrl(newId)
      }
    )

    const plyrOptions = {
      controls: ['play', 'progress', 'volume', 'settings', 'fullscreen'],
      settings: ['quality', 'speed'],
      volume: 0.5,
      speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
      quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
    }

    return {
      videoUrl,
      videoTitle,
      courseVideos,
      plyrOptions,
      courseId,
      currentVideoId,
      videoElement,
      playNextVideo
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
</style>

<style>
.plyr--video {
  border-radius: 0.75rem;
}
.plyr--full-ui input[type=range] {
  color: #6466f1 !important;
  cursor: pointer;
}
.plyr--video .plyr__control[aria-expanded=true] {
  background: #6466f1 !important;
}
.plyr--video .plyr__control:hover {
  background: #6466f1  !important;
}
.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]::before {
  background: #6466f1 !important;
}
</style>
