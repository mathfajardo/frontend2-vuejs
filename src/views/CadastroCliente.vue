<script setup>
import axiosInstance from '@/services/http';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

    // variavel de loading
    let loading = ref(false);

    // iniciando o router
    const router = useRouter();

    // vetor para armazenar os produtos
    let clientes = ref([]);

    // criando objeto para armazenar os dados antes do post
    let obj = ref({
        'id': null,
        'nome_cliente': '',
        'data_nascimento': '',
        'ativo': 1
    });

    // função para cadastrar
    function cadastrar_cliente(event) {
        event.preventDefault();
        loading.value = true;

        axiosInstance.post('/clientes/', obj.value)
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
            router.push('/clientes')
        })
        .catch(error => {
            console.error('Erro: ', error);
            Swal.fire({
                title: 'Não foi cadastrar!',
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

<h1 class="text-center text-black pt-5">Cadastro</h1>


<div class="bg-body border p-3 shadow-sm">
    <form @submit="cadastrar_cliente">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome do cliente</label>
            <input type="text" class="form-control" v-model="obj.nome_cliente">
        </div>

        <div class="mb-3">
            <label for="nome" class="form-label">Data de nascimento</label>
            <input type="date" class="form-control" v-model="obj.data_nascimento">
        </div>
        <div class="mb-3">
            <label for="categoria" class="form-label">Ativo</label>
            <select class="form-select" id="categoria" v-model="obj.ativo">
                <option value="1" selected>Sim</option>
                <option value="0">Não</option>
            </select>
        </div>
        

        <button type="submit" class="btn btn-primary" :disabled="loading"><span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? "Cadastrando..." : "Cadastrar" }}</button>

    </form>
</div>



</template>