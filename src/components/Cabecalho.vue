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
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="text-success" to="/produtos">Produtos</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" active-class="text-success" to="/clientes">Clientes</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" active-class="text-success" to="/vendas">Vendas</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" active-class="text-success" to="/pdv">PDV</RouterLink>
        </li>

        

        <li class="nav-item">
          <a class="nav-link text-danger" @click.prevent="fazerLogout" style="cursor: pointer;">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>