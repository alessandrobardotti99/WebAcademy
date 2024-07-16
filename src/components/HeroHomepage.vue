<script>
import IconsHtml from '../components/icons/IconaHtml.vue'
import IconaCss from '../components/icons/IconaCss.vue'
import IconaJavascript from '../components/icons/IconaJavascript.vue'

export default {
  components: {
    IconsHtml,
    IconaCss,
    IconaJavascript
  }
}
</script>

<template>
    <div class="w-full bg-YellowWebAcademy">
    <div class="w-[80%] pt-24 pb-36 bg-YellowWebAcademy m-auto">
        <div class="flex justify-around">
            <div>
                <h1 class="text-[4rem] font-monospace">Corsi online di HTML, CSS e JAVASCRIPT</h1>
                <p class="mt-4 text-black leading-8 font-semibold text-xl">Impara le competenze essenziali di sviluppo web con i nostri <br> corsi
                    online completi in HTML, CSS e JavaScript</p>
                <div class="mt-8 flex gap-3">
                    <router-link to="/corsi">
                    <button
                        class="my-0 mx-1 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">Scopri
                        i corsi</button></router-link>
                        <router-link to="/accedi">
                    <button
                        class="my-0 mx-1 py-1 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">Inizia
                        ad imparare</button>
                        </router-link>
                </div>
            </div>
            <div class="relative">
                <IconsHtml class="absolute top-0 z-20" />
                <IconaJavascript class="absolute bottom-0 left-[-3rem] z-20 -rotate-12" />
                <img src="/src/assets/img/Macbook_Air_Mockup_1.png" alt="Macbook_Air_Mockup_1"
                    class="max-w-full w-[900px] h-auto relative z-10">
                 <IconaCss class="absolute bottom-1 right-[-4rem] rotate-45 z-[1]" />   
            </div>
        </div>

    </div>
</div>
</template>

<style scoped>
.font-monospace {
    font-family: monospace;
}
</style>