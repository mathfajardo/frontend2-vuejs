<script setup>
import {reactive, ref} from 'vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/http';
import Swal from 'sweetalert2'


const auth = useAuth();
const router = useRouter();

// variavel de carregamentos
let loading = ref(false);

// função para mostrar mensagens
let message = ref("");
let messageType = ref("");
function showMessage(text, type = "success") {
  message.value = text;
  messageType.value = type;
  setTimeout(() => {
    message.value = "";
  }, 5000);
}

const user = reactive({
  email: '',
  password: ''
})

async function login() {
  loading.value = true;

  axiosInstance.post('/login', user)
  .then((response) => {
    console.log(response);
    auth.setToken(response.data.data.token);
    router.push('/home');
  })
  .catch(error => {
    console.log("erro: ", error);
    Swal.fire({
      title: 'Login ou senha incorretos, tente novamente!',
      confirmButtonColor: '#000000',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  })
  .finally(() => {
    loading.value = false;
  })
}

</script>

<template>

<div class="login-container">
  <div class="login bg-dark text-light rounded p-5 m-auto ">
  <h1 class="text-center text-black mt-5 mb-5 text-white">Faça seu login</h1>
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="email" class="form-label fs-5">Email</label>
      <input type="email" class="form-control" v-model="user.email" placeholder="Digite seu email..." required>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label fs-5">Senha</label>
      <input type="password" class="form-control" v-model="user.password" placeholder="Digite sua senha..." required>
    </div>

    <div class="mb-3">
      <router-link class="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-light" to="/registro">Não tem login? cadastre aqui </router-link>
    </div>
    
    <button type="submit" class="btn btn-primary">
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? 'Entrando...' : 'Entrar' }}
    </button>
  </form>


  </div>
</div>


</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  width: 30%;
  box-shadow: 0 0 10px 2px black;
}


</style>