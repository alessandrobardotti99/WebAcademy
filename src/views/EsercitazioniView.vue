<template>
    <div class="bg-gray-100">
        <Nav />
        <div class="bg-gray-100 h-screen">
            <h1 class="text-[4rem] font-monospace text-center mb-4 pt-8">Esercitazioni</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center p-8 max-w-[1800px] ml-auto mr-auto">
                <div v-for="(course, index) in Object.keys(exercises)" :key="index"
                    class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium flex gap-2 items-center whitespace-nowrap justify-between"
                    @click="openModal(course)">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold text-indigo-500 font-monospace uppercase">{{ course }}</h2>
                    </div>
                    <div>
                        <span v-if="isCourseCompleted(course)"
                            class="text-green-700 bg-green-300 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-full font-medium flex gap-2 items-center whitespace-nowrap justify-center">Completato</span>
                    </div>
                </div>
            </div>
            <div class="p-8">
            <div class="text-center my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal bg-white text-lg lg:text-xl w-fulltext-black font-medium flex gap-2 items-center whitespace-nowrap justify-between">
                <p v-if="!allCoursesCompleted()" class="text-black">Completa tutti gli esercizi per poter
                    scaricare il template</p>
                <a :href="allCoursesCompleted() ? 'link-al-template.zip' : '#'"
                    :class="{ 'cursor-not-allowed opacity-50': !allCoursesCompleted() }"
                    class="text-white bg-indigo-500 my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal text-lg lg:text-xl font-medium whitespace-nowrap flex items-center gap-2"
                    :disabled="!allCoursesCompleted()">
                    Scarica il Template <IconaLucchetto />
                </a>
                
            </div>
        </div>
        </div>
        <Footer />
        <!-- Modal -->
        <div v-if="showModal"
            class="fixed inset-0 backdrop-filter backdrop-blur-lg bg-opacity-80 flex items-center justify-center z-[99999]">
            <div
                class="bg-white rounded-md my-0 py-4 px-4 border-4 border-gray-900 shadow-brutal p-8 w-full max-w-[60rem] h-[40rem] overflow-auto relative">
                <h3 class="text-5xl font-bold mb-8 uppercase text-indigo-500">{{ currentCourse }}</h3>
                <div v-if="currentExercises" class="space-y-4">
                    <div v-for="(exercise, idx) in currentExercises" :key="idx"
                        class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2   p-4 mb-4 cursor-pointer flex items-center justify-between">
                        <div class="font-bold">{{ exercise.title }}</div>
                        <div class="flex items-center gap-4">
                            <div v-if="exercise.completed"
                                class="my-0 mx-1 py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-green-300 text-lg lg:text-xl w-full text-green-700 font-medium text-center whitespace-nowrap">
                                Completato</div>
                            <router-link :to="`/esercitazioni/${currentCourse.toLowerCase()}/${exercise.id}`"
                                class="my-0 mx-1 py-2 px-4 rounded-md border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-full text-black font-medium flex gap-2 items-center whitespace-nowrap">
                                Vai all'esercizio
                            </router-link>
                        </div>
                    </div>
                </div>
                <button @click="closeModal" class="absolute top-0 right-4 mt-6">
                    <IconaChiusura />
                </button>
            </div>
        </div>

        <div v-if="showInitialModal"
            class="fixed inset-0 backdrop-filter backdrop-blur-lg bg-opacity-80 flex items-center justify-center z-[99999]">
            <div
                class="max-w-md p-16 bg-white rounded-md my-0 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer text-lg lg:text-xl text-black font-medium mb-2 w-[30rem] ">
                <h3 class="text-3xl font-bold text-center">Premio di Completamento</h3>
                <p class="mt-4 text-center">Compila ed esegui correttamente tutti gli esercizi per ricevere un template
                    HTML, CSS e JS di un sito completamente gratuito per il tuo progetto!</p>
                <button @click="closeInitialModal"
                    class="my-0 mt-4 mb-4 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-full text-black font-medium">Iniziamo!</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Nav from '../components/NavHomepage.vue'
import IconaChiusura from '../components/icons/IconaChiusura.vue'
import IconaLucchetto from '../components/icons/IconaLucchetto.vue'
import Footer from '../components/FooterHomepage.vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'

export default {
    name: 'EsercitazioniView',
    components: {
        Nav,
        IconaChiusura,
        Footer,
        IconaLucchetto
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

        const allCoursesCompleted = () => {
            return Object.keys(exercises.value).every(course => isCourseCompleted(course));
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
            isCourseCompleted,
            allCoursesCompleted
        }
    }
}
</script>

<style scoped>
.font-monospace {
    font-family: monospace;
}
</style>
