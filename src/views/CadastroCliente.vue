<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';



    // iniciando o router
    const router = useRouter();

    // vetor para armazenar os produtos
    let clientes = ref([]);

    onMounted(() => {
        fetch('http://localhost:8000/api/produtos/')
        .then(requisicao => requisicao.json())
        .then(retorno => clientes.value = retorno.data)
    });

    // criando objeto para armazenar os dados antes do post
    let obj = ref({
        'id': 0,
        'nome_cliente': '',
        'data_nascimento': '',
        'ativo': 0
    });

    // função para cadastrar
    function cadastrar_produto(event) {
        event.preventDefault();

        fetch('http://localhost:8000/api/clientes/', {
            method: 'POST',
            body: JSON.stringify(obj.value),
            headers: {'Content-Type':'application/json'}
        })
        .then(requisicao =>requisicao.json())
        .then(retorno => {
            clientes.value.push(retorno.data)

            router.push('/clientes')
        })
    }


</script>

<template>

<h1 class="text-center text-black" style="padding-top: 100px;">Cadastro</h1>


<div class="bg-body border p-3 rounded-3 shadow-sm">
    <form @submit="cadastrar_produto">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome do cliente</label>
            <input type="text" class="form-control" v-model="obj.nome_cliente">
        </div>

        <div class="mb-3">
            <label for="nome" class="form-label">Data de nascimetno</label>
            <input type="date" class="form-control" v-model="obj.data_nascimento">
        </div>

        <div class="mb-3">
            <label for="1" class="form-label">Ativo</label>
            <input type="text" class="form-control" v-model="obj.ativo">
        </div>

        <button type="submit" class="btn btn-primary">Cadastrar</button>

    </form>
</div>



</template>