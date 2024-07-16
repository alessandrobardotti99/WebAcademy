<template>
  <div class="bg-gray-100 min-h-screen relative">
    <Nav />
    <div class="max-w-6xl mx-auto p-8">
      <h1 class="text-[4rem] font-monospace text-center mt-4 mb-8">Il tuo carrello</h1>
      <div v-if="cartItems.length" class="flex gap-4 items-start">
        <div class="w-[60%]">
          <div v-for="course in cartItems" :key="course.id"
            class="flex flex-col justify-between  px-8 py-10  border-4 border-gray-900 bg-white  transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center j">
              <img :src="course.image_url" :alt="course.title"
                class="w-[9rem] h-[6rem] object-cover border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2">
              <div class="ml-4">
                <h2 class="text-xl font-bold justify-between w-full">{{ course.title }}</h2>
                <p class="text-gray-500">{{ course.duration }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold mr-4">{{ course.price }} €</span>
                </div>
              </div>
            </div>
              <div>
                <button @click="removeFromCart(course.id)"
                  class="my-0 mx-1 py-2 px-2 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-red-500 text-lg lg:text-xl w-full text-black font-medium flex gap-2 items-center whitespace-nowrap justify-center">
                  <IconaCestino class="text-black" />
                </button>
              </div>
            </div>

          </div>
        </div>
        <div
          class="p-4 w-[40%] flex flex-col justify-between  px-8 py-10  border-4 border-gray-900 bg-white  transition-all md:shadow-brutal md:-translate-y-2 md:-translate-x-2 sticky top-32">
          <h2 class="text-2xl font-bold mb-4 text-indigo-500">Riepilogo ordine</h2>
          <hr class="mb-4">
          <div class="flex justify-between mb-2">
            <span>Subtotale:</span>
            <span>{{ subtotal.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between font-bold">
            <span>Totale:</span>
            <span>{{ total.toFixed(2) }} €</span>
          </div>
          <hr class="mb-4 mt-4">
          <button @click="goToPayment"
              class="my-0 mx-1 py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium flex gap-2 items-center whitespace-nowrap"
              :disabled="loadingPayment">
        <span v-if="loadingPayment">Pagamento in corso...</span>
        <span v-else class="flex items-center justify-start gap-2">Vai al pagamento <IconaFrecciaLunga /></span>
      </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <h3 class="mt-[20rem] text-[1.5rem]">Il tuo carrello è vuoto</h3>
        <div>
          <CarrelloVuoto class="m-auto max-w-full w-[500px]" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../supabase'
import Nav from '../components/NavHomepage.vue'
import CarrelloVuoto from '../components/icons/IconaCarrelloVuoto.vue'
import IconaCestino from '../components/icons/IconaCestino.vue'
import IconaFrecciaLunga from '../components/icons/IconaFrecciaLunga.vue'
import Footer from '../components/FooterHomepage.vue'
import { useUserStore } from '../stores/user.js'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

export default {
  name: 'CarrelloView',
  components: {
    Nav,
    CarrelloVuoto,
    IconaCestino,
    Footer,
    IconaFrecciaLunga
  },
  setup() {
    const cartItems = ref([])
    const userStore = useUserStore()
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    const loadingPayment = ref(false)

    const fetchCartItems = async () => {
      userStore.loadSessionFromCookies()
      if (userStore.user) {
        const user = userStore.user
        const { data, error } = await supabase
          .from('cart')
          .select('course_id')
          .eq('user_id', user.id)
        if (error) {
          console.error('Error fetching cart items:', error)
        } else {
          const courseIds = data.map(item => item.course_id)
          if (courseIds.length > 0) {
            const { data: courses, error } = await supabase
              .from('courses')
              .select('*')
              .in('id', courseIds)
            if (error) {
              console.error('Error fetching courses:', error)
            } else {
              cartItems.value = courses
              localStorage.setItem('cartItems', JSON.stringify(courses))
            }
          }
        }
      }
    }

    const removeFromCart = async (courseId) => {
      userStore.loadSessionFromCookies()
      if (userStore.user) {
        const user = userStore.user
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId)
        if (error) {
          console.error('Error removing item from cart:', error)
        } else {
          cartItems.value = cartItems.value.filter(course => course.id !== courseId)
          localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
        }
      }
    }

    const subtotal = computed(() => {
      return cartItems.value.reduce((sum, course) => sum + course.price, 0)
    })

    const total = computed(() => {
      return subtotal.value
    })

    const goToPayment = async () => {
      loadingPayment.value = true
      const stripe = await stripePromise

      const { data } = await axios.post('http://localhost:3000/create-checkout-session', {
        cartItems: cartItems.value
      })

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      })

      if (error) {
        console.error('Error redirecting to checkout:', error)
        loadingPayment.value = false
      }
    }

    onMounted(() => {
      fetchCartItems()
    })

    return {
      cartItems,
      removeFromCart,
      subtotal,
      total,
      goToPayment,
      loadingPayment
    }
  }
}
</script>
