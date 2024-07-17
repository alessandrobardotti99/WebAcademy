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
    <div class="w-[80%] flex items-center gap-20 justify-center m-auto text-center">
        <div class="w-[80%]">
            <div class="">
                <div class="mt-8 text-center mb-4">
                    <span class="text-gradient-one font-bold text-5xl text-center">Da principiante ad avanzato</span>
                </div>
            </div>
            <div class="bg-indigo-500 w-full border-4 border-gray-900 transition-all md:shadow-brutal md:-translate-y-2   relative p-12 text-center m-auto mt-8 mb-24">
                <h2 class="text-black text-[2rem] font-bold font-monospace">Realizza il tuo sogno</h2>
                <p class="text-black mt-4 font-semibold"> Immergiti nella nostra vasta libreria di corsi online e libera il tuo
                    potenziale come sviluppatore web.  </p>
                <p class="text-black mt-4 text-sm flex items-center gap-2 justify-center font-semibold">Raggiungi i tuoi obbiettivi</p>
            </div>
        </div>

        <div class="w-[80%] m-auto">
            <div class="mt-8 text-center mb-4">
                    <span class="text-gradient-one font-bold text-5xl text-center">Impara e scopri</span>
                </div>
            <div class="bg-YellowWebAcademy w-full m-auto border-4 border-gray-900 transition-all md:shadow-brutal md:-translate-y-2   relative p-12 mt-8 mb-24">
                <h2 class="text-black text-[2rem] font-bold font-monospace">Domande frequenti</h2>
                <p class="text-black mt-4 font-semibold">Ottieni risposte alle tue domande urgenti sui nostri  corsi online in HTML, CSS e JavaScript.</p>
                <p class="text-black mt-4 text-center font-semibold">Chiarisci qualsiasi dubbio</p>
            </div>
            
        </div>
    </div>
</div>
</template>