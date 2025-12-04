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



<div class="registro-container">
    <div class="registro bg-dark text-light rounded p-5 m-auto ">
        <h1 class="text-center mt-5 mb-4 text-light">Registre-se</h1>
        <form @submit="cadastrar_usuario">
            <div class="mb-3">
                <label for="nome" class="form-label fs-5">Usuário</label>
                <input type="text" class="form-control" v-model="obj.name" placeholder="Digite o nome do usuário..." required>
            </div>

            <div class="mb-3">
                <label for="nome" class="form-label fs-5">Email</label>
                <input type="email" class="form-control" v-model="obj.email" placeholder="Digite seu email.." required>
            </div>
            <div class="mb-3">
                <label for="categoria" class="form-label fs-5">Senha</label>
                <input type="password" class="form-control" v-model="obj.password" placeholder="Digite sua senha..." required>
            </div>
            

            <button type="submit" class="btn btn-primary m-1">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
            <RouterLink class="btn btn-warning" to="/">Já tem uma conta?</RouterLink>

        </form>
    </div>
</div>



</template>

<style scoped>

.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.registro {
  width: 30%;
  box-shadow: 0 0 10px 2px black;
}
</style>