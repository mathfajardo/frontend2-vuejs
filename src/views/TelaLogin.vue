<script setup>
import http from '@/services/http';
import {reactive} from 'vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const user = reactive({
  email: 'mathfajardo@hotmail.com',
  password: 'senha'
})

async function login() {
    try {
      const {data} = await http.post('/login', user);
      console.log(data);
      auth.setToken(data.data.token);
      router.push('/pdv');
    } catch (error) {
      console.log(error?.response?.data)
    }
  }

</script>

<template>

<h1 class="text-center text-black" style="padding-top: 100px;">Faça seu login</h1>


<div class="bg-body border p-3 rounded-3 shadow-sm">
    

<form @submit.prevent="login">
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" v-model="user.email">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Senha</label>
    <input type="password" class="form-control" v-model="user.password">
  </div>

  <div class="mb-3">
    <router-link class="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/">Não tem login? cadastre aqui </router-link>
  </div>
  
  <button type="submit" class="btn btn-primary">Entrar</button>
</form>


</div>



</template>