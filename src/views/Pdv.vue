<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/http';
import Swal from 'sweetalert2'

    // carregamento
    let carregamento = ref(true);

    const router = useRouter();

    // função para enviar alert
    let message = ref('');
    let messageType = ref('success');
    function showMessage(text, type = "success") {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
      message.value = "";
      }, 5000);
    } 

    // objetos
    let produtos = ref([]);
    let clientes = ref([]);

    let venda = ref({
        produto_id: '',
        cliente_id: '',
        quantidade: 1,
        valor_total: 0
    });

    // buscar produtos e clientes
    onMounted(() => {
        axiosInstance.get('/produtos/')
        .then((response) => {
            produtos.value = response.data.data;
            carregamento.value = false;
        })
        .catch(error => {
            console.error('Erro: ', error);
            carregamento.value = false;
        })

        // get para clientes
        axiosInstance.get('/clientes/')
        .then((response) => {
            clientes.value = response.data.data;
            carregamento.value = false
        })
        .catch(error => {
            console.error('Erro: ', error);
            carregamento.value = false;
        })
    });

    // encontrar o produto selecionado
    const produtoSelecionado = computed(() => {
        return produtos.value.find(produto => produto.id == venda.value.produto_id);
    });

    // calcurar o valor automaticamente
    const valorTotal = computed(() => {
        if (!produtoSelecionado.value) {
            return 0;
        }
        return produtoSelecionado.value.valor_produto * venda.value.quantidade;
    });

    watch([() => venda.value.produto_id, () => venda.value.quantidade], () => {
        venda.value.valor_total = valorTotal.value;
    });


    // função para registrar a venda
    function registrarVenda(event) {
        event.preventDefault();

        // garantir que o valor está atualizado
        venda.value.valor_total = valorTotal.value;

        axiosInstance.post('/vendas', venda.value)
        .then((response) => {
            if (response.data.status === 200) {
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                    confirmButtonColor: '#000000',
                    confirmButtonText: 'Ok'
                });
                venda.value = {
                    produto_id: '',
                    cliente_id: '',
                    quantidade: 1,
                    valor_total: 0
                }
            };
        })
        .catch(error => {
            console.error('Erro ao registrar a venda: ', error);
            Swal.fire({
                title: 'Não foi possível deletar',
                text: 'favor entrar em contato com o adm do sistema',
                icon: 'error',
                confirmButtonColor: '#000000',
                confirmButtonText: 'Ok'
            });
        })
    }
        


</script>

<template>




<div
    class="d-flex flex-column justify-content-center align-items-center"
    v-if="carregamento"
  >
    <div class="spinner-border mb-3 mt-5" style="width: 4rem; height: 4rem">
      <span class="visually-hidden">Aguarde...</span>
    </div>
    <p class="text-muted">Aguarde...</p>
</div>

<h1 class="text-center text-black pt-5" v-if="!carregamento">PDV - Registre sua venda</h1>

<div class="bg-light border p-3 shadow-sm" v-if="!carregamento">
    <form @submit="registrarVenda">
        <div class="mb-3">
            <label for="produto" class="form-label">Selecione o produto</label>
            <select id="produto" class="form-select" v-model="venda.produto_id" required>
                <option value="">Selecione um produto</option>
                <option v-for="produto in produtos" :key="produto.id" :value="produto.id">
                    {{ produto.nome_produto }} - R$ {{ produto.valor_produto }}
                </option>
            </select>
        </div>
        
        <div class="mb-3">
            <label for="cliente" class="form-label">Selecione o cliente</label>
            <select id="cliente" class="form-select" v-model="venda.cliente_id" required>
                <option value="">Selecione um cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                    {{ cliente.nome_cliente }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade</label>
            <input type="number" class="form-control" id="quantidade" v-model="venda.quantidade" min="1" required>
        </div>

        <div class="mb-3">
            <label for="valorTotal" class="form-label">Valor Total</label>
            <input type="text" class="form-control" id="valorTotal" :value="'R$ ' + valorTotal.toFixed(2)" disabled readonly>
        </div>

   
        <button type="submit" class="btn btn-primary">Cadastrar</button>

    </form>
</div>



</template>