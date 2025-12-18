<script setup>
import axiosInstance from '@/services/http';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';


// carregamento
let carregamento = ref(true);

// iniciar a variavel
let totalProdutos = ref(0);
let totalClientes = ref(0);
let totalVendas = ref(0);
let totalValorVendido = ref(0);
let totalValorVendidoDia = ref(0);
let totalValorVendidoMes = ref(0);

// formatar valor
function formatarValor(valor) {
	if (!valor) return 'R$ 0,00';

	return Number(valor).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
}

onMounted(() => {
    Promise.all([
        axiosInstance.get('/produtosTotal'),
        axiosInstance.get('/clientesTotal'),
        axiosInstance.get('/vendasTotal'),
        axiosInstance.get('/vendasValorTotal'),
        axiosInstance.get('/vendasValorTotalDia'),
        axiosInstance.get('/vendasValorTotalMes')
    ])
    .then(responses => {
        totalProdutos.value = responses[0].data.data.total;
        totalClientes.value = responses[1].data.data.total;
        totalVendas.value = responses[2].data.data.total;
        totalValorVendido.value = responses[3].data.data.valor_total;
        totalValorVendidoDia.value = responses[4].data.data.valor_total;
        totalValorVendidoMes.value = responses[5].data.data.valor_total;
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
    class="d-flex flex-column justify-content-center align-items-center vh-100"
    v-if="carregamento"
>
    <div class="spinner-border">
        <span class="visually-hidden">Aguarde...</span>
    </div>
    <p class="mt-2">Carregando...</p>
</div>

<h1 class="text-center text-black pt-5" v-if="!carregamento">Seja bem-vindo</h1>

<div class="d-flex flex-wrap justify-content-center gap-4 mt-5" v-if="!carregamento">
    <RouterLink to="/pdv" class="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 py-3 px-4"><i class="bi bi-shop"></i>Registrar uma venda</RouterLink>
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
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ totalProdutos }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-people-fill display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Total de clientes</h5>
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ totalClientes }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-cash display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Total de vendas da loja</h5>
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ totalVendas }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-cash display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Valor total vendido</h5>
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ formatarValor(totalValorVendido) }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-cash display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Valor total vendido hoje</h5>
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ formatarValor(totalValorVendidoDia) }}</h3>
        </div>
    </div>

    <div class="card border-0 rounded-4 bg-dark text-white" style="width: 20rem;">
        <div class="card-body p-4 text-center">
            <div class="d-flex justify-content-center mb-3">
            <i class="bi bi-cash display-4 text-success"></i>
            </div>
            <h5 class="card-title text-white-75 fw-semibold mb-3">Valor total vendido no mês</h5>
            <h3 class="card-text display-4 fs-1 fw-bold text-white">{{ formatarValor(totalValorVendidoMes) }}</h3>
        </div>
    </div>
</div>



</template>



