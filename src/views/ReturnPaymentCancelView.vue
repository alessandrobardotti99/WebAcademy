<template>
    <div class="min-h-screen bg-YellowWebAcademy flex items-center justify-center">
      <div class="p-8 rounded-lg text-center">
        <img src="/src/assets/img/logoWebAcademy.png" alt="logoWebAcademy" class="max-w-full w-[600px] m-auto mb-10">
        <div>
          <IconaOrdineFallito class="m-auto" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Ordine Fallito</h1>
        <p class="text-gray-700 mb-8">Purtroppo si è verificato un problema con il tuo ordine. Per favore, riprova.</p>
        <router-link to="/" class="text-white hover:underline p-4 bg-indigo-500 rounded-xl">Torna alla Home</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import IconaOrdineFallito from '../components/icons/IconaOrdineFallito.vue'
  export default {
    name: 'OrderFailed',
    components: {
      IconaOrdineFallito
    }
  }
  </script>
  
  <style scoped>
  </style>
  