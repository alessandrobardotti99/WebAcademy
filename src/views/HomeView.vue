<script>
import Nav from '../components/NavHomepage.vue'
import Hero from '../components/HeroHomepage.vue'
import CentralSection from '../components/CentralSectionHomepage.vue'

export default {
  components: {
    Nav,
    Hero,
    CentralSection
  }
}
</script>

<template>
  <div>
    <Nav />
    <Hero />
    <CentralSection />
  </div>
</template>
