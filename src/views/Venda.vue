<script setup>
import axiosInstance from '@/services/http';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';


    // iniciando arrays
    let vendas = ref([]);
    let vendasOriginal = ref([]);
    let termoPesquisa = ref([]);

    // carregamento
    let carregamento = ref(true);

    // pesquisar
    function pesquisar() {
        if (!termoPesquisa.value.trim()) {
            vendas.value = vendasOriginal.value;
            return;
        }

        const termo = termoPesquisa.value.toLowerCase();
        vendas.value = vendasOriginal.value.filter(venda => 
            venda.produto.nome_produto.toLowerCase().includes(termo) || venda.cliente.nome_cliente.toLowerCase().includes(termo) //|| venda.valor_total.toString().toLowerCase().includes(termo)
        );

        termoPesquisa.value = '';
        
    }

    onMounted(() => {
        axiosInstance.get('/vendas/')
        .then(response => {
            console.log("Resposta -> ", response.data.data);
            vendas.value = response.data.data;
            vendasOriginal.value = response.data.data;
            carregamento.value = false;
        })
        .catch(error => {
            console.error("Erro: ", error);
            carregamento.value = false;
        })
    });

    function remover(venda) {

        axiosInstance.delete(`/vendas/${venda.id}`)
        .then(response => {
            vendas.value = vendas.value.filter(v => v.id !== venda.id);
            vendasOriginal.value = vendasOriginal.value.filter(v => v.id !== venda.id)
            Swal.fire({
                title: 'Produto removido com sucesso!',
                icon: 'success',
                confirmButtonColor: '#000000',
                confirmButtonText: 'Ok'
            });
        })
        .catch(error => {
            console.error('Erro: ', error);
            Swal.fire({
            title: 'Não foi possível deletar',
            text: 'favor entrar em contato com o adm do sistema',
            icon: 'error',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Ok'
            });
        })
    }

    



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

<h1 class="text-center text-black pt-5" v-if="!carregamento">Vendas</h1>

<div class="d-flex aling-items-center" v-if="!carregamento">
<RouterLink class="text-center btn btn-primary m-2" to="/pdv">
  Nova venda
</RouterLink>
<form class="d-flex m-2" role="search" @submit.prevent="pesquisar">
      <input class="form-control me-2" type="search" placeholder="Pesquisar..." v-model="termoPesquisa">
      <button class="btn btn-success" type="submit">Pesquisar</button>
</form>

</div>

<div class="table-responsive shadow-sm " v-if="!carregamento">
  <table class="table border table-hover">
    <thead class="">
      <tr>
        <th scope="col">Nome do produto</th>
        <th scope="col">Nome do cliente</th>
        <th scope="col">Valor total</th>
        <th scope="col">Editar</th>
        <th scope="col">Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(v, indice) in vendas">
        <td>{{ v.produto.nome_produto }}</td>
        <td>{{ v.cliente.nome_cliente}}</td>
        <td>R$ {{ v.valor_total }}</td>
        <td><RouterLink class="btn btn-outline-primary" to="/produtos">Editar</RouterLink></td>
        <td><button class="btn btn-outline-danger" @click="remover(v)">Deletar</button></td>
      </tr>

      <tr v-if="vendas.length === 0">
        <td colspan="5" class="text-center py-3 text-muted">
          Nenhuma venda encontrado.
        </td>
      </tr>
    </tbody>
  </table>
</div>

</template>