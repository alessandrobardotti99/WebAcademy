<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import autoAnimate from '@formkit/auto-animate'
import Nav from '../components/NavHomepage.vue'
import Footer from '../components/FooterHomepage.vue'

const dropdownStudy = ref(null)
const showStudy = ref(false)
const dropdownFramework = ref(null)
const showFramework = ref(false)
const dropdownMobile = ref(null)
const showMobile = ref(false)
const dropdownGames = ref(null)
const showGames = ref(false)
const dropdownBestLanguage = ref(null)
const showBestLanguage = ref(false)
const dropdownSelfTaught = ref(null)
const showSelfTaught = ref(false)
const dropdownUniversity = ref(null)
const showUniversity = ref(false)
const dropdownAcademy = ref(null)
const showAcademy = ref(false)

const closeAllDropdowns = () => {
  showStudy.value = false
  showFramework.value = false
  showMobile.value = false
  showGames.value = false
  showBestLanguage.value = false
  showSelfTaught.value = false
  showUniversity.value = false
  showAcademy.value = false
}

const handleClickOutside = (event) => {
  if (
    !dropdownStudy.value.contains(event.target) &&
    !dropdownFramework.value.contains(event.target) &&
    !dropdownMobile.value.contains(event.target) &&
    !dropdownGames.value.contains(event.target) &&
    !dropdownBestLanguage.value.contains(event.target) &&
    !dropdownSelfTaught.value.contains(event.target) &&
    !dropdownUniversity.value.contains(event.target) &&
    !dropdownAcademy.value.contains(event.target)
  ) {
    closeAllDropdowns()
  }
}

onMounted(() => {
  autoAnimate(dropdownStudy.value)
  autoAnimate(dropdownFramework.value)
  autoAnimate(dropdownMobile.value)
  autoAnimate(dropdownGames.value)
  autoAnimate(dropdownBestLanguage.value)
  autoAnimate(dropdownSelfTaught.value)
  autoAnimate(dropdownUniversity.value)
  autoAnimate(dropdownAcademy.value)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="bg-gray-100 min-h-screen">  
    <Nav />
    <div class="p-8">
      <h1 class="text-[4rem] font-monospace text-center mt-4 mb-8">Domande più popolari</h1>
      <div ref="dropdownStudy" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer"  @click="showStudy = !showStudy">
          <strong class="dropdown-label text-xl text-indigo-500">Quali sono i primi passi per imparare a creare siti web?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showStudy, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showStudy">
          Il mondo dello sviluppo web offre numerose tecnologie. Per iniziare, è fondamentale concentrarsi sui pilastri principali: HTML, CSS e JavaScript. Questi tre linguaggi sono la base per costruire qualsiasi sito web.
        </p>
      </div>
  
      <div ref="dropdownFramework" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showFramework = !showFramework">
          <strong class="dropdown-label text-xl text-indigo-500">Cosa sono i framework frontend e mi servono?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showFramework, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showFramework">
          I framework frontend sono strumenti che aiutano a creare applicazioni web moderne scrivendo meno codice rispetto al farlo manualmente. Tuttavia, aggiungono complessità e nuove nozioni da imparare. Se sei agli inizi, puoi tralasciarli per ora e riprenderli più avanti nei tuoi studi.
        </p>
      </div>
  
      <div ref="dropdownMobile" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showMobile = !showMobile">
          <strong class="dropdown-label text-xl text-indigo-500">Quale linguaggio serve per creare applicazioni mobile?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showMobile, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showMobile">
          Per sviluppare applicazioni mobile, ci sono due piattaforme principali: Android e iOS. Per Android, i linguaggi più comuni sono Java e Kotlin. Per iOS, si utilizza Swift. Se desideri sviluppare per entrambe le piattaforme con un unico linguaggio, puoi utilizzare Flutter, che richiede la conoscenza di Dart.
        </p>
      </div>
  
      <div ref="dropdownGames" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showGames = !showGames">
          <strong class="dropdown-label text-xl text-indigo-500">Come posso imparare a creare giochi?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showGames, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showGames">
          Creare giochi è un po' più complesso rispetto ad altre aree di sviluppo. I software più popolari per lo sviluppo di giochi sono Unity e Unreal Engine 5, che utilizzano rispettivamente C# e C++. Esistono anche altre opzioni come Javascript e Python, ma Unity e Unreal Engine offrono molte funzionalità e un'interfaccia intuitiva per i principianti.
        </p>
      </div>
  
      <div ref="dropdownBestLanguage" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showBestLanguage = !showBestLanguage">
          <strong class="dropdown-label text-xl text-indigo-500">Qual è il miglior linguaggio di programmazione per iniziare?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showBestLanguage, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showBestLanguage">
          Il miglior linguaggio di programmazione dipende da ciò che vuoi creare. Per lo sviluppo web, HTML, CSS e Javascript sono essenziali. Per le applicazioni mobile, Dart e Flutter sono una buona scelta. Per le applicazioni desktop, C# e .Net MAUI o Dart e Flutter sono ottime opzioni.
        </p>
      </div>
  
      <div ref="dropdownSelfTaught" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showSelfTaught = !showSelfTaught">
          <strong class="dropdown-label text-xl text-indigo-500">È possibile diventare sviluppatore da autodidatta?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showSelfTaught, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showSelfTaught">
          Assolutamente sì! Lo sviluppo software si basa principalmente sulle competenze pratiche. Tuttavia, da autodidatta, può essere difficile orientarsi tra le numerose tecnologie e risorse disponibili. Su Web Academy, offriamo un percorso di apprendimento chiaro e strutturato per aiutarti a diventare uno sviluppatore competente.
        </p>
      </div>
  
      <div ref="dropdownUniversity" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showUniversity = !showUniversity">
          <strong class="dropdown-label text-xl text-indigo-500">L'università è necessaria?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showUniversity, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showUniversity">
          L'università non è strettamente necessaria per lavorare nel campo dello sviluppo software. Molti sviluppatori di successo sono autodidatti. Tuttavia, un percorso universitario può offrire vantaggi come una formazione strutturata e opportunità di networking.
        </p>
      </div>
  
      <div ref="dropdownAcademy" class="my-0 mx-1 py-4 px-4 border-4 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-white text-lg lg:text-xl w-full text-black font-medium mb-4" @click.stop>
        <div class="flex justify-between items-center cursor-pointer" @click="showAcademy = !showAcademy">
          <strong class="dropdown-label text-xl text-indigo-500">Le Code Academy costose valgono l'investimento?</strong>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" :class="{'rotate-180': showAcademy, 'ml-2': true, 'w-6': true, 'h-6': true, 'transition-transform': true}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p class="dropdown-content mt-2 p-4 bg-white" v-if="showAcademy">
          Le Code Academy possono offrire un valore aggiunto grazie all'accesso a tutor esperti e a un curriculum strutturato. Tuttavia, è possibile acquisire competenze simili da autodidatti. Web Academy offre percorsi di studio di alta qualità per chi preferisce imparare in autonomia e spendere meno.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.dropdown-label {
  cursor: pointer;
  font-weight: bold;
}
.dropdown-content {
  margin-top: 8px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.transition-transform {
  transition: transform 0.2s linear;
}
.font-monospace {
  font-family: monospace;
}
</style>
