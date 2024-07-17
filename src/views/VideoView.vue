<template>
  <NavVideo />
  <div class="bg-gray-100 flex overflow-hidden">
    <div class="flex w-full items-start h-screen">
      <div class="w-[70%] m-4 rounded-xl">
        <vue-plyr :options="plyrOptions" class="w-full h-auto">
          <video ref="videoElement" :src="videoUrl" controls @ended="playNextVideo"></video>
        </vue-plyr>
      </div>
      <div class="w-[30%] p-4 border-l-4 border-gray-900 h-screen bg-neutral-100">
        <ul>
          <li
            v-for="video in courseVideos"
            :key="video.id"
            :class="{
              'my-0 py-2 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap': video.id === currentVideoId,
              'my-0 py-2 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-neutral-100 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-4': video.id !== currentVideoId
            }"
            class="mb-2 p-4"
          >
            <router-link
              :to="{ name: 'VideoView', params: { id: video.id, title: video.title, courseId: courseId } }"
              :class="{'text-black': video.id === currentVideoId, 'text-black': video.id !== currentVideoId}"
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
  --tw-shadow: 5px 5px 0px 0px #000;
  --tw-shadow-colored: 5px 5px 0px 0px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-border-opacity: 1;
    border-color: rgb(17 24 39 / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: rgb(245 245 245 / var(--tw-bg-opacity));
    border-width: 4px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
