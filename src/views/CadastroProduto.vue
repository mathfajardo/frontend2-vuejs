<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/http';

    // iniciando o router
    const router = useRouter();

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

        axiosInstance.post('/produtos/', obj.value)
        .then(response => {
            router.push('/produtos')
        })
        .catch(error => {
            console.error('Erro: ', error);
        }) 
    }


</script>

<template>

<h1 class="text-center text-black" style="padding-top: 100px;">Cadastro</h1>


<div class="bg-body border p-3 rounded-3 shadow-sm">
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