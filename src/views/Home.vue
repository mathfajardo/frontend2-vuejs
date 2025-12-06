<script setup>
import axiosInstance from '@/services/http';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';


// carregamento
let carregamento = ref(true);

// iniciar a variavel
let totalProdutos = ref(0);
let totalClientes = ref(0);

onMounted(() => {
    Promise.all([
        axiosInstance.get('/produtosTotal'),
        axiosInstance.get('/clientesTotal')
    ])
    .then(responses => {
        totalProdutos.value = responses[0].data.data.total;
        totalClientes.value = responses[1].data.data.total;
    })
    .catch(error => {
        console.error('Erro ao carregar os dados: ', error);
    })
    .finally (() => {
        carregamento.value = false;
    })
})
</script>

<template>

<div
    class="d-flex flex-column justify-content-center align-items-center"
    v-if="carregamento"
  >
    <div class="spinner-border mb-3 mt-5" style="width: 4rem; height: 4rem">
      <span class="visually-hidden">Aguarde...</span>
    </div>
    <p class="text-muted">Aguarde...</p>
</div>

<h1 class="text-center text-black pt-5" v-if="!carregamento">Seja bem-vindo</h1>

<div class="d-flex flex-wrap justify-content-center gap-4 mt-5" v-if="!carregamento">
    <RouterLink to="/pdv" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-shop"></i>Registrar uma vendas</RouterLink>
    <RouterLink to="/clientes" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-people-fill"></i>Verificar clientes</RouterLink>
    <RouterLink to="/produtos" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-archive"></i>Verificar produtos</RouterLink>
</div>

<div class="d-flex flex-wrap justify-content-center gap-4 mt-5" v-if="!carregamento">
    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-box-seam display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Total de produtos</h5>
            <h3 class="card-text display-4 fw-bold text-white">{{ totalProdutos }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-people-fill display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Total de clientes</h5>
            <h3 class="card-text display-4 fw-bold text-white">{{ totalClientes }}</h3>
        </div>
    </div>
</div>



</template>



