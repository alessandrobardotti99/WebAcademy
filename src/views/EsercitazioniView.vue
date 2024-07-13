<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-monospace text-center mt-4 mb-8">Esercitazioni</h1>
            <div class="flex flex-col gap-4 justify-center">
                <div v-for="(course, index) in Object.keys(exercises)" :key="index" ref="setDropdownRef"
                    class="bg-white shadow rounded-lg p-4">
                    <div @click="toggleDropdown(index)" class="flex justify-between items-center cursor-pointer">
                        <h2 class="text-2xl font-bold text-indigo-500 font-monospace">{{ course }}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" :class="{
                    'rotate-180': showDropdown[index],
                    'ml-2': true,
                    'w-6': true,
                    'h-6': true,
                    'transition-transform': true,
                }">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div v-if="showDropdown[index]" class="list-disc list-inside mt-4">
                        <div v-for="(exercise, idx) in exercises[course]" :key="idx" class="ml-4 p-4 mb-4 bg-neutral-100 rounded-xl flex justify-between items-center">
                            <div>
                                <div v-if="exercise.completed" class="text-green-700 bg-green-200 w-min p-2 rounded-xl mb-2 border-2 border-green-400">Completato</div>
                                {{ exercise.title }}
                            </div>
                            <router-link :to="`/esercitazioni/${course.toLowerCase()}/${exercise.id}`" class="text-blue-500 hover:underline">
                                Vai all'esercizio
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="fixed inset-0 backdrop-filter backdrop-blur-lg bg-opacity-80 flex items-center justify-center z-[99999]">
            <div class="bg-white rounded-2xl shadow-lg p-8 w-96">
                <h3 class="text-lg font-bold">Premio di Completamento</h3>
                <p class="mt-4">Compila ed esegui correttamente tutti gli esercizi per ricevere un template HTML, CSS e JS di un sito completamente gratuito per il tuo progetto!</p>
                <button @click="closeModal" class="mt-6 bg-indigo-500 text-white py-2 px-4 rounded">Ok</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import autoAnimate from '@formkit/auto-animate'
import Nav from '../components/NavHomepage.vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'

export default {
    name: 'EsercitazioniView',
    components: {
        Nav
    },
    setup() {
        const exercises = ref({
            html: [],
            css: [],
            javascript: [],
            tailwind: []
        })
        const showDropdown = ref([false, false, false, false])
        const dropdownRefs = ref([]) // Array to store refs to dropdown elements
        const user = ref(null)
        const showModal = ref(false)

        const fetchExercises = async () => {
            const session = Cookies.get('supabaseSession')
            if (session) {
                const parsedSession = JSON.parse(session)
                user.value = parsedSession.user

                const { data: allExercises, error } = await supabase
                    .from('exercises')
                    .select('*')
                    .order('id', { ascending: true })

                if (error) {
                    console.error('Error fetching exercises:', error)
                } else {
                    const { data: userExercises, error: userExercisesError } = await supabase
                        .from('user_exercises')
                        .select('*')
                        .eq('user_id', user.value.id)

                    if (userExercisesError) {
                        console.error('Error fetching user exercises:', userExercisesError)
                    } else {
                        const completedExercises = userExercises.reduce((acc, curr) => {
                            acc[curr.exercise_id] = curr.completed
                            return acc
                        }, {})

                        const categorizedExercises = {
                            html: [],
                            css: [],
                            javascript: [],
                            tailwind: []
                        }

                        allExercises.forEach(exercise => {
                            const exerciseWithCompletion = {
                                ...exercise,
                                completed: completedExercises[exercise.id] || false
                            }
                            if (exercise.category === 'HTML') {
                                categorizedExercises.html.push(exerciseWithCompletion)
                            } else if (exercise.category === 'CSS') {
                                categorizedExercises.css.push(exerciseWithCompletion)
                            } else if (exercise.category === 'JavaScript') {
                                categorizedExercises.javascript.push(exerciseWithCompletion)
                            } else if (exercise.category === 'Tailwind') {
                                categorizedExercises.tailwind.push(exerciseWithCompletion)
                            }
                        })

                        exercises.value = categorizedExercises
                    }
                }
            } else {
                this.$router.push({ name: 'accedi' })
            }
        }

        const toggleDropdown = (index) => {
            showDropdown.value[index] = !showDropdown.value[index]
        }

        const closeModal = () => {
            showModal.value = false
            Cookies.set('modalRead', 'true', { expires: 7 }) // Set cookie to expire in 7 days
        }

        const setDropdownRef = (el, index) => {
            if (el) {
                dropdownRefs.value[index] = el
            }
        }

        onMounted(() => {
            fetchExercises()
            dropdownRefs.value.forEach(dropdown => {
                if (dropdown) {
                    autoAnimate(dropdown)
                }
            })

            const modalRead = Cookies.get('modalRead')
            if (!modalRead) {
                showModal.value = true
            }
        })

        return {
            exercises,
            showDropdown,
            toggleDropdown,
            setDropdownRef,
            showModal,
            closeModal
        }
    }
}
</script>


