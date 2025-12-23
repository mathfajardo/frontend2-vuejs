<script setup>
import axiosInstance from '@/services/http';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

function formatarData(data) {
      return new Date(data).toLocaleDateString('pt-br', {
        timeZone: 'UTC'
      })
    }

const router = useRouter();

const route = useRoute();

let clientes = ref([]);

let loading =  ref(false);

let carregamento = ref(true);

let obj = ref({
    'id': null,
    'nome_cliente': '',
    'data_nascimento': null,
    'ativo': null
});

onMounted(() => {

    obj.value.id = route.params.id;

    axiosInstance.get(`/clientes/${obj.value.id}`)
    .then(response => {
        clientes.value = response.data.data;

        obj.value.nome_cliente = clientes.value.nome_cliente;
        obj.value.data_nascimento = clientes.value.data_nascimento;
        obj.value.ativo = clientes.value.ativo;

        console.log(obj.value.data_nascimento)

        carregamento.value = false;
    })
    .catch(error => {
        console.error("Erro: ", error);
        carregamento.value = false
    })
})

function editar_cliente() {
    loading.value = true;

    

    axiosInstance.put(`/clientes/${obj.value.id}`, obj.value)
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
        router.push('/clientes');
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
    <form @submit.prevent="editar_cliente">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome do cliente</label>
            <input type="text" class="form-control" v-model="obj.nome_cliente">
        </div>

        <div class="mb-3">
            <label for="categoria" class="form-label">Data de nascimento</label>
            <input type="date" class="form-control" v-model="obj.data_nascimento">
        </div>

        <div class="mb-3">
            <label for="categoria" class="form-label">Ativo</label>
            <select class="form-select" id="categoria" v-model="obj.ativo">
                <option value="1" selected>Sim</option>
                <option value="0">Não</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading"><span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? "Editando..." : "Editar" }}</button>

    </form>
</div>
</template>