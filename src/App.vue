<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HomePage from '@/views/HomeView.vue'
</script>

<template>
  <header>
    <div>
    </div>
  </header>
  <router-view></router-view>
</template>

<style>
#app {
  background-color: #f3f4f6;
}
</style>
