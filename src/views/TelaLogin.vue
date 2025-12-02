<script setup>
import {reactive, ref} from 'vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/http';


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
    showMessage(error.response?.data?.data?.message || 'Não autenticado', 'error');
  })
  .finally(() => {
    loading.value = false;
  })
}

</script>

<template>

<h1 class="text-center text-black" style="padding-top: 100px;">Faça seu login</h1>

<div
  v-if="message"
  :class="`w-50 m-auto mb-1 alert alert-${
    messageType === 'error' ? 'danger' : messageType
  } alert-dismissible fade show`"
  role="alert"
>
  {{ message }}
  <button type="button" class="btn-close" @click="message = ''"></button>
</div>

<div class="bg-body border p-3 shadow-sm w-50 m-auto">
<form @submit.prevent="login">
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" v-model="user.email" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Senha</label>
    <input type="password" class="form-control" v-model="user.password" required>
  </div>

  <div class="mb-3">
    <router-link class="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/registro">Não tem login? cadastre aqui </router-link>
  </div>
  
  <button type="submit" class="btn btn-primary">
    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>{{ loading ? 'Entrando...' : 'Entrar' }}
  </button>
</form>


</div>



</template>