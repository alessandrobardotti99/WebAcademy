<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-monospace text-center mt-4 mb-8">Esercitazione HTML</h1>
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
                    <button @click="checkExercise" :class="exercise.completed ? 'bg-green-600' : 'bg-indigo-600'" class="text-white py-2 px-4 rounded-lg">
                        {{ exercise.completed ? 'Completato' : 'Verifica' }}
                    </button>
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
    name: 'HtmlExercisesView',
    components: {
        Nav,
        IconaBack
    },
    data() {
        return {
            exercise: null,
            user: null
        }
    },
    async mounted() {
        const exerciseId = this.$route.params.exerciseId

        // Load session from cookies
        const session = Cookies.get('supabaseSession')
        if (session) {
            const parsedSession = JSON.parse(session)
            this.user = parsedSession.user
        }

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
            }
        }
    },
    methods: {
        async checkExercise() {
            if (this.exercise.userCode.trim() === this.exercise.correct_code.trim()) {
                this.exercise.feedback = "Corretto! Ottimo lavoro."
                this.exercise.isCorrect = true
                this.exercise.completed = true

                // Update user_exercises table
                const { error } = await supabase
                    .from('user_exercises')
                    .upsert({ user_id: this.user.id, exercise_id: this.exercise.id, completed: true }, { onConflict: ['user_id', 'exercise_id'] })

                if (error) {
                    console.error('Error updating exercise:', error)
                }

                // Save the state of exercises in cookies
                const savedExercises = Cookies.get('completedExercises')
                    ? JSON.parse(Cookies.get('completedExercises'))
                    : {}
                savedExercises[this.exercise.id] = true
                Cookies.set('completedExercises', JSON.stringify(savedExercises), { expires: 7 })
            } else {
                this.exercise.feedback = "Sbagliato. Riprova."
                this.exercise.isCorrect = false
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
