<script>
import IconaStudio from '@/components/icons/IconaStudio.vue'
import IconaPerformance from '@/components/icons/IconaPerformance.vue'
import IconaStar from '@/components/icons/IconaStar.vue'

export default {
    components: {
        IconaStudio,
        IconaPerformance,
        IconaStar
    }
}
</script>

<template>
    <div class="w-[80%] mt-34 bg-indigo-700 rounded-xl m-auto mt-36 p-16">
        <h1 class="text-center font-monospace text-[4rem] text-white mb-4">Rimani sempre aggiornato!</h1>
        <p class="w-full text-indigo-300 text-xl text-center">Il mondo dello sviluppo web è in continua evoluzione, con
            nuove tecnologie e strumenti che emergono costantemente. <br> Il nostro obiettivo è condividere con voi le
            mie conoscenze e esperienze, per aiutarvi a navigare questo panorama in continua crescita. <br> Che tu sia
            un principiante che vuole imparare le basi o un esperto che cerca di rimanere aggiornato con le ultime
            tendenze, cosa troverai qui?</p>
        <div class="grid grid-cols-3 w-full m-auto mt-16 gap-16">
            <div>
                <div class="w-full bg-indigo-600 rounded-xl p-4">
                    <IconaStudio class="m-auto" />
                    <div class="mt-8">
                        <p class="text-center text-white">Impara a creare layout accattivanti e funzionali con le ultime
                            tecniche e best practice.</p>
                    </div>
                </div>
            </div>
            <div class="w-full bg-indigo-600 rounded-xl p-4">
                <IconaPerformance class="m-auto" />
                <div class="mt-8">
                    <p class="text-center text-white">Ottimizza i tuoi siti web per garantire un'esperienza utente
                        fluida e veloce.</p>
                </div>
            </div>
            <div class="w-full bg-indigo-600 rounded-xl p-4">
                <IconaStar class="m-auto" />
                <div class="mt-8">
                    <p class="text-center text-white">Scopri gli strumenti più utili e le risorse indispensabili per
                        ogni sviluppatore web.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-24 flex items-center justify-center w-[80%] m-auto">
        <div class="w-[50%]">
            <h1 class="font-monospace text-[2rem] text-center">Studi o lavori?</h1>
            <p class="text-center">Puoi frequentare il corso quando vuoi, è strutturato con lezioni registrate, perfette
                per chi ha impegni lavorativi o di studio durante il giorno.</p>
            <div class="m-auto text-center">
                <router-link to="/accedi">
                    <button
                        class="bg-YellowWebAcademy text-neutral-800 mt-4 py-2 px-4 rounded-xl cursor-pointer hover:bg-HoverYwlloWebAcademt m-auto">Inizia
                        subito!</button>
                </router-link>
            </div>
        </div>
        <div class="w-[50%] m-auto">
            <img src="/src/assets/img/Animazione_2.gif" alt="gif" class="h-auto max-w-full w-[600px] m-auto">
        </div>
    </div>
</template>



<style scoped>
.font-monospace {
    font-family: monospace;
}
</style>