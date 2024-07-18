<script>
import Nav from '../components/NavHomepage.vue'
import Hero from '../components/HeroHomepage.vue'
import CentralSection from '../components/CentralSectionHomepage.vue'
import LowCentral from '../components/LowCentralSectionHomepage.vue'
import Footer from '../components/FooterHomepage.vue'

export default {
  components: {
    Nav,
    Hero,
    CentralSection,
    LowCentral,
    Footer
  }
}
</script>

<template>
  <router-view></router-view> 
  <div class="wrapper">
    <Nav />
    <Hero />
    <CentralSection />
    <LowCentral />
    <Footer />
  </div>
</template>
