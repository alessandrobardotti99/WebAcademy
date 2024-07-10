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
    <div class="full text-center mt-24">
        <h1 class="text-center font-monospace text-[4rem]">Panoramica dei corsi</h1>
        <h2 class="text-[1.7rem] text-center mt-1">Sblocca il tuo potenziale come sviluppatore web</h2>
        <p class="mt-4 text-center text-neutral-500">Esplora la nostra vasta gamma di corsi online progettati per
            aiutarti a padroneggiare i fondamenti di HTML, CSS e JavaScript</p>
    </div>
    <div class="w-full">
        <div class="w-[80%] m-auto mt-24 flex gap-16 items-center">
            <div class="w-[60%]">
                <p class="text-neutral-500 text-xl leading-8 animated-icon-triste text-center">
                    Immergiti nella nostra vasta libreria di corsi online e libera il tuo
                    potenziale come sviluppatore web.  
                    <div class="mt-8">
                    <span class="text-gradient-one font-bold text-5xl">Da principiante ad avanzato.</span>
                </div>
                </p>
            </div>
            <div class="bg-gradient-to-r from-30% from-black to-indigo-600 w-[40%] px-16 pt-8 pb-8 rounded-xl animated-icon-coppa drop-shadow-lg">
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

        <div class="w-[80%] m-auto mt-24 flex gap-16 items-center">
            <div class="bg-gradient-to-r from-30% from-black to-YellowWebAcademy w-[40%] px-16 pt-8 pb-8 rounded-xl animated-icon-coppa drop-shadow-lg">
                <h2 class="text-white text-[2rem] pb-4">Domande frequenti</h2>
                <p class="text-white text-sm  w-full">Ottieni risposte alle tue domande urgenti sui nostri  corsi online in HTML, CSS e JavaScript. <br> I nostri istruttori esperti sono qui per guidarti in ogni fase del percorso</p>
                <p class="text-neutral-500 mt-4">Chiarisci qualsiasi dubbio</p>
            </div>
            <div class="w-[60%] p-12 text-center">
                <p class="text-neutral-500 text-xl leading-8 animated-icon-triste text-center">
                    Migliora le tue competenze di sviluppo web con i nostri corsi online completi. 
                    <div class="mt-8">
                    <span class="text-gradient font-bold text-5xl"> Impara e scopri un mondo di possibilità.</span>
                </div>
                </p>
                
            </div>
        </div>
    </div>
</template>


<style scoped>
.text-gradient {
  background: linear-gradient(to right, #000000, #ffd06a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-one {
  background: linear-gradient(to right, #000000, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
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