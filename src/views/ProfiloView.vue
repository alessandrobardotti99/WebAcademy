<template>
  <Nav />
  <div class="bg-white min-h-screen flex">
    <div class="flex w-full max-w-[1800px] mr-auto ml-auto">
      <aside class="w-1/4 min-h-screen p-8 border-r-4 border-gray-900 bg-white">
        <ul>
          <li class="mb-2">
            <button @click="currentTab = 'profile'"
              :class="{ 'text-black font-bold': currentTab === 'profile', 'text-neutral-800 p-4 bg-white rounded-md ': currentTab !== 'profile' }"
              class="my-0   py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap">Profilo</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'orders'"
              :class="{ 'text-black font-bold': currentTab === 'orders', 'text-neutral-800 p-4 bg-white rounded-md': currentTab !== 'orders' }"
              class="my-0   py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap">Corsi
              acquistati</button>
          </li>
          <li class="mb-2">
            <button @click="currentTab = 'settings'"
              :class="{ 'text-black font-bold': currentTab === 'settings', 'text-neutral-800 p-4 bg-white rounded-md': currentTab !== 'settings' }"
              class="my-0   py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap">Impostazioni</button>
          </li>
          <li class="mb-2" v-if="isAdmin">
            <button @click="currentTab = 'adminOrders'"
              :class="{ 'text-black font-bold': currentTab === 'adminOrders', 'text-neutral-800 p-4 bg-white rounded-md': currentTab !== 'adminOrders' }"
              class="my-0 py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap">
              Ordini
            </button>
          </li>

        </ul>
      </aside>
      <main class="w-3/4 p-4">
        <div class="mx-auto">
          <div v-if="currentTab === 'profile'">
            <div v-if="user">
              <h1 class="text-4xl font-bold mb-8 font-monospace text-indigo-500 text-[4rem] mt-4">Profilo Utente</h1>
              <div class="mb-4">
                <label class="text-lg lg:text-xl w-full text-black font-medium">Email corrente:</label>
                <input v-model="user.email" disabled
                  class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
              </div>
              <div class="mb-4">
                <label class="text-lg lg:text-xl w-full text-black font-medium">Ultimo accesso:</label>
                <input v-model="formattedLastSignIn" disabled
                  class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
              </div>
              <div class="mb-4">
                <label class="text-lg lg:text-xl w-full text-black font-medium">Account creato il:</label>
                <input v-model="formattedCreatedAt" disabled
                  class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
              </div>

              <!-- Dropdown per aggiornare l'email -->

            </div>
            <div v-else class="text-center text-gray-500">
              <span class="text-start text-black leading-8 font-semibold text-xl mb-5 mt-16">Caricamrnto in
                corso...</span>
            </div>
          </div>

          <div v-if="currentTab === 'orders'">
            <h1 class="text-4xl font-bold mb-8 font-monospace text-indigo-500 mt-4 text-[4rem]">Corsi acquistati</h1>
            <div v-if="purchasedCourses.length">
              <ul>
                <li v-for="course in purchasedCourses" :key="course.id"
                  class="my-0   py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal bg-white text-lg lg:text-xl w-full text-black font-medium mb-4">
                  <h3 class="text-xl font-bold text-indigo-500 mt-4 mb-2 underline">{{ course.title }}</h3>
                  <p>{{ course.description }}</p>
                  <span class="text-gray-500">Acquistato il: {{ formatDate(course.purchase_date) }}</span>
                  <div @click="toggleDropdown(course.id)"
                    class="my-0 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-grey-100 flex items-center justify-between text-lg lg:text-xl w-full text-black font-medium mb-4 mt-4">
                    <span class="text-lg font-bold">Video del corso</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                      stroke="currentColor"
                      :class="{ 'transform rotate-90': isOpen(course.id), 'ml-2': true, 'w-8': true, 'h-8': true, 'transition-transform': true }">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                  </div>
                  <transition name="accordion">
                    <div v-if="isOpen(course.id)">
                      <ul v-if="course.videos.length">
                        <li v-for="video in course.videos" :key="video.id"
                          class="my-0   py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap">
                          <div class="flex justify-between items-center text-white">
                            <div>
                              {{ video.title }}
                              <p>{{ video.description }}</p>
                            </div>
                            <div>
                              <router-link
                                :to="{ name: 'VideoView', params: { id: video.id, title: video.title, courseId: course.id } }"
                                class="my-0   py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">
                                <button>Vai al video</button> </router-link>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div v-else class="text-gray-500 p-4">
                        <span class="text-start text-black leading-8 font-semibold text-xl mb-5 mt-16">Nessun video
                          disponibile...</span>
                      </div>
                    </div>
                  </transition>
                </li>
              </ul>
            </div>
            <div v-else class="text-center text-gray-500">
              <span class="text-start text-black leading-8 font-semibold text-xl mb-5 mt-16">Nessun corso
                trovato...</span>
            </div>
          </div>

          <div v-if="currentTab === 'adminOrders' && isAdmin">
            <h1 class="text-4xl font-bold mb-8 font-monospace text-indigo-500 mt-4 text-[4rem]">Ordini</h1>
            <div v-if="allOrders.length">
              <ul>
                <li v-for="order in allOrders" :key="order.id"
                  class="my-0 py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal bg-white text-lg lg:text-xl w-full text-black font-medium mb-4">
                  <h3 class="text-xl font-bold text-indigo-500 mt-4 mb-2 underline">{{ order.courseTitle }}</h3>
                  <p>{{ order.email }}</p>
                  <span class="text-gray-500">Acquistato il: {{ formatDate(order.purchase_date) }}</span>
                  <div class="flex mt-4">
                    <button @click="confirmDeleteOrder(order.id)"
                      class="mr-2 text-white bg-red-500 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl font-medium">Elimina
                      Ordine</button>
                    <button @click="confirmDeleteUser(order.user_id)"
                      class="text-white bg-red-500 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl font-medium">Elimina
                      Utente</button>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="text-center text-gray-500">
              <span class="text-start text-black leading-8 font-semibold text-xl mb-5 mt-16">Nessun ordine
                trovato...</span>
            </div>
          </div>




          <div v-if="currentTab === 'settings'">
            <h1 class="text-4xl font-bold mb-8 font-monospace text-indigo-500 text-[4rem] mt-4">Impostazioni</h1>
            <div @click="toggleDropdown('email')"
              class="my-0 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-grey-100 flex items-center justify-between text-lg lg:text-xl w-full text-black font-medium mb-4 mt-4">
              <span class="text-lg font-bold">Modifica email</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor"
                :class="{ 'transform rotate-90': isOpen('email'), 'ml-2': true, 'w-8': true, 'h-8': true, 'transition-transform': true }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <transition name="accordion">
              <div v-if="isOpen('email')">
                <div class="mb-4">
                  <label class="text-lg lg:text-xl w-full text-black font-medium mb-4">Inserisci la nuova
                    email:</label>
                  <input v-model="newEmail"
                    class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
                  <button @click="updateEmail"
                    class="text-white bg-indigo-500 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl font-medium whitespace-nowrap mt-2">
                    Aggiorna Email
                  </button>
                </div>
              </div>
            </transition>

            <!-- Dropdown per aggiornare la password -->
            <div @click="toggleDropdown('password')"
              class="my-0 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-grey-100 flex items-center justify-between text-lg lg:text-xl w-full text-black font-medium mb-4 mt-4">
              <span class="text-lg font-bold">Modifica password</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor"
                :class="{ 'transform rotate-90': isOpen('password'), 'ml-2': true, 'w-8': true, 'h-8': true, 'transition-transform': true }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <transition name="accordion">
              <div v-if="isOpen('password')">
                <div class="mb-4">
                  <label class="text-lg lg:text-xl w-full text-black font-medium mb-4">Nuova Password:</label>
                  <input type="password" v-model="newPassword"
                    class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
                </div>
                <div class="mb-4">
                  <label class="text-lg lg:text-xl w-full text-black font-medium mb-4">Conferma Password:</label>
                  <input type="password" v-model="confirmPassword"
                    class="p-4 bg-white my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2" />
                  <button @click="updatePassword"
                    class="text-white bg-indigo-500 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl font-medium whitespace-nowrap mt-2">
                    Aggiorna Password
                  </button>
                </div>
              </div>
            </transition>
            <hr class="border-2 border-black mt-8 mb-8">
            <p class="mt-4 text-start text-black leading-8 font-semibold text-xl mb-5">Eliminando l'account verranno
              cancellati i dati in modo permanente e si perderà l'accesso ai corsi
              acquistati.

              Non verranno risarciti corsi di account cancellati per errore.</p>
            <button @click="showDeleteModal = true"
              class="p-4 bg-red-300 rounded-md cursor-pointer my-0 py-2 px-4 border-4 border-gray-900 shadow-brutal active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl w-min text-red-500 font-medium mb-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              Elimina Account
            </button>
            <!-- Modal per eliminare l'account -->
            <div v-if="showDeleteModal"
              class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div
                class="max-w-md p-4 bg-white rounded-md my-0 py-2 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer text-lg lg:text-xl w-full text-black font-medium mb-2">
                <h2 class="text-4xl font-bold mb-4 text-center mt-2">Attenzione!</h2>
                <p class="mb-4 text-center">Eliminando l'account verranno cancellati i dati in modo permanente e si
                  perderà
                  l'accesso ai corsi acquistati.</p>
                <p class="mb-4 text-center">Non verranno risarciti corsi di account cancellati per errore.</p>
                <p class="mb-4 text-center">Per confermare, scrivi <span class="text-red-500 font-bold">"elimina"</span>
                  nel campo sottostante.</p>
                <input v-model="deleteConfirmation" type="text"
                  class="p-4 bg-white hover:bg-neutral-200 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer text-lg lg:text-xl w-full text-black font-medium mb-2 whitespace-nowrap mt-2"
                  placeholder="Scrivi 'elimina' per confermare">
                <div class="flex justify-between mt-8 mb-4">
                  <button @click="showDeleteModal = false"
                    class="p-4 bg-white rounded-md my-0 py-2 px-4  border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl w-min text-black font-medium mb-2 whitespace-nowrap">Annulla</button>
                  <button @click="confirmDeleteAccount" :disabled="deleteConfirmation !== 'elimina'"
                    class="p-4 bg-red-300 rounded-md cursor-pointer my-0 py-2 px-4  border-4 border-gray-900 shadow-brutal active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] text-lg lg:text-xl w-min text-red-500 font-medium mb-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                    Elimina
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/user.js';
import axios from 'axios';
import { supabase } from '../supabase';
import { format } from 'date-fns';
import { useToast } from 'vue-toastification'
import Nav from '../components/NavHomepage.vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ProfileView',
  components: {
    Nav,
  },
  setup() {
    const userStore = useUserStore();
    const user = ref(null);
    const purchasedCourses = ref([]);
    const route = useRoute();
    const router = useRouter();
    const currentTab = ref(route.query.tab || 'profile');
    const openDropdowns = ref([]);
    const showDeleteModal = ref(false);
    const deleteConfirmation = ref('');
    const newEmail = ref('');
    const allOrders = ref([]);
    const newPassword = ref('');
    const confirmPassword = ref('');
    const toast = useToast()
    const isAdmin = ref(false);

    const fetchProfile = async () => {
      userStore.loadSessionFromCookies();
      if (userStore.user) {
        user.value = userStore.user;
        isAdmin.value = user.value.email === 'alessandrobardotti99@gmail.com';
        await fetchPurchasedCourses(user.value.id);
        if (isAdmin.value) {
          await fetchAllOrders();
        }
      }
    };

    const fetchPurchasedCourses = async (userId) => {
      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('course_id, purchase_date')
          .eq('user_id', userId);

        if (error) {
          console.error('Error fetching orders:', error);
          return;
        }

        const courseIds = orders.map(order => order.course_id);
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds);

        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          return;
        }

        // Fetch videos for each course
        for (const course of courses) {
          const { data: videos, error: videosError } = await supabase
            .from('course_videos')
            .select('*')
            .eq('course_id', course.id);

          if (videosError) {
            console.error('Error fetching videos:', videosError);
            course.videos = [];
          } else {
            course.videos = videos;
          }
        }

        purchasedCourses.value = courses.map(course => {
          const order = orders.find(order => order.course_id === course.id);
          return { ...course, purchase_date: order.purchase_date };
        });
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    const fetchAllOrders = async () => {
      try {
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*');

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
          return;
        }

        // Fetch users from your backend server
        const response = await axios.get('http://localhost:3000/api/users');
        const users = response.data;

        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*');

        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          return;
        }

        allOrders.value = orders.map(order => {
          const user = users.find(user => user.id === order.user_id);
          const course = courses.find(course => course.id === order.course_id);
          return {
            ...order,
            email: user ? user.email : 'Unknown',
            courseTitle: course ? course.title : 'Unknown'
          }
        });
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };


    const confirmDeleteOrder = async (orderId) => {
      const password = prompt('Inserisci la tua password per confermare l\'eliminazione dell\'ordine:');
      if (password) {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: user.value.email,
            password: password,
          });

          if (error) {
            toast.error('Password errata. Eliminazione annullata.');
            return;
          }

          await deleteOrder(orderId);
        } catch (error) {
          toast.error('Errore durante l\'eliminazione dell\'ordine: ' + error.message);
        }
      }
    };

    const confirmDeleteUser = async (userId) => {
      const password = prompt('Inserisci la tua password per confermare l\'eliminazione dell\'utente:');
      if (password) {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: user.value.email,
            password: password,
          });

          if (error) {
            toast.error('Password errata. Eliminazione annullata.');
            return;
          }

          await deleteUser(userId);
        } catch (error) {
          toast.error('Errore durante l\'eliminazione dell\'utente: ' + error.message);
        }
      }
    };

    const deleteOrder = async (orderId) => {
      try {
        const { error } = await supabase
          .from('orders')
          .delete()
          .eq('id', orderId);

        if (error) {
          toast.error('Errore durante l\'eliminazione dell\'ordine: ' + error.message);
          return;
        }

        toast.success('Ordine eliminato con successo!');
        await fetchAllOrders();
      } catch (error) {
        toast.error('Errore durante l\'eliminazione dell\'ordine: ' + error.message);
      }
    };

    const deleteUser = async (userId) => {
      try {
        const { error: deleteOrdersError } = await supabase
          .from('orders')
          .delete()
          .eq('user_id', userId);

        if (deleteOrdersError) {
          toast.error('Errore durante l\'eliminazione degli ordini dell\'utente: ' + deleteOrdersError.message);
          return;
        }

        const { error } = await supabase
          .rpc('delete_user', { uid: userId });

        if (error) {
          toast.error('Errore durante l\'eliminazione dell\'utente: ' + error.message);
          return;
        }

        toast.success('Utente eliminato con successo!');
        await fetchAllOrders();
      } catch (error) {
        toast.error('Errore durante l\'eliminazione dell\'utente: ' + error.message);
      }
    };




    const deleteAccount = async () => {
      try {
        // Elimina gli ordini dell'utente
        const { error: deleteOrdersError } = await supabase
          .from('orders')
          .delete()
          .eq('user_id', user.value.id);

        if (deleteOrdersError) {
          console.error('Error deleting orders:', deleteOrdersError);
          return;
        }

        // Elimina l'account utente
        const { data, error } = await supabase
          .rpc('delete_user', { uid: user.value.id });

        if (error) {
          console.error('Error deleting account:', error);
          return;
        }
        toast.success('Profilo eliminato con successo!');
        userStore.removeSession();
        router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    };

    const confirmDeleteAccount = async () => {
      if (deleteConfirmation.value === 'elimina') {
        await deleteAccount();
        showDeleteModal.value = false;
      }
    };

    const updatePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        toast.error('Le password non corrispondono');
        return;
      }
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword.value });
        if (error) {
          toast.error('Errore durante l\'aggiornamento della password: ' + error.message);
          console.error('Error updating password:', error);
          return;
        }
        toast.success('Password cambiata con successo!');
        fetchProfile();
      } catch (error) {
        toast.error('Errore durante l\'aggiornamento della password: ' + error.message);
        console.error('Error updating password:', error);
      }
    };

    const updateEmail = async () => {
      try {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail.value });
        if (error) {
          toast.error('Errore durante l\'aggiornamento dell\'email: ' + error.message);
          console.error('Error updating email:', error);
          return;
        }
        if (data.email_change_confirm_status === 1) {
          console.log('Email change confirmed.');
        } else {
          console.log('Please confirm the email change by clicking on the confirmation link sent to your new email.');
        }
        toast.success('Email aggiornata con successo!');
        fetchProfile();
      } catch (error) {
        toast.error('Errore durante l\'aggiornamento dell\'email: ' + error.message);
        console.error('Error updating email:', error);
      }
    };

    onMounted(() => {
      fetchProfile();
    });

    const formattedLastSignIn = computed(() => {
      return user.value ? format(new Date(user.value.last_sign_in_at), 'dd/MM/yyyy HH:mm:ss') : '';
    });

    const formattedCreatedAt = computed(() => {
      return user.value ? format(new Date(user.value.created_at), 'dd/MM/yyyy HH:mm:ss') : '';
    });

    const formatDate = (date) => {
      return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    };

    const toggleDropdown = (dropdown) => {
      if (openDropdowns.value.includes(dropdown)) {
        openDropdowns.value = openDropdowns.value.filter(id => id !== dropdown);
      } else {
        openDropdowns.value.push(dropdown);
      }
    };

    const isOpen = (dropdown) => {
      return openDropdowns.value.includes(dropdown);
    };

    return {
      user,
      formattedLastSignIn,
      formattedCreatedAt,
      purchasedCourses,
      formatDate,
      currentTab,
      toggleDropdown,
      isOpen,
      showDeleteModal,
      deleteConfirmation,
      confirmDeleteAccount,
      newEmail,
      newPassword,
      confirmPassword,
      updateEmail,
      updatePassword,
      isAdmin,
      allOrders,
      confirmDeleteOrder,
      confirmDeleteUser,  // Aggiungi queste righe
      deleteOrder,
      deleteUser
    };
  },
};


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
