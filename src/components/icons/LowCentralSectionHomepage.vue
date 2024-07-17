<script>
import IconaStudio from '@/components/icons/IconaStudio.vue'
import IconaPerformance from '@/components/icons/IconaPerformance.vue'
import IconaStar from '@/components/icons/IconaStar.vue'
import IconaStudioLavoro from '@/components/icons/IconaStudioLavoro.vue'

export default {
    components: {
        IconaStudio,
        IconaPerformance,
        IconaStar,
        IconaStudioLavoro
    }
}
</script>

<template>
    <div class="border-b-4 border-gray-900">
        <div
            class="w-[80%] border-4 border-gray-900 bg-indigo-500 transition-all md:shadow-brutal md:-translate-y-2   relative  m-auto mt-28 mb-28">
            <div class="bg-YellowWebAcademy h-8 border-b-4 border-gray-900 w-full">
                <div class="flex gap-2 items-center h-full px-2">
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-red-400"></div>
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-yellow-400"></div>
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-green-400"></div>
                </div>
            </div>
            <div class="p-4">
            <h1 class="text-center font-monospace text-[4rem] text-black font-bold mb-4">Rimani sempre aggiornato!</h1>
            <p class="w-full text-black leading-8 font-semibold text-xl text-center">Il mondo dello sviluppo web è in
                continua evoluzione, con
                nuove tecnologie e strumenti che emergono costantemente. <br> Il nostro obiettivo è condividere con voi
                le
                mie conoscenze e esperienze, per aiutarvi a navigare questo panorama in continua crescita. <br> Che tu
                sia
                un principiante che vuole imparare le basi o un esperto che cerca di rimanere aggiornato con le ultime
                tendenze, cosa troverai qui?</p>
            <div class="grid grid-cols-3 m-auto mt-8 gap-4 w-full justify-center">
                <div
                    class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2   relative p-8 w-full">
                    <IconaStudio class="m-auto" />
                    <div class="mt-2">
                        <p class="text-center text-black font-semibold mt-4">Impara a creare layout accattivanti e
                            funzionali con le ultime
                            tecniche e best practice.</p>
                    </div>
                </div>
                <div
                    class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2   relative p-8 w-full">
                    <IconaPerformance class="m-auto" />
                    <div class="mt-2">
                        <p class="text-center text-black font-semibold mt-4">Ottimizza i tuoi siti web per garantire
                            un'esperienza utente
                            fluida e veloce.</p>
                    </div>
                </div>
                <div
                    class="border-4 border-gray-900 bg-white transition-all md:shadow-brutal md:-translate-y-2   relative p-8 w-full">
                    <IconaStar class="m-auto" />
                    <div class="mt-2">
                        <p class="text-center text-black font-semibold mt-4">Scopri gli strumenti più utili e le risorse
                            indispensabili per
                            ogni sviluppatore web.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="flex items-center justify-center w-[80%] m-auto mt-24">
        <div class="w-[50%]">
            <h1 class="font-monospace text-[2rem] text-center font-bold">Studi o lavori?</h1>
            <p class="text-center font-bold">Puoi frequentare il corso quando vuoi, è strutturato con lezioni
                registrate, perfette
                per chi ha impegni lavorativi o di studio durante il giorno.</p>
            <div class="m-auto text-center">
                <router-link to="/accedi">
                    <button
                        class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap text-center m-auto mt-4">Inizia
                        subito!</button>
                </router-link>
            </div>
        </div>
        <div class="w-[50%] m-auto">
            <IconaStudioLavoro class="h-auto max-w-full m-auto" />
        </div>
    </div>
</template>



<style scoped>
.font-monospace {
    font-family: monospace;
}
</style>