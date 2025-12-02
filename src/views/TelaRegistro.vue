<script setup>
import axiosInstance from '@/services/http';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// router
const router = useRouter();

// variavel de carregamento
let loading = ref(false);

// criando objeto
let obj = ref({
    'name': '',
    'email': '',
    'password': ''
}) 

function cadastrar_usuario(event) {
    loading.value = true;
    event.preventDefault();

    axiosInstance.post('/user/', obj.value)
    .then(response => {
        router.push('/');
    })
    .catch(error => {
        console.error('Erro: ', error);
    })
}
</script>

<template>

<h1 class="text-center text-black pt-5">Registre-se</h1>


<div class="bg-body border p-3 shadow-sm w-50 m-auto">
    <form @submit="cadastrar_usuario">
        <div class="mb-3">
            <label for="nome" class="form-label">Usuário</label>
            <input type="text" class="form-control" v-model="obj.name" required>
        </div>

        <div class="mb-3">
            <label for="nome" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="obj.email" required>
        </div>
        <div class="mb-3">
            <label for="categoria" class="form-label">Senha</label>
            <input type="password" class="form-control" v-model="obj.password" required>
        </div>
        

        <button type="submit" class="btn btn-primary m-1">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
        <RouterLink class="btn btn-warning" to="/">Já tem uma conta?</RouterLink>

    </form>
</div>



</template>