<script setup>
import { onMounted, ref } from 'vue';

    // iniciando o array produtos
    let produtos = ref([]);
    let produtosOriginal = ref([]);
    let termoPesquisa = ref([]);

    onMounted(() => {
        fetch('http://localhost:8000/api/produtos/')
        .then(requisicao => requisicao.json())
        .then(retorno => {
          produtos.value = retorno.data;
          produtosOriginal.value = retorno.data;
        })
    });

    // função para remover
    function remover(produto) {

      if (!confirm(`Tem certeza que deseja excluir o produto "${produto.nome_produto}"?`)) {
        return; 
      }

      fetch('http://localhost:8000/api/produtos/' + produto.id, {
        method:'DELETE',
        headers: {'Content-Type':'application/json'}
      })
      .then(requisicao => requisicao.json())
      .then(() => {
        
        let indiceProduto = produtos.value.findIndex(objP => {
          return objP.id === produto.id;
        })

        if (indiceProduto !== -1) {
          produtos.value.splice(indiceProduto, 1);
        }
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


<h1 class="text-center text-black" style="padding-top: 100px;">Lista de produtos</h1>


<div class="d-flex aling-items-center">

<RouterLink class="text-center btn btn-primary m-2" to="/cadastroprodutos">
  Cadastrar novo produto
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