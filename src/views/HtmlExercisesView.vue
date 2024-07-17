<template>
    <div>
        <Nav />
        <div class="bg-gray-100 min-h-screen p-8">
            <h1 class="text-4xl font-bold text-center font-monospace">Esercitazione HTML</h1>
            <router-link to="/esercitazioni">
                <div class="text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-2 mb-8">
                    <span><IconaBack /></span>
                </div>
            </router-link>
            <div class="space-y-8" v-if="exercise">
                <div class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer bg-white text-lg lg:text-xl w-full text-black font-medium mb-4">
                    <h2 class="text-2xl font-bold mb-4 font-monospace">{{ exercise.title }}</h2>
                    <p class="mb-4">{{ exercise.description }}</p>
                    <textarea v-model="exercise.userCode" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" rows="5"></textarea>
                    <div class="flex items-center justify-between"> 
                    <button @click="checkExercise" :class="exercise.completed ? 'text-green-700 bg-green-300 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium flex gap-2 items-center whitespace-nowrap justify-center' : 'text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap'" class="py-2 px-4 rounded-lg">
                        {{ exercise.completed ? 'Completato' : 'Verifica' }}
                    </button>
                    <router-link v-if="exercise.completed" :to="`/esercitazioni/html/${nextExerciseId}`" class="text-black bg-indigo-500 my-0 mx-1 py-2 px-2 border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] rounded-md text-lg lg:text-xl w-min font-medium whitespace-nowrap flex items-center gap-3">
                        Vai al prossimo esercizio <IconaBack class="rotate-180 text-black" />
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
    name: 'HtmlExercisesView',
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
                'comment': /<!--.*?-->/g,
                'img': /<img\s+[^>]*src="[^"]*"[^>]*>/i,
                'link': /<a\s+[^>]*href="[^"]*"[^>]*>.*?<\/a>/i,
                'list': /<(ul|ol)>\s*<li>.*?<\/li>\s*<\/\1>/is,
                'table': /<table>.*?<tr>.*?<th>.*?<\/th>.*?<\/tr>.*?<\/table>/is,
                'form': /<form>.*?<input\s+[^>]*type="text"[^>]*>.*?<button\s+[^>]*type="submit"[^>]*>.*?<\/button>.*?<\/form>/is,
                'video': /<video\s+[^>]*controls[^>]*>.*?<source\s+[^>]*src="[^"]*"[^>]*>.*?<\/video>/is,
                'section_article': /<section>.*?<article>.*?<\/article>.*?<\/section>/is,
                'nav': /<nav>.*?<ul>.*?<li>.*?<\/li>.*?<\/ul>.*?<\/nav>/is,
                'css': /\.\w+\s*{\s*\w+:\s*[^;]+;\s*}/,
                'flex': /\.flex-container\s*{\s*display:\s*flex;\s*[^}]*}/,
                'grid': /\.grid-container\s*{\s*display:\s*grid;\s*grid-template-columns:[^}]*}/,
                'animation': /@keyframes\s+\w+\s*{\s*from\s*{\s*\w+:\s*[^;]+;\s*}\s*to\s*{\s*\w+:\s*[^;]+;\s*}\s*}.*?\.\w+\s*{\s*animation-name:\s*\w+;\s*animation-duration:\s*[^;]+;\s*}/,
                'media_query': /@media\s*only\s*screen\s*and\s*\(max-width:\s*[^)]+\)\s*{\s*[^}]+}/
            }

            // Determine the type of exercise and apply the appropriate regex
            switch (exercise.category) {
                case 'HTML':
                    if (exercise.description.includes('commento')) {
                        isCorrect = regexPatterns.comment.test(exercise.userCode)
                    } else if (exercise.description.includes('immagine')) {
                        isCorrect = regexPatterns.img.test(exercise.userCode)
                    } else if (exercise.description.includes('link')) {
                        isCorrect = regexPatterns.link.test(exercise.userCode)
                    } else if (exercise.description.includes('lista')) {
                        isCorrect = regexPatterns.list.test(exercise.userCode)
                    } else if (exercise.description.includes('tabella')) {
                        isCorrect = regexPatterns.table.test(exercise.userCode)
                    } else if (exercise.description.includes('form')) {
                        isCorrect = regexPatterns.form.test(exercise.userCode)
                    } else if (exercise.description.includes('video')) {
                        isCorrect = regexPatterns.video.test(exercise.userCode)
                    } else if (exercise.description.includes('sezione') || exercise.description.includes('articolo')) {
                        isCorrect = regexPatterns.section_article.test(exercise.userCode)
                    } else if (exercise.description.includes('menu di navigazione')) {
                        isCorrect = regexPatterns.nav.test(exercise.userCode)
                    } else {
                        isCorrect = exercise.userCode.trim() === exercise.correct_code.trim()
                    }
                    break
                case 'CSS':
                    if (exercise.description.includes('Flexbox')) {
                        isCorrect = regexPatterns.flex.test(exercise.userCode)
                    } else if (exercise.description.includes('griglia di layout')) {
                        isCorrect = regexPatterns.grid.test(exercise.userCode)
                    } else if (exercise.description.includes('animazione')) {
                        isCorrect = regexPatterns.animation.test(exercise.userCode)
                    } else if (exercise.description.includes('media query')) {
                        isCorrect = regexPatterns.media_query.test(exercise.userCode)
                    } else {
                        isCorrect = regexPatterns.css.test(exercise.userCode)
                    }
                    break
                case 'JavaScript':
                    isCorrect = exercise.userCode.trim() === exercise.correct_code.trim()
                    break
                case 'Tailwind':
                    isCorrect = exercise.userCode.trim() === exercise.correct_code.trim()
                    break
                default:
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
