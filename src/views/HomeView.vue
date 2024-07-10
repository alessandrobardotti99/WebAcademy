<script>
import Nav from '../components/NavHomepage.vue'
import Hero from '../components/HeroHomepage.vue'
import CentralSection from '../components/CentralSectionHomepage.vue'
import LowCentral from '../components/icons/LowCentralSectionHomepage.vue'

export default {
  components: {
    Nav,
    Hero,
    CentralSection,
    LowCentral
  }
}
</script>

<template>
  <div>
    <Nav />
    <Hero />
    <CentralSection />
    <LowCentral />
  </div>
</template>
