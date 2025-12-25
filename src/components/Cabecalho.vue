<script setup>
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const auth = useAuth();
const router = useRouter();

async function fazerLogout() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Logout realizado',
    confirmButtonColor: '#000000',
    showConfirmButton: false,
    toast: true,
    timer: 2000,
    timerProgressBar: true
  });
  await auth.logout();
  router.push('/');
}
</script>

<template>
    

<nav class="navbar navbar-dark bg-dark navbar-expand-lg fs-5">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/home">Faja<span class="text-success">Loja</span></RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Produtos
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" >
            <li><RouterLink to="/produtos" class="dropdown-item" active-class="text-success">Visualizar produtos</RouterLink></li> 
            <li><RouterLink to="/cadastroprodutos" class="dropdown-item" active-class="text-success">Cadastrar Produtos</RouterLink></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Clientes
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" >
            <li><RouterLink to="/clientes" class="dropdown-item" active-class="text-success">Visualizar Clientes</RouterLink></li>
            <li><RouterLink to="/cadastroclientes" class="dropdown-item" active-class="text-success">Cadastrar Clientes</RouterLink></li>
          </ul>
        </li>

        <li class="nav-item dropdown me-5">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            PDV
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" >
            <li><RouterLink to="/vendas" class="dropdown-item" active-class="text-success">Visualizar vendas</RouterLink></li>
            <li><RouterLink to="/pdv" class="dropdown-item" active-class="text-success">Registrar venda</RouterLink></li>
          </ul>
        </li>

        

        <li class="nav-item">
          <a class="nav-link text-danger" @click.prevent="fazerLogout" style="cursor: pointer;"><i class="bi bi-box-arrow-right"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>

<style scoped>
.dropdown-item:focus:active {
  background-color: rgba(255, 255, 255, 0.15) !important;
}
</style>