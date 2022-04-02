<script setup>
// Components
import Navbar from './components/Navbar.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'

// Third-party
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'vue-router'


</script>

<template>

<div>
  <header>
    <Navbar />
  </header> 
  <main>
    <Content />
    <Footer />
  </main>

</div>
</template>

<style>
@import './assets/homepage.css';
</style>
