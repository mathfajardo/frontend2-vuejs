<script setup>
import { onMounted, ref } from 'vue';

    // iniciando o array produtos
    let produtos = ref([]);

    onMounted(() => {
        fetch('http://localhost:8000/api/produtos/')
        .then(requisicao => requisicao.json())
        .then(retorno => produtos.value = retorno.data)
    });

</script>

<template>


<h1 class="text-center pt-5 text-light">Lista de produtos</h1>
<RouterLink class="text-center btn btn-success m-2" to="/cadastroprodutos">Cadastrar novo produto</RouterLink>

<table class="table table-striped border border-black">
  <thead>
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
      <td>{{ p.valor_produto }}</td>
      <td><RouterLink class="btn btn-primary">Editar</RouterLink></td>
      <td><RouterLink class="btn btn-danger">Deletar</RouterLink></td>
    </tr>
  </tbody>
</table>



</template>