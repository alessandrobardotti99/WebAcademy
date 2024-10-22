<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-bold text-center font-monospace">Esercitazione CSS</h1>
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
                        <router-link v-if="exercise.completed" :to="`/esercitazioni/css/${nextExerciseId}`"
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
            const exercise = this.exercise;
            let isCorrect = false;

            // Define the expected CSS rules for each exercise
            const expectedCssRules = {
                'Esercizio 1: Applicare stili di base': { 'p': { 'color': /.+/ } },
                'Esercizio 2: Cambiare il colore di sfondo': { 'body': { 'background-color': /.+/ } },
                'Esercizio 3: Aggiungere un bordo a un\'immagine': { 'img': { 'border': /.+/ } },
                'Esercizio 4: Creare una griglia di layout': { '.grid-container': { 'display': /grid/, 'grid-template-columns': /.+/ } },
                'Esercizio 5: Aggiungere stili a un link al passaggio del mouse': { 'a:hover': { 'color': /.+/ } },
                'Esercizio 6: Creare un\'animazione semplice': { '@keyframes': /.+/, '.\w+': { 'animation-name': /.+/, 'animation-duration': /.+/ } },
                'Esercizio 7: Usare Flexbox': { '.flex-container': { 'display': /flex/ } },
                'Esercizio 8: Applicare ombre': { 'h1': { 'text-shadow': /.+/ }, 'div': { 'box-shadow': /.+/ } },
                'Esercizio 9: Usare variabili CSS': { ':root': { '--\w+': /.+/ }, 'body': { 'background-color': /var\(--\w+\)/ } },
                'Esercizio 10: Creare un layout responsive': { '@media': { 'max-width': /.+/ } }
            };

            // Determine the expected rules for the current exercise
            const expectedRules = expectedCssRules[exercise.title];

            if (exercise.title === 'Esercizio 10: Creare un layout responsive') {
                const mediaQueryMatch = /@media\s*\(max-width:\s*768px\)\s*{[^}]*.grid-container\s*{\s*width:\s*100%;\s*}[^}]*}/.test(exercise.userCode);
                isCorrect = mediaQueryMatch;
            } else if (expectedRules) {
                isCorrect = Object.keys(expectedRules).every(selector => {
                    const regexProperties = expectedRules[selector];
                    return Object.keys(regexProperties).every(property => {
                        const regex = regexProperties[property];
                        const userCodeMatch = exercise.userCode.match(new RegExp(`${selector}\\s*{[^}]*${property}\\s*:[^;]+;[^}]*}`, 'g'));
                        return userCodeMatch && userCodeMatch.some(match => regex.test(match));
                    });
                });
            }

            if (isCorrect) {
                exercise.feedback = "Corretto! Ottimo lavoro.";
                exercise.isCorrect = true;
                exercise.completed = true;

                // Update user_exercises table
                supabase
                    .from('user_exercises')
                    .upsert({ user_id: this.user.id, exercise_id: this.exercise.id, completed: true }, { onConflict: ['user_id', 'exercise_id'] })
                    .then(({ error }) => {
                        if (error) {
                            console.error('Error updating exercise:', error);
                        }

                        // Save the state of exercises in cookies
                        const savedExercises = Cookies.get('completedExercises')
                            ? JSON.parse(Cookies.get('completedExercises'))
                            : {};
                        savedExercises[this.exercise.id] = true;
                        Cookies.set('completedExercises', JSON.stringify(savedExercises), { expires: 7 });
                    });
            } else {
                exercise.feedback = "Sbagliato. Riprova.";
                exercise.isCorrect = false;
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
