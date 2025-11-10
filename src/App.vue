<script setup>

  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min.js'

  import Cabecalho from './components/Cabecalho.vue';

</script>

<template>
  <Cabecalho></Cabecalho>
  <div class="bg-dark bg-gradient min-vh-100">
    <div class="container">
    
    <RouterView></RouterView>
  </div>
  </div>
  
  
</template>

