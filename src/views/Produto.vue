<script setup>
import { onMounted, ref } from 'vue';

    // iniciando o array produtos
    let produtos = ref([]);

    // criando o objeto
    let obj = ref({
      'id': 0,
      'nome_produto': '',
      'categoria': '',
      'valor_produto': ''
    });


    onMounted(() => {
        fetch('http://localhost:8000/api/produtos/')
        .then(requisicao => requisicao.json())
        .then(retorno => produtos.value = retorno.data)
    });

    // função para remover
    function remover() {

      fetch('http://localhost:8000/api/produtos/' + obj.value.id, {
        method:'DELETE',
        headers: {'Content-Type':'application/json'}
      })
      .then(requisicao => requisicao.json())
      .then(() => {
        
        let indiceProduto = produtos.value.findIndex(objP => {
          return objP.id === obj.value.id;
        })
      })
    }

</script>

<template>


<h1 class="text-center pt-5 text-light">Lista de produtos</h1>
<RouterLink class="text-center btn btn-success m-2" to="/cadastroprodutos">Cadastrar novo produto</RouterLink>

<table class="table table-striped border border-black table-hover">
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
      <td><button class="btn btn-primary" @click="remover">Editar</button></td>
      <td><RouterLink class="btn btn-danger">Deletar</RouterLink></td>
    </tr>
  </tbody>
</table>



</template>