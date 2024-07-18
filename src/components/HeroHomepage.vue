<script>
import IconsHtml from '../components/icons/IconaHtml.vue'
import IconaCss from '../components/icons/IconaCss.vue'
import IconaJavascript from '../components/icons/IconaJavascript.vue'
import IconaTopPage from '../components/icons/IconaTopImage.vue'
import IconaGrazie from '../components/icons/IconaGrazieIscrizione.vue'

export default {
    components: {
        IconsHtml,
        IconaCss,
        IconaJavascript,
        IconaTopPage,
        IconaGrazie
    }
}
</script>

<template>
    <div class="w-full bg-YellowWebAcademy border-b-4 border-gray-900">
        <div
            class="w-[80%] pt-24 pb-36 bg-YellowWebAcademy m-auto max-w-[1800px] ml-auto mr-auto max-xl:w-[90%] max-md:pt-4 max-xl:pb-16">
            <div class="flex justify-between gap-4 max-xl:block items-center">
                <div class="w-[60%] max-xl:w-full">
                    <h1 class="text-[4rem] font-monospace font-bold max-xl:text-center max-sm:text-[3rem]">Corsi online
                        di HTML, CSS e JAVASCRIPT</h1>
                    <p class="mt-4 text-black leading-[2.5rem] font-semibold text-xl max-xl:text-center">Impara le competenze
                        essenziali di
                        sviluppo web <br>con i corsi
                        online completi in<span
                            class="bg-[#f36a20] my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-black font-medium">HTML</span><span
                            class="bg-[#41b4e1] my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-black font-medium">CSS</span><span
                            class="bg-[#f7e025] my-0 mx-1 py-1 px-2 rounded-full border-2 border-gray-900 shadow-[5px_5px_0px_0px_#000] w-fit text-black font-medium">JS</span>
                    </p>
                    <div class="mt-8 flex gap-3 max-xl:justify-center">
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
                        <IconaGrazie class="size-80" />
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