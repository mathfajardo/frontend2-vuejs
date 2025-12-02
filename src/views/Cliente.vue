<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '@/services/http';

    // iniciando o array produtos
    let clientes = ref([]);
    let clientesOriginal = ref([]);
    let termoPesquisa = ref([]);

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
        axiosInstance.get('/clientes/')
        .then((response) => {
          clientes.value = response.data.data;
          clientesOriginal.value = response.data.data;
          carregamento.value = false;
        })
        .catch(error => {
          console.error('Erro: ', error);
          carregamento.value = false;
        })
    });

    // função para remover
    function remover(cliente) {

      axiosInstance.delete(`/clientes/${cliente.id}`)
      .then((response) => {
        clientes.value = clientes.value.filter(c => c.id !== cliente.id);
        clientesOriginal.value = clientesOriginal.value.filter(c => c.id !== cliente.id);
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
        clientes.value = clientesOriginal.value;
        return;
      }

      const termo = termoPesquisa.value.toLowerCase();
      clientes.value = clientesOriginal.value.filter(cliente =>
        cliente.nome_cliente.toLowerCase().includes(termo) ||
        cliente.data_nascimento.toLowerCase().includes(termo) ||
        cliente.ativo.toLowerCase().includes(termo)
      );

      event.preventDefault();
      termoPesquisa.value = '';
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


<h1 class="text-center text-black pt-5" v-if="!carregamento">Lista de clientes</h1>

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

<div class="d-flex aling-items-center" v-if="!carregamento">

<RouterLink class="text-center btn btn-primary m-2" to="/cadastroclientes">
  Cadastrar novo cliente
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
        <th scope="col">Nome do cliente</th>
        <th scope="col">Data de nascimento</th>
        <th scope="col">Ativo</th>
        <th scope="col">Editar</th>
        <th scope="col">Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(c, indice) in clientes">
        <td>{{ c.nome_cliente }}</td>
        <td>{{ c.data_nascimento}}</td>
        <td>{{ c.ativo }}</td>
        <td><RouterLink class="btn btn-outline-primary">Editar</RouterLink></td>
        <td><button class="btn btn-outline-danger" @click="remover(c)">Deletar</button></td>
      </tr>

      <tr v-if="clientes.length === 0">
        <td colspan="5" class="text-center py-3 text-muted">
          Nenhum cliente encontrado.
        </td>
      </tr>
    </tbody>
  </table>
</div>




</template>