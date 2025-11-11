<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';



    // iniciando o router
    const router = useRouter();

    // vetor para armazenar os produtos
    let produtos = ref([]);

    onMounted(() => {
        fetch('http://localhost:8000/api/produtos/')
        .then(requisicao => requisicao.json())
        .then(retorno => produtos.value = retorno.data)
    });

    // criando objeto para armazenar os dados antes do post
    let obj = ref({
        'id': 0,
        'nome_produto': '',
        'categoria': 'Selecione uma categoria',
        'valor_produto': 0
    });

    // função para cadastrar
    function cadastrar_produto(event) {
        event.preventDefault();

        fetch('http://localhost:8000/api/produtos/', {
            method: 'POST',
            body: JSON.stringify(obj.value),
            headers: {'Content-Type':'application/json'}
        })
        .then(requisicao =>requisicao.json())
        .then(retorno => {
            produtos.value.push(retorno.data)

            router.push('/produtos')
        })
    }


</script>

<template>

<h1 class="text-center text-light" style="padding-top: 100px;">Cadastro</h1>


<div class="bg-light p-3 rounded-3">
    <form @submit="cadastrar_produto">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome do produto</label>
            <input type="text" class="form-control" v-model="obj.nome_produto">
        </div>

        <div class="mb-3">
            <label for="categoria" class="form-label">Categoria</label>
            <select class="form-select" id="categoria" v-model="obj.categoria">
                <option selected>Outros</option>
                <option value="Cabos">Cabos</option>
                <option value="Monitores">Monitores</option>
                <option value="Teclados">Teclados</option>
                <option value="Gabinetes">Gabinetes</option>
                <option value="Mouses">Mouses</option>
                <option value="Hardware">Hardware</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="1" class="form-label">Valor</label>
            <input type="number" class="form-control" v-model="obj.valor_produto">
        </div>

        <button type="submit" class="btn btn-primary">Cadastrar</button>

    </form>
</div>



</template>