<script>
import IconaStudio from '@/components/icons/IconaStudio.vue'
import IconaPerformance from '@/components/icons/IconaPerformance.vue'
import IconaStar from '@/components/icons/IconaStar.vue'
import IconaStudioLavoro from '@/components/icons/IconaStudioLavoro.vue'
import IconaChiSono from '../components/icons/IconaChiSono.vue'

export default {
    components: {
        IconaStudio,
        IconaPerformance,
        IconaStar,
        IconaStudioLavoro,
        IconaChiSono
    }
}
</script>

<template>
    <div class="border-b-4 border-gray-900">
        <div
            class="w-[80%] border-4 border-gray-900 bg-indigo-500 transition-all md:shadow-brutal md:-translate-y-2 max-w-[1800px] ml-auto mr-auto relative  m-auto mt-[7rem] mb-28">
            <div class="bg-YellowWebAcademy h-8 border-b-4 border-gray-900 w-full">
                <div class="flex gap-2 items-center h-full px-2">
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-red-400"></div>
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-yellow-400"></div>
                    <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-green-400"></div>
                </div>
            </div>
            <div class="p-4">
                <h1 class="text-center font-monospace text-[4rem] text-black font-bold mb-4">Rimani sempre aggiornato!
                </h1>
                <p class="w-full text-black leading-8 font-semibold text-xl text-center">Il mondo dello sviluppo web è
                    in
                    continua evoluzione, con
                    nuove tecnologie e strumenti che emergono costantemente. <br> Il mio obiettivo è condividere con
                    voi
                    le
                    mie conoscenze e esperienze, per aiutarvi a navigare questo panorama in continua crescita. <br> Che
                    tu
                    sia
                    un principiante che vuole imparare le basi o un esperto che cerca di rimanere aggiornato con le
                    ultime
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
                            <p class="text-center text-black font-semibold mt-4">Scopri gli strumenti più utili e le
                                risorse
                                indispensabili per
                                ogni sviluppatore web.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="border-b-4 border-gray-900">
        <div class="w-[80%] pt-24 pb-32 m-auto max-w-[1800px] ml-auto mr-auto max-xl:w-[90%] max-md:pt-4 max-xl:pb-16 ">
            <div class="flex justify-between gap-4 max-xl:block items-center">
                <div class="w-[60%] max-xl:w-full">
                    <h1 class="text-[4rem] font-monospace font-bold max-xl:text-center max-sm:text-[3rem]">Chi sono?
                    </h1>
                    <p class="mt-4 text-black font-semibold text-xl max-xl:text-center leading-[2.5rem] mb-4">
                        Mi chiamo<span class="bg-indigo-500 my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-YellowWebAcademy font-medium">Alessandro</span><br>
                        Sono uno sviluppatore front-end di 25 anni con una passione per la creazione di siti web. <br>
                        Utilizzo i principali linguaggi di programmazione tra cui anche<span class="bg-[#42b883] my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-black font-medium">Vue.js</span> <br>
                        Progetto interfacce utente usando<span class="bg-neutral-500 my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-white font-medium">Figma</span> e altri software grafici, svolgendo anche il ruolo di
                        web designer.
                    </p>
                    <hr class="border-2 border-black rounded-full">
                    <p class="mt-4 text-black leading-[2.5rem] font-semibold text-xl max-xl:text-center">
                        Offro corsi di formazione sui linguaggi di programmazione più conosciuti. <br> In Italia, la qualità
                        della formazione è spesso<span class="bg-red-300 my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-red-700 font-medium">insufficiente</span> e molti video tutorial sono in inglese, il che può
                        rappresentare una barriera per molti aspiranti sviluppatori. <br> I miei corsi mirano a colmare
                        questa lacuna, fornendo un apprendimento accessibile e flessibile.
                    </p>

                </div>
                <div
                    class="relative flex flex-col w-[40%] lg:w-96 max-w-md  bg-white rounded border-4 border-gray-900 shadow-brutal max-xl:hidden">
                    <div class="bg-indigo-500 h-8 border-b-4 border-gray-900">
                        <div class="flex gap-2 items-center h-full px-2">
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-red-400"></div>
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-yellow-400"></div>
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <div class="flex gap-4 lg:gap-6  flex-col items-center p-4">
                        <IconaChiSono class="size-80" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-center w-[80%] m-auto mt-24 max-w-[1800px] ml-auto mr-auto">
        <div class="w-[70%]">
            <h1 class="text-[4rem] font-monospace font-bold max-xl:text-center max-sm:text-[3rem] text-start">Studi o lavori?</h1>
            <p class="text-start font-semibold text-xl max-xl:text-center">Puoi frequentare il corso quando vuoi, è strutturato con lezioni
                registrate, perfette
                per chi ha impegni lavorativi o di studio durante il giorno.</p>
            <div class="m-auto text-start">
                <router-link to="/accedi">
                    <button
                        class="my-0 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium whitespace-nowrap text-center m-auto mt-4">Inizia
                        subito!</button>
                </router-link>
            </div>
        </div>
        <div class="w-[30%] float-right">
            <IconaStudioLavoro class="h-auto max-w-full float-right" />
        </div>
    </div>
</template>



<style scoped>
.font-monospace {
    font-family: monospace;
}
</style>