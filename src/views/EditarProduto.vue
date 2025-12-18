<script setup>
import axiosInstance from '@/services/http';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// utlizado para voltar para pagina de produtos
const router = useRouter();

// utilizado para pegar parametro enviado pela rota
const route = useRoute();

// lista de produtos
let produtos = ref([]);

// loading
let loading = ref(false);

// carregamento
let carregamento = ref(true);

// criando objeto
let obj = ref({
    'id': null,
    'nome_produto': '',
    'categoria': 'Selecione uma categoria',
    'valor_produto': null
});



onMounted(() => {
    // armazenando o id passado na rota
    obj.value.id = route.params.id;

    // requisicao get para pegar o produto especifico e conseguir trazer nos inputs
    axiosInstance.get(`/produtos/${obj.value.id}`)
    .then(response =>{
        produtos.value = response.data.data;

        obj.value.nome_produto = produtos.value.nome_produto;
        obj.value.categoria = produtos.value.categoria;
        obj.value.valor_produto = produtos.value.valor_produto;

        carregamento.value = false;
    })
    .catch(error => {
        console.error('Erro ', error);
        carregamento.value = false;
    })
})

function editar_produto() {
    loading.value = true;

    // requisição para atualizar
    axiosInstance.put("/produtos/" + obj.value.id , obj.value)
    .then(response => {
        Swal.fire({
            position: 'top-end',
            title: response.data.message,
            icon: 'success',
            toast: true,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        router.push('/produtos')
    })
    .catch(error => {
        console.error("Erro: ", error);
        Swal.fire({
            title: 'Não foi possível atualizar',
            text: 'favor entrar em contato com o adm do sistema',
            icon: 'error',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Ok'
        });
        loading.value = false;
    })
}
</script>

<template>


<div
    class="d-flex flex-column justify-content-center align-items-center vh-100"
    v-if="carregamento"
>
    <div class="spinner-border">
        <span class="visually-hidden">Aguarde...</span>
    </div>
    <p class="mt-2">Carregando...</p>
</div>

<h1 class="text-center text-black pt-5" v-if="!carregamento">Editar</h1>


<div class="bg-body border p-3 shadow-sm" v-if="!carregamento">
    <form @submit.prevent="editar_produto">
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

        <button type="submit" class="btn btn-primary" :disabled="loading"><span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? "Editando..." : "Editar" }}</button>

    </form>
</div>

</template>