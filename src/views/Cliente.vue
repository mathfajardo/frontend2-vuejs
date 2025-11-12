<script setup>
import { onMounted, ref } from 'vue';

    // iniciando o array produtos
    let clientes = ref([]);
    let clientesOriginal = ref([]);
    let termoPesquisa = ref([]);

    onMounted(() => {
        fetch('http://localhost:8000/api/clientes/')
        .then(requisicao => requisicao.json())
        .then(retorno => {
          clientes.value = retorno.data;
          clientesOriginal.value = retorno.data;
        })
    });

    // função para remover
    function remover(cliente) {

      if (!confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome_cliente}"?`)) {
        return; 
      }

      fetch('http://localhost:8000/api/clientes/' + cliente.id, {
        method:'DELETE',
        headers: {'Content-Type':'application/json'}
      })
      .then(requisicao => requisicao.json())
      .then(() => {
        
        let indiceCliente = clientes.value.findIndex(objP => {
          return objP.id === cliente.id;
        })

        if (indiceCliente !== -1) {
          clientes.value.splice(indiceCliente, 1);
        }
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


<h1 class="text-center text-black" style="padding-top: 100px;">Lista de clientes</h1>


<div class="d-flex aling-items-center">

<RouterLink class="text-center btn btn-primary m-2" to="/cadastroclientes">
  Cadastrar novo cliente
</RouterLink>
<form class="d-flex m-2" role="search" @submit="pesquisar">
      <input class="form-control me-2" type="search" placeholder="Pesquisar..." v-model="termoPesquisa">
      <button class="btn btn-success" type="submit">Pesquisar</button>
</form>

</div>

<div class="table-responsive shadow-sm ">
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