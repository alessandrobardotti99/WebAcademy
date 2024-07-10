<script>
import IconaObbiettivi from '../components/icons/IconaObbiettiviHomepage.vue'
import iconaCoppa from '../components/icons/IconaCoppa.vue'
import IconaTriste from '../components/icons/IconaTriste.vue'

export default {
    components: {
        IconaObbiettivi,
        iconaCoppa,
        IconaTriste
    },
    mounted() {
        this.$nextTick(() => {
            MotionPlugin.install(this.$app)
        })
    }
}
</script>

<template>
    <div class="full text-center mt-24">
        <h1 class="text-center font-monospace text-[4rem]">Panoramica del corso</h1>
        <h2 class="text-[1.7rem] text-center mt-1">Sblocca il tuo potenziale come sviluppatore web</h2>
        <p class="mt-4 text-center text-neutral-500">Esplora la nostra vasta gamma di corsi online progettati per
            aiutarti a padroneggiare i fondamenti di HTML, CSS e JavaScript</p>
    </div>
    <div class="w-full">
        <div class="w-[80%] m-auto mt-24 flex gap-16 items-center">
            <div class="w-[40%]">
                <p class="text-neutral-500 text-xl leading-8 animated-icon-triste">
                    Immergiti nella nostra vasta libreria di corsi online e libera il tuo
                    potenziale come sviluppatore web. <br> Da principiante ad avanzato.
                </p>
                <div
                    class="flex items-center justify-between bg-gradient-to-r from-[40%] from-YellowWebAcademy to-indigo-600 rounded-xl p-4 mt-8 shadow-lg">
                    <IconaTriste class="animated-icon-triste" />
                    <iconaCoppa class="animated-icon-coppa" />
                </div>
            </div>
            <div class="bg-gradient-to-r from-30% from-black to-indigo-600 w-[60%] px-16 pt-8 pb-8 rounded-xl animated-icon-coppa">
                <div class="w-full flex justify-between items-center">
                    <span class="text-sm text-white">Costruisci siti web reattivi e interattivi</span>
                    <button
                        class="bg-transparent text-whie py-2 px-4 text-white rounded-xl cursor-pointer border border-white hover:bg-indigo-800 ">Iniziamo!</button>
                </div>
                <h2 class="text-white text-[2rem]">Realizza il tuo <br> sogno di sviluppatore </h2>
                <p class="text-neutral-500 mt-4">Massimizza il tuo potenziale</p>
                <p class="text-indigo-500 mt-4 text-sm flex items-center gap-2">Raggiungi i tuoi obbiettivi <span>
                        <IconaObbiettivi />
                    </span></p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.font-monospace {
    font-family: monospace;
}

@keyframes slide-in-left {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-in-right {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animated-icon-triste {
    animation: slide-in-left 0.5s ease-out forwards;
}

.animated-icon-coppa {
    animation: slide-in-right 1s ease-out forwards;
}
</style>