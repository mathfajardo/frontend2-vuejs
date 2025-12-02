<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '@/services/http';

    // iniciando o array produtos
    let produtos = ref([]);
    let produtosOriginal = ref([]);
    let termoPesquisa = ref('');

    // carregamento
    let carregamento = ref(true);

    // função para enviar alert
    let message = ref('');
    let messageType = ref('success');
    function showMessage(text, type = "success") {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
      message.value = "";
      }, 5000);
    } 

    onMounted(() => {
        axiosInstance.get('/produtos/')
        .then(response => {
          produtos.value = response.data.data;
          produtosOriginal.value = response.data.data;
          carregamento.value = false;
        })
        .catch(error => {
          console.error('Erro: ', error);
          carregamento.value = false;
        })
    });

    // função para remover
    function remover(produto) {

      axiosInstance.delete(`/produtos/${produto.id}`)
      .then((response) => {
        produtos.value = produtos.value.filter(p => p.id !== produto.id);
        produtosOriginal.value = produtosOriginal.value.filter(p => p.id !== produto.id);
        console.log(response.data);
        showMessage(response.data.message, 'success');
      })
      .catch(error => {
        console.error('Erro: ', error);
        showMessage('Erro ao deletar', 'error')
      })
    }

    // pesquisar
    function pesquisar(event) {
      if (!termoPesquisa.value.trim()) {
        produtos.value = produtosOriginal.value;
        return;
      }

      const termo = termoPesquisa.value.toLowerCase();
      produtos.value = produtosOriginal.value.filter(produto =>
        produto.nome_produto.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo) ||
        produto.valor_produto.toLowerCase().includes(termo)
      );

      event.preventDefault();
      termoPesquisa.value = '';
    }


</script>

<template>
<div
    v-if="message && !carregamento"
    :class="`alert alert-${
      messageType === 'error' ? 'danger' : messageType
    } alert-dismissible fade show`"
    role="alert"
  >
    {{ message }}
    <button type="button" class="btn-close" @click="message = ''"></button>
</div>

<div
    class="d-flex flex-column justify-content-center align-items-center"
    v-if="carregamento"
  >
    <div class="spinner-border mb-3 mt-5" style="width: 4rem; height: 4rem">
      <span class="visually-hidden">Aguarde...</span>
    </div>
    <p class="text-muted">Aguarde...</p>
</div>

<h1 class="text-center text-black pt-5" v-if="!carregamento">Lista de produtos</h1>


<div class="d-flex aling-items-center" v-if="!carregamento">

<RouterLink class="text-center btn btn-primary m-2" to="/cadastroprodutos">
  Cadastrar novo produto
</RouterLink>
<form class="d-flex m-2" role="search" @submit="pesquisar">
      <input class="form-control me-2" type="search" placeholder="Pesquisar..." v-model="termoPesquisa">
      <button class="btn btn-success" type="submit">Pesquisar</button>
</form>

</div>

<div class="table-responsive shadow-sm " v-if="!carregamento">
  <table class="table border table-hover">
    <thead class="">
      <tr>
        <th scope="col">Nome do produtos</th>
        <th scope="col">Categoria</th>
        <th scope="col">Valor</th>
        <th scope="col">Editar</th>
        <th scope="col">Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, indice) in produtos">
        <td>{{ p.nome_produto }}</td>
        <td>{{ p.categoria}}</td>
        <td>R$ {{ p.valor_produto }}</td>
        <td><RouterLink class="btn btn-outline-primary">Editar</RouterLink></td>
        <td><button class="btn btn-outline-danger" @click="remover(p)">Deletar</button></td>
      </tr>

      <tr v-if="produtos.length === 0">
        <td colspan="5" class="text-center py-3 text-muted">
          Nenhum produto encontrado.
        </td>
      </tr>
    </tbody>
  </table>
</div>




</template>