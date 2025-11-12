<template>
    

<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/pdv">fajaloja</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/produtos">Produtos</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" to="/clientes">Clientes</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Relatórios</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>