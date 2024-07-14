<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen">
            <h1 class="text-[4rem] font-monospace text-center mt-4 mb-8">Esercitazioni</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center p-8">
                <div v-for="(course, index) in Object.keys(exercises)" :key="index" class="bg-white shadow rounded-lg p-4 cursor-pointer" @click="openModal(course)">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold text-indigo-500 font-monospace uppercase">{{ course }}
                        </h2>
                        <span v-if="isCourseCompleted(course)" class="text-green-700 bg-green-200 font-monospace uppercase text-2xl w-min p-2 rounded-xl">Completato</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 backdrop-filter backdrop-blur-lg bg-opacity-80 flex items-center justify-center z-[99999]">
            <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-[60rem] h-[40rem] overflow-auto relative">
                <h3 class="text-3xl font-bold mb-4 uppercase text-indigo-500">{{ currentCourse }}</h3>
                <div v-if="currentExercises" class="space-y-4">
                    <div v-for="(exercise, idx) in currentExercises" :key="idx" class="p-4 bg-neutral-100 rounded-xl flex justify-between items-center">
                        <div class="font-bold">{{ exercise.title }}</div>
                        <div class="flex items-center gap-4">
                            <div v-if="exercise.completed" class="text-green-700 bg-green-200 w-min p-2 rounded-xl">Completato</div>
                            <router-link :to="`/esercitazioni/${currentCourse.toLowerCase()}/${exercise.id}`" class="bg-YellowWebAcademy rounded-xl text-neutral-700 p-2 hover:underline">
                                Vai all'esercizio
                            </router-link>
                        </div>
                    </div>
                </div>
                <button @click="closeModal" class="absolute top-0 right-4 mt-6"><IconaChiusura /></button>
            </div>
        </div>

        <div v-if="showInitialModal" class="fixed inset-0 backdrop-filter backdrop-blur-lg bg-opacity-80 flex items-center justify-center z-[99999]">
            <div class="bg-white rounded-2xl shadow-lg p-8 w-96">
                <h3 class="text-lg font-bold">Premio di Completamento</h3>
                <p class="mt-4">Compila ed esegui correttamente tutti gli esercizi per ricevere un template HTML, CSS e JS di un sito completamente gratuito per il tuo progetto!</p>
                <button @click="closeInitialModal" class="mt-6 bg-indigo-500 text-white py-2 px-4 rounded">Ok</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import autoAnimate from '@formkit/auto-animate'
import Nav from '../components/NavHomepage.vue'
import IconaChiusura from '../components/icons/IconaChiusura.vue'
import Footer from '../components/FooterHomepage.vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'

export default {
    name: 'EsercitazioniView',
    components: {
        Nav,
        IconaChiusura,
        Footer
    },
    setup() {
        const exercises = ref({
            html: [],
            css: [],
            javascript: [],
            tailwind: []
        })
        const showModal = ref(false)
        const showInitialModal = ref(false)
        const currentCourse = ref(null)
        const currentExercises = ref(null)
        const user = ref(null)

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

        const isCourseCompleted = (course) => {
            const courseExercises = exercises.value[course.toLowerCase()]
            return courseExercises.length > 0 && courseExercises.every(exercise => exercise.completed)
        }

        const openModal = (course) => {
            currentCourse.value = course
            currentExercises.value = exercises.value[course.toLowerCase()]
            showModal.value = true
        }

        const closeModal = () => {
            showModal.value = false
        }

        const closeInitialModal = () => {
            showInitialModal.value = false
            Cookies.set('modalRead', 'true', { expires: 1 })
        }

        onMounted(() => {
            fetchExercises()

            const modalRead = Cookies.get('modalRead')
            if (!modalRead) {
                showInitialModal.value = true
            }
        })

        return {
            exercises,
            showModal,
            showInitialModal,
            currentCourse,
            currentExercises,
            openModal,
            closeModal,
            closeInitialModal,
            isCourseCompleted
        }
    }
}
</script>

<style scoped>
.font-monospace {
  font-family: monospace;
}
</style>
