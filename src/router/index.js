import { createRouter, createWebHistory } from 'vue-router'
import Produto from '@/views/Produto.vue'
import CadastroProduto from '@/views/CadastroProduto.vue'
import Cliente from '@/views/Cliente.vue'
import CadastroCliente from '@/views/CadastroCliente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/produtos',
      name: 'produtos',
      component: Produto
    },
    {
      path: '/cadastroprodutos',
      name: 'cadastroprodutos',
      component: CadastroProduto
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Cliente
    },
    {
      path: '/cadastroclientes',
      name: 'cadastroclientes',
      component: CadastroCliente
    }
  ],
})

export default router
