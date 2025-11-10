import { createRouter, createWebHistory } from 'vue-router'
import Produto from '@/views/Produto.vue'
import CadastroProduto from '@/views/CadastroProduto.vue'

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
    }
  ],
})

export default router
