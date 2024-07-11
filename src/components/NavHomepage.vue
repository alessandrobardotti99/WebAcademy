<template>
  <div :class="['w-full', 'bg-YellowWebAcademy', 'sticky', 'top-0', 'z-50', { 'shadow-lg': hasScrolled }]">
    <nav class="sticky flex justify-between w-[80%] m-auto ml-auto mr-auto items-center bg-YellowWebAcademy top-0 p-4">
      <div>
        <img src="/src/assets/img/logoWebAcademy.png" alt="logoWebAcademy" class="max-w-full h-[30px]">
      </div>
      <div>
        <ul class="inline-flex gap-5">
          <li class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer">
            Home
          </li>
          <li class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer">
            News
          </li>
          <li class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer">
            Corsi
          </li>
          <li class="text-neutral-500 py-2 px-4 rounded-xl hover:text-black cursor-pointer">
            Contatti
          </li>
          <router-link to="/accedi">
          <li class="bg-indigo-600 text-whie py-2 px-4 text-white rounded-xl cursor-pointer hover:bg-indigo-700">
            Accedi
          </li>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const hasScrolled = ref(false);

    const handleScroll = () => {
      hasScrolled.value = window.scrollY > 0;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      hasScrolled
    };
  }
};
</script>
