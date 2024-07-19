<template>
  <div class="min-h-screen bg-indigo-500 flex items-center justify-center">
    <div class="p-8 rounded-lg text-center">
      <img src="/src/assets/img/logoWebAcademy-removebg-white.png" alt="logoWebAcademy"
        class="max-w-full w-[600px] m-auto mb-10">
      <div class="text-center m-auto">
        <IconaOrdineCompletato class="m-auto" />
      </div>
      <h1 class="text-4xl font-bold mb-4 text-white font-monospace">Ordine Completato!</h1>
      <p class="text-white mb-8">Grazie per il tuo acquisto! Il tuo ordine è stato completato con successo. <br> Visita
        la pagina dei corsi acquistati, all'interno del tuo profilo, per iniziare ad imparare.</p>
      <router-link to="/profilo?tab=orders" @click.native="clearCart"
        class="text-neutral-800 hover:underline p-4 bg-YellowWebAcademy mt-8 rounded-xl">Vai al profilo</router-link>
    </div>
  </div>
</template>

<script>
import IconaOrdineCompletato from '../components/icons/IconaOrdineCompletato.vue'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { supabase } from '../supabase'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default {
  name: 'OrderCompleted',
  components: {
    IconaOrdineCompletato
  },
  setup() {
    const userStore = useUserStore()
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

    const saveOrder = async () => {
      if (userStore.user) {
        const user = userStore.user
        try {
          for (const item of cartItems) {
            const { data, error } = await supabase
              .from('orders')
              .insert([{
                id: uuidv4(),
                user_id: user.id,
                course_id: item.id,
                purchase_date: new Date().toISOString()
              }])

            if (error) {
              throw error
            } else {
              console.log('Order inserted:', data)
              // Chiamata per inviare l'email di conferma
              await sendConfirmationEmail(user.email, item)
            }
          }
          localStorage.removeItem('cartItems')
        } catch (error) {
          console.error('Error saving order:', error)
        }
      }
    }

    const clearCart = async () => {
      if (userStore.user) {
        const user = userStore.user
        try {
          const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', user.id)

          if (error) {
            console.error('Error clearing cart:', error)
          } else {
            console.log('Cart cleared for user:', user.id)
          }
        } catch (error) {
          console.error('Error clearing cart:', error)
        }
      }
    }

    const sendConfirmationEmail = async (email, course) => {
      const emailData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_USER_ID,
        template_params: {
          to_name: email,
          course_title: course.title,
          course_duration: course.duration,
        }
      };

      console.log("Sending email with data:", emailData); // Debug info

      try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log('Email sent successfully:', response.data);
        } else {
          console.error('Failed to send email:', response.data);
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error.response ? error.response.data : error.message);
      }
    };


    onMounted(() => {
      saveOrder()
    });

    return {
      clearCart
    }
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
</style>
