<template>
  <div :class="['w-full', 'bg-YellowWebAcademy', 'sticky', 'top-0', 'z-50', { 'shadow-lg': hasScrolled }]">
    <nav class="sticky flex justify-between w-[80%] m-auto ml-auto mr-auto items-center bg-YellowWebAcademy top-0 p-4">
      <router-link to="/">
        <div>
          <img src="/src/assets/img/logoWebAcademy-removebg-preview.png" alt="logoWebAcademy"
            class="max-w-full h-[40px]">
        </div>
      </router-link>
      <div class="hidden lg:flex">
        <ul class="inline-flex bg-white border-4 rounded-full border-gray-950 px-4 py-2 shadow-brutalSmall gap-4">
          <!-- Menu items -->
          <router-link to="/corsi"
            class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
            active-class="text-black font-bold">
            <li>Corsi</li>
          </router-link>
          <router-link to="/faq"
            class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
            active-class="text-black font-bold">
            <li>Faq</li>
          </router-link>
          <router-link to="/esercitazioni"
            class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
            active-class="text-black font-bold">
            <li>Esercitazioni</li>
          </router-link>
          <router-link to="/contatti"
            class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
            active-class="text-black font-bold">
            <li>Contatti</li>
          </router-link>
          <template v-if="user">
            <router-link to="/carrello"
              class="relative flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
              active-class="text-black font-bold">
              <li>Carrello</li>
              <span v-if="totalItems > 0"
                class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-indigo-500 rounded-full h-[20px] w-[20px]">{{
    totalItems }}</span>
            </router-link>
            <li ref="dropdown" class="flex" @click="toggleDropdown">
               <span class="my-0 mx-1 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">{{ firstInitial }} 

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor"
                :class="{ 'rotate-180': dropdownOpen, 'ml-2': true, 'w-4': true, 'h-4': true, 'transition-transform': true }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
               </span>
              
              <transition name="fade">
                <ul v-if="dropdownOpen" v-auto-animate
                  class="absolute top-full right-0 mt-2 bg-YellowWe inline-flex bg-white border-4 rounded-full border-gray-950 px-4 py-2 shadow-brutalSmall gap-4">
                  <router-link to="/profilo"
                    class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900">
                    <li>Profilo</li>
                  </router-link>
                  <router-link to="/impostazioni"
                    class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900">
                    <li>Impostazioni</li>
                  </router-link>
                  <hr>
                  <li @click="logout"
                    class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900">
                    Logout
                  </li>
                </ul>
              </transition>
            </li>
          </template>
          <template v-else>
            <router-link to="/accedi"
              class="bg-indigo-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-indigo-700">
              <li>Accedi</li>
            </router-link>
          </template>
        </ul>
      </div>
      <div class="lg:hidden">
        <button @click="toggleMobileMenu" class="text-neutral-500 p-2 rounded-lg hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" @click="toggleMobileMenu">
        <div class="fixed inset-y-0 right-0 w-64 bg-YellowWebAcademy shadow-lg z-50 flex flex-col p-4" @click.stop>
          <ul class="space-y-4">
            <!-- Mobile menu items -->
            <router-link to="/corsi"
              class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
              active-class="text-black font-bold" @click="toggleMobileMenu">
              <li>Corsi</li>
            </router-link>
            <router-link to="/faq"
              class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
              active-class="text-black font-bold" @click="toggleMobileMenu">
              <li>Faq</li>
            </router-link>
            <router-link to="/esercitazioni"
              class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
              active-class="text-black font-bold" @click="toggleMobileMenu">
              <li>Esercitazioni</li>
            </router-link>
            <router-link to="/contatti"
              class="flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
              active-class="text-black font-bold" @click="toggleMobileMenu">
              <li>Contatti</li>
            </router-link>
            <template v-if="user">
              <router-link to="/carrello"
                class="relative flex items-center gap-2 text-2xl font-semibold leading-2 text-gray-900 border-b-4 border-b-transparent mx-6 hover:border-b-gray-900"
                active-class="text-black font-bold" @click="toggleMobileMenu">
                <li>Carrello</li>
                <span v-if="totalItems > 0"
                  class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-indigo-500 rounded-full h-[20px] w-[20px]">{{totalItems }}</span>
              </router-link>
              <li ref="dropdown"
                class="my-0 mx-1 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl text-black font-medium flex gap-2 items-center whitespace-nowrap w-full"
                @click="toggleDropdown">
                {{ firstInitial }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor"
                  :class="{ 'rotate-180': dropdownOpen, 'ml-2': true, 'w-4': true, 'h-4': true, 'transition-transform': true }">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                <transition name="fade">
                  <ul v-if="dropdownOpen"
                    class="absolute top-full right-0 mt-2 bg-YellowWebAcademy shadow-md rounded-xl w-48 py-2">
                    <router-link to="/profilo"
                      class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer"
                      @click="toggleMobileMenu">
                      <li v-auto-animate>Profilo</li>
                    </router-link>
                    <router-link to="/impostazioni"
                      class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer"
                      @click="toggleMobileMenu">
                      <li v-auto-animate>Impostazioni</li>
                    </router-link>
                    <hr>
                    <li @click="logout"
                      class="block px-4 py-2 text-slate-500 hover:bg-HoverYwlloWebAcademt cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </transition>
              </li>

            </template>
            <template v-else>
              <router-link to="/accedi"
                class="bg-indigo-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-indigo-700"
                @click="toggleMobileMenu">
                <li>Accedi</li>
              </router-link>
            </template>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Cookies from 'js-cookie'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { useCartStore } from '../stores/counter.js'
import { useUserStore } from '../stores/user.js'

export default {
  directives: {
    autoAnimate: autoAnimatePlugin
  },
  setup() {
    const hasScrolled = ref(false)
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const user = computed(() => userStore.user)
    const dropdownOpen = ref(false)
    const dropdown = ref(null)
    const totalItems = computed(() => cartStore.totalItems)
    const mobileMenuOpen = ref(false)

    const firstInitial = computed(() => {
      if (user.value && user.value.email) {
        return user.value.email.charAt(0).toUpperCase()
      }
      return ''
    })

    const handleScroll = () => {
      hasScrolled.value = window.scrollY > 0
    }

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        dropdownOpen.value = false
      }
    }

    const logout = () => {
      Cookies.remove('supabaseSession')
      userStore.removeSession()
      window.location.href = '/'
    }

    onMounted(async () => {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
      userStore.loadSessionFromCookies()
      await cartStore.loadCart()
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
      dropdown,
      totalItems,
      firstInitial,
      mobileMenuOpen,
      toggleMobileMenu
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.slide-leave-active {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

hr {
  border: solid 1px #e4bb62;
}
</style>
