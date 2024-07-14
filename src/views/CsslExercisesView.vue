<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-bold mb-8 text-center">Esercitazione CSS</h1>
            <router-link to="/esercitazioni">
                <div class="text-white bg-indigo-700 p-2 rounded-xl w-min mb-4">
                    <span><IconaBack /></span>
                </div>
            </router-link>
            <div class="space-y-8" v-if="exercise">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h2 class="text-2xl font-bold mb-4 font-monospace">{{ exercise.title }}</h2>
                    <p class="mb-4">{{ exercise.description }}</p>
                    <textarea v-model="exercise.userCode" class="w-full p-2 border rounded-lg mb-4" rows="5"></textarea>
                    <div class="flex items-center justify-between">
                    <button @click="checkExercise" :class="exercise.completed ? 'bg-green-600' : 'bg-indigo-600'" class="text-white py-2 px-4 rounded-lg">
                        {{ exercise.completed ? 'Completato' : 'Verifica' }}
                    </button>
                    <router-link v-if="exercise.completed" :to="`/esercitazioni/css/${nextExerciseId}`" class="py-2 px-4 text-white rounded-xl hover:bg-indigo-600 bg-indigo-500 flex items-center gap-2">
                        Vai al prossimo esercizio <IconaBack class="rotate-180" />
                    </router-link>
                </div>
                    <p v-if="exercise.feedback" :class="{'text-green-600': exercise.isCorrect, 'text-red-600': !exercise.isCorrect}" class="mt-4">
                        {{ exercise.feedback }}
                    </p>
                    
                </div>
            </div>
            <div v-else>
                <p class="text-center text-neutral-500">Caricamento esercizio in corso...</p>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from '../components/NavHomepage.vue'
import IconaBack from '../components/icons/IconaBack.vue'
import { supabase } from '../supabase'
import Cookies from 'js-cookie'

export default {
    name: 'CssExercisesView',
    components: {
        Nav,
        IconaBack
    },
    data() {
        return {
            exercise: null,
            user: null,
            nextExerciseId: null
        }
    },
    async mounted() {
        // Load session from cookies
        const session = Cookies.get('supabaseSession')
        if (session) {
            const parsedSession = JSON.parse(session)
            this.user = parsedSession.user
        }

        this.loadExercise()
    },
    watch: {
        '$route.params.exerciseId': 'loadExercise'
    },
    methods: {
        async loadExercise() {
            const exerciseId = this.$route.params.exerciseId

            // Fetch the exercise from the database
            const { data: exercise, error } = await supabase
                .from('exercises')
                .select('*')
                .eq('id', exerciseId)
                .single()

            if (error) {
                console.error('Error fetching exercise:', error)
            } else {
                // Fetch completed exercises for the user
                const { data: userExercise, error: userExercisesError } = await supabase
                    .from('user_exercises')
                    .select('*')
                    .eq('user_id', this.user.id)
                    .eq('exercise_id', exercise.id)
                    .single()

                if (userExercisesError && userExercisesError.code !== 'PGRST116') {
                    console.error('Error fetching user exercises:', userExercisesError)
                } else {
                    this.exercise = {
                        ...exercise,
                        userCode: '',
                        feedback: '',
                        isCorrect: false,
                        completed: userExercise?.completed || false
                    }
                    this.nextExerciseId = await this.getNextExerciseId(exercise.id)
                }
            }
        },
        async getNextExerciseId(currentId) {
            // Logic to determine the next exercise ID
            const { data: nextExercise, error } = await supabase
                .from('exercises')
                .select('id')
                .gt('id', currentId)
                .order('id', { ascending: true })
                .limit(1)
                .single()

            if (error) {
                console.error('Error fetching next exercise:', error)
                return null
            } else {
                return nextExercise.id
            }
        },
        checkExercise() {
            const exercise = this.exercise
            let isCorrect = false

            // Define regex patterns for different types of exercises
            const regexPatterns = {
                'Esercizio 1: Applicare stili di base': /p\s*{\s*color:\s*[^;]+;\s*}/,
                'Esercizio 2: Cambiare il colore di sfondo': /body\s*{\s*background-color:\s*[^;]+;\s*}/,
                'Esercizio 3: Aggiungere un bordo a un\'immagine': /img\s*{\s*border:\s*[^;]+;\s*}/, 
                'Esercizio 4: Creare una griglia di layout': /\.grid-container\s*{\s*display:\s*grid;\s*grid-template-columns:[^}]*}/,
                'Esercizio 5: Aggiungere stili a un link al passaggio del mouse': /a:hover\s*{\s*color:\s*[^;]+;\s*}/,
                'Esercizio 6: Creare un\'animazione semplice': /@keyframes\s+\w+\s*{\s*from\s*{\s*\w+:\s*[^;]+;\s*}\s*to\s*{\s*\w+:\s*[^;]+;\s*}\s*}.*?\.\w+\\s*{\s*animation-name:\s*\w+;\s*animation-duration:\s*[^;]+;\s*}/,
                'Esercizio 7: Usare Flexbox': /\.flex-container\s*{\s*display:\s*flex;\s*[^}]*}/,
                'Esercizio 8: Applicare ombre': /(h1\s*{\s*text-shadow:\s*[^;]+;\s*})|(div\s*{\s*box-shadow:\s*[^;]+;\s*})/,
                'Esercizio 9: Usare variabili CSS': /:root\s*{\s*--\w+:\s*[^;]+;\s*}.*?body\s*{\s*background-color:\s*var\(--\w+\)[^;]*;\s*}/,
                'Esercizio 10: Creare un layout responsive': /@media\s*only\s*screen\s*and\s*\(max-width:\s*[^)]+\)\s*{\s*[^}]+}/
            }

            // Determine the type of exercise and apply the appropriate regex
            const pattern = regexPatterns[exercise.title];
            if (pattern) {
                isCorrect = pattern.test(exercise.userCode)
            } else {
                isCorrect = exercise.userCode.trim() === exercise.correct_code.trim()
            }

            if (isCorrect) {
                exercise.feedback = "Corretto! Ottimo lavoro."
                exercise.isCorrect = true
                exercise.completed = true

                // Update user_exercises table
                supabase
                    .from('user_exercises')
                    .upsert({ user_id: this.user.id, exercise_id: this.exercise.id, completed: true }, { onConflict: ['user_id', 'exercise_id'] })
                    .then(({ error }) => {
                        if (error) {
                            console.error('Error updating exercise:', error)
                        }

                        // Save the state of exercises in cookies
                        const savedExercises = Cookies.get('completedExercises')
                            ? JSON.parse(Cookies.get('completedExercises'))
                            : {}
                        savedExercises[this.exercise.id] = true
                        Cookies.set('completedExercises', JSON.stringify(savedExercises), { expires: 7 })
                    })
            } else {
                exercise.feedback = "Sbagliato. Riprova."
                exercise.isCorrect = false
            }
        }
    }
}
</script>



<style scoped>
.bg-gray-100 {
    background-color: #f7fafc;
}
.shadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
    border-radius: 0.5rem;
}
.p-4 {
    padding: 1rem;
}
.font-monospace {
    font-family: monospace;
}
.mb-4 {
    margin-bottom: 1rem;
}
.mt-2 {
    margin-top: 0.5rem;
}
.text-green-600 {
    color: #38a169;
}
.text-red-600 {
    color: #e53e3e;
}
</style>
