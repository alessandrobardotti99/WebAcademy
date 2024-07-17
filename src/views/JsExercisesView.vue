<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-bold text-center font-monospace">Esercitazione JavaScript</h1>
            <router-link to="/esercitazioni">
                <div
                    class="text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-2 mb-8">
                    <span>
                        <IconaBack />
                    </span>
                </div>
            </router-link>
            <div class="space-y-8" v-if="exercise">
                <div
                    class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer bg-white text-lg lg:text-xl w-full text-black font-medium mb-4">
                    <h2 class="text-2xl font-bold mb-4 font-monospace">{{ exercise.title }}</h2>
                    <code class="mb-4">{{ exercise.description }}</code>
                    <textarea v-model="exercise.userCode"
                        class="my-0 mt-4 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer bg-white text-lg lg:text-xl w-full text-black font-medium mb-4"
                        rows="5"></textarea>
                    <div class="flex items-center justify-between">
                        <button @click="checkExercise"
                            :class="exercise.completed ? 'text-green-700 bg-green-300 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium flex gap-2 items-center whitespace-nowrap justify-center' : 'text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap'"
                            class="py-2 px-4 rounded-lg">
                            {{ exercise.completed ? 'Completato' : 'Verifica' }}
                        </button>
                        <router-link v-if="exercise.completed" :to="`/esercitazioni/js/${nextExerciseId}`"
                            class="text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-3">
                            Vai al prossimo esercizio
                            <IconaBack class="rotate-180 text-black" />
                        </router-link>
                    </div>
                    <p v-if="exercise.feedback"
                        :class="{ 'text-green-600': exercise.isCorrect, 'text-red-600': !exercise.isCorrect }"
                        class="mt-4">
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
    name: 'JsExercisesView',
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

           
            const { data: exercise, error } = await supabase
                .from('exercises')
                .select('*')
                .eq('id', exerciseId)
                .single()

            if (error) {
                console.error('Error fetching exercise:', error)
            } else {
               
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

            const expectedJsSolutions = {
                'Esercizio 1: Hello World': 'console.log("Hello World");',
                'Esercizio 2: Somma due numeri': 'function somma(a, b) { return a + b; }',
                'Esercizio 3: Cambiare contenuto': 'document.getElementById("myElement").innerHTML = "Nuovo Contenuto";',
                'Esercizio 4: Creare un array': 'let array = [1, 2, 3]; array.forEach(function(item) { console.log(item); });',
                'Esercizio 5: Aggiungere evento click': 'document.getElementById("myButton").addEventListener("click", function() { alert("Button clicked"); });',
                'Esercizio 6: Creare oggetto': 'let persona = { nome: "Mario", eta: 30 }; console.log(persona.nome);',
                'Esercizio 7: If-else': 'let eta = 18; if (eta >= 18) { console.log("Adulto"); } else { console.log("Minorenne"); }',
                'Esercizio 8: Funzione massimo': 'function massimo(array) { return Math.max(...array); }',
                'Esercizio 9: Manipolare DOM': 'let nuovoElemento = document.createElement("div"); nuovoElemento.innerHTML = "Nuovo Elemento"; document.body.appendChild(nuovoElemento);',
                'Esercizio 10: Usare fetch': 'fetch("https://api.example.com/data").then(response => response.json()).then(data => console.log(data));'
            }

            const expectedSolution = expectedJsSolutions[exercise.title]

           
            isCorrect = exercise.userCode.trim() === expectedSolution.trim()

            if (isCorrect) {
                exercise.feedback = "Corretto! Ottimo lavoro."
                exercise.isCorrect = true
                exercise.completed = true

                
                supabase
                    .from('user_exercises')
                    .upsert({ user_id: this.user.id, exercise_id: this.exercise.id, completed: true }, { onConflict: ['user_id', 'exercise_id'] })
                    .then(({ error }) => {
                        if (error) {
                            console.error('Error updating exercise:', error)
                        }

                      
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