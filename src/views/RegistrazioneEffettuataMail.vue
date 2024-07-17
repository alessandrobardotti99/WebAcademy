<template>
    <Nav />
    <div class="h-screen grid place-items-center">
        <div>
            <div class="m-auto text-center">
               <IconaGrazie class="m-auto mb-16" />
            </div>
            <h1 class="text-center font-monospace text-[4rem] font-bold">Grazie per esserti iscritto!</h1>
            <p class="mt-4 text-center text-black leading-8 font-semibold text-xl">Controlla la tua casella di posta e
                segui i procedimenti riportati nella mail per confermare l'iscrizione, buon studio!</p>
            <div class="text-center">
                <router-link to="/">
                    <button
                        class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap mt-8">Torna
                        alla home</button>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import Nav from '../components/NavHomepage.vue'
import IconaGrazie from '../components/icons/IconaGrazieIscrizione.vue'

export default {
    name: 'RegistrazioneEffettuata',
    components: {
        Nav,
        IconaGrazie
    },
    setup() {
        return {
        }
    }
}
</script>
