<script setup>

  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min.js'
  import './assets/global.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'

  import Cabecalho from './components/Cabecalho.vue';
  import Rodape from './components/Rodape.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const esconderCabecalho = computed (() => {
    return route.meta.esconderCabecalho || false;
  });
</script>

<template>
  <Cabecalho v-if="!esconderCabecalho"></Cabecalho>
  <div class="bg-body-secondary bg-gradient min-vh-100">
    <div class="container">
    
    <RouterView></RouterView>
  </div>
  </div>

  <Rodape v-if="!esconderCabecalho"></Rodape>
  
  
</template>

