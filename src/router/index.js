import { createRouter, createWebHistory } from 'vue-router'
import Produto from '@/views/Produto.vue'
import CadastroProduto from '@/views/CadastroProduto.vue'
import Cliente from '@/views/Cliente.vue'
import CadastroCliente from '@/views/CadastroCliente.vue'
import Pdv from '@/views/Pdv.vue'
import TelaLogin from '@/views/TelaLogin.vue'
import { useAuth } from '@/stores/auth';
import TelaRegistro from '@/views/TelaRegistro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: TelaLogin,
      meta: {
        esconderCabecalho: true
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: TelaRegistro,
      meta: {
        esconderCabecalho: true
      }
    },
    {
      path: '/pdv',
      name: 'pdv',
      component: Pdv,
      meta: {
        auth:true
      }
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: Produto,
      meta: {
        auth:true
      }
    },
    {
      path: '/cadastroprodutos',
      name: 'cadastroprodutos',
      component: CadastroProduto,
      meta: {
        auth:true
      }
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Cliente,
      meta: {
        auth:true
      }
    },
    {
      path: '/cadastroclientes',
      name: 'cadastroclientes',
      component: CadastroCliente,
      meta: {
        auth:true
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth();
    if (auth.token) {
      try {
        const autenticado = await auth.checkToken();
        if (autenticado) {
          next();
        } else {
          next({name: 'login'});
        }
      } catch (error) {
        next({name: 'login'});
      }
    } else {
      next({name: 'login'})
    }
  } else {
    next();
  }
})

export default router
