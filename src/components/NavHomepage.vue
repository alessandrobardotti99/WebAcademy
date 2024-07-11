<template>
  <div :class="['w-full', 'bg-YellowWebAcademy', 'sticky', 'top-0', 'z-50', { 'shadow-lg': hasScrolled }]">
    <nav class="sticky flex justify-between w-[80%] m-auto ml-auto mr-auto items-center bg-YellowWebAcademy top-0 p-4">
      <router-link to="/">
      <div>
        <img src="/src/assets/img/logoWebAcademy-removebg-preview.png" alt="logoWebAcademy" class="max-w-full h-[30px]">
      </div>
    </router-link>
      <div>
        <ul class="inline-flex gap-5">
          <router-link to="/" class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer" active-class="text-black font-bold">
            <li>Home</li>
          </router-link>
          <router-link to="/news" class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer" active-class="text-black font-bold">
            <li>News</li>
          </router-link>
          <router-link to="/corsi" class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer" active-class="text-black font-bold">
            <li>Corsi</li>
          </router-link>
          <router-link to="/contatti" class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer" active-class="text-black font-bold">
            <li>Contatti</li>
          </router-link>
          <template v-if="user">
            <li ref="dropdown" class="bg-indigo-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-indigo-700 relative flex items-center" @click="toggleDropdown">
              Ciao {{ user.email }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="{'rotate-180': dropdownOpen, 'ml-2': true, 'w-4': true, 'h-4': true, 'transition-transform': true}">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              <transition name="fade">
                <ul v-if="dropdownOpen" v-auto-animate class="absolute top-full right-0 mt-2 bg-YellowWebAcademy shadow-md rounded-xl w-48 py-2">
                  <router-link to="/profilo" class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer">
                    <li>Profilo</li>
                  </router-link>
                  <router-link to="/impostazioni" class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer">
                    <li>Impostazioni</li>
                  </router-link>
                  <hr>
                  <li @click="logout" class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer">
                    Logout
                  </li>
                </ul>
              </transition>
            </li>
          </template>
          <template v-else>
            <router-link to="/accedi" class="bg-indigo-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-indigo-700">
              <li>Accedi</li>
            </router-link>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Cookies from 'js-cookie'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

export default {
  directives: {
    autoAnimate: autoAnimatePlugin
  },
  setup() {
    const hasScrolled = ref(false)
    const user = ref(null)
    const dropdownOpen = ref(false)
    const dropdown = ref(null)

    const handleScroll = () => {
      hasScrolled.value = window.scrollY > 0
    }

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        dropdownOpen.value = false
      }
    }

    const logout = () => {
      Cookies.remove('supabaseSession')
      user.value = null
      window.location.href = '/'
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
      const session = Cookies.get('supabaseSession')
      if (session) {
        user.value = JSON.parse(session).user
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      hasScrolled,
      user,
      dropdownOpen,
      toggleDropdown,
      logout,
      dropdown
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
.transition-transform {
  transition: transform 0.2s linear;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

hr {
  border: solid 1px #e4bb62;
}
</style>
