<script>
import IconsHtml from '../components/icons/IconaHtml.vue'
import IconaCss from '../components/icons/IconaCss.vue'
import IconaJavascript from '../components/icons/IconaJavascript.vue'
import IconaTopPage from '../components/icons/IconaTopImage.vue'

export default {
    components: {
        IconsHtml,
        IconaCss,
        IconaJavascript,
        IconaTopPage
    }
}
</script>

<template>
    <div class="w-full bg-YellowWebAcademy border-b-4 border-gray-900">
        <div class="w-[80%] pt-24 pb-36 bg-YellowWebAcademy m-auto">
            <div class="flex justify-around gap-4">
                <div class="w-[60%]">
                    <h1 class="text-[4rem] font-monospace font-bold">Corsi online di HTML, CSS e JAVASCRIPT</h1>
                    <p class="mt-4 text-black leading-8 font-semibold text-xl">Impara le competenze essenziali di
                        sviluppo web con i nostri <br> corsi
                        online completi in HTML, CSS e JavaScript</p>
                    <div class="mt-8 flex gap-3">
                        <router-link to="/corsi">
                            <button
                                class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-indigo-500 text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">Scopri
                                i corsi</button></router-link>
                        <router-link to="/accedi">
                            <button
                                class="my-0 mx-1 py-2 px-4 rounded-md border-2 border-gray-900 shadow-brutal cursor-pointer active:translate-y-1 active:shadow-[1px_2px_0px_0px_#000] bg-YellowWebAcademy text-lg lg:text-xl w-fit text-black font-medium flex gap-2 items-center whitespace-nowrap">Inizia
                                ad imparare</button>
                        </router-link>
                    </div>
                </div>
                <div class="relative flex flex-col w-[40%] lg:w-96 max-w-md  bg-white rounded border-4 border-gray-900 shadow-brutal ">
                    <div class="bg-indigo-500 h-8 border-b-4 border-gray-900">
                        <div class="flex gap-2 items-center h-full px-2">
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-red-400"></div>
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-yellow-400"></div>
                            <div class="w-4 border-2 border-gray-900 h-4 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <div class="flex gap-4 lg:gap-6  flex-col items-center p-4">
                       
                    </div>
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