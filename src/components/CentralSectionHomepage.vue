<script>
import IconaObbiettivi from '../components/icons/IconaObbiettiviHomepage.vue'
import iconaCoppa from '../components/icons/IconaCoppa.vue'
import IconaTriste from '../components/icons/IconaTriste.vue'
import IconaFreccia from '../components/icons/IconaFreccia.vue'

export default {
    components: {
        IconaObbiettivi,
        iconaCoppa,
        IconaTriste,
        IconaFreccia
    },
}
</script>

<template>
    <div class="border-b-4 border-gray-900">
    <div class="full text-center mt-16">
        <h1 class="text-center font-monospace text-[4rem] font-bold">Panoramica dei corsi</h1>
        <p class="mt-2 text-center text-black leading-8 font-semibold text-xl">Esplora la nostra vasta gamma di corsi online progettati per
            aiutarti a padroneggiare i fondamenti di HTML, CSS e JavaScript</p>
    </div>
    <div class="w-[80%] flex items-center gap-20 justify-center m-auto text-center max-w-[1800px] ml-auto mr-auto max-xl:block max-xl:w-[90%]">
        <div class="w-[80%] max-xl:w-[90%] max-xl:m-auto">
            <div>
                <div class="mt-8 text-center mb-4">
                    <span class="text-gradient-one font-bold text-5xl text-center max-xl:text-center">Da principiante ad avanzato</span>
                </div>
            </div>
            <div class="bg-indigo-500 w-full border-4 border-gray-900 transition-all md:shadow-brutal md:-translate-y-2   relative p-12 text-center m-auto mt-8 mb-24 max-xl:mb-8">
                <h2 class="text-black text-[2rem] font-bold font-monospace mb-4">Realizza il tuo sogno</h2>
                <p class="w-full text-black leading-8 font-semibold text-xl text-center"> Immergiti nella nostra vasta libreria di corsi online e libera il tuo
                    potenziale come sviluppatore web.  </p>
                    <div class="m-auto text-center">
            <router-link to="/corsi" class="flex justify-center">
                <p class="my-0 mx-1 py-2 px-4 mt-8 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium m-auto">Raggiungi i tuoi obbiettivi</p>
            </router-link>
        </div>
            </div>
        </div>

        <div class="w-[80%] m-auto max-xl:w-[90%] max-xl:m-auto">
            <div class="mt-8 text-center mb-4">
                    <span class="text-gradient-one font-bold text-5xl text-center">Impara e scopri</span>
                </div>
            <div class="bg-YellowWebAcademy w-full m-auto border-4 border-gray-900 transition-all md:shadow-brutal md:-translate-y-2   relative p-12 mt-8 mb-24">
                <h2 class="text-black text-[2rem] font-bold font-monospace mb-4">Domande frequenti</h2>
                <p class="w-full text-black leading-8 font-semibold text-xl text-center">Ottieni risposte alle tue domande urgenti sui nostri  corsi online in HTML, CSS e JavaScript.</p>
                <div class="m-auto text-center">
            <router-link to="/faq" class="flex justify-center">
                <p class="my-0 mx-1 py-2 px-4 mt-8 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium m-auto">Chiarisci qualsiasi dubbio</p>
            </router-link>
        </div>
            </div>
            
        </div>
    </div>
</div>
</template>