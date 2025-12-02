<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>

<h1 class="text-center text-black pt-5" v-if="!carregamento">Seja bem-vindo</h1>

<div class="d-flex flex-wrap justify-content-center gap-4 mt-5">
    <RouterLink to="/pdv" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-shop"></i>Registrar uma vendas</RouterLink>
    <RouterLink to="/clientes" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-people-fill"></i>Verificar clientes</RouterLink>
    <RouterLink to="/produtos" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-archive"></i>Verificar produtos</RouterLink>
</div>

</template>



