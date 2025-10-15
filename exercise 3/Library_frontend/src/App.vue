<script setup>
import Navbar from './components/Navbar.vue'
import HeroCarousel from './components/HeroCarousel.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <HeroCarousel />
    <div class="main-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 80px 20px 0;
  flex: 1;
}
</style>
