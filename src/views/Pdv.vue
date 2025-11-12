<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';



    const router = useRouter();

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
    onMounted(async () => {
        try {
            //buscar produtos
            const respostaProdutos = await fetch('http://localhost:8000/api/produtos/');
            const dadosProdutos = await respostaProdutos.json();
            produtos.value = dadosProdutos.data;

            // buscar clientes
            const respostaClientes = await fetch('http://localhost:8000/api/clientes/');
            const dadosClientes = await respostaClientes.json();
            clientes.value = dadosClientes.data;
        } catch(erro) {
            console.error('erro ao carregar os dados da api: ', erro);
        }
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
    async function registrarVenda(event) {
        event.preventDefault();

        // garantir que o valor está atualizado
        venda.value.valor_total = valorTotal.value;

        try {
            const resposta = await fetch('http://localhost:8000/api/vendas/', {
                method: 'POST',
                body: JSON.stringify(venda.value),
                headers: {'Content-Type': 'application/json'}
            });

            const resultado = await resposta.json();

            if (resultado.ok || resultado.status === 200) {
                alert('Venda registrada com sucesso');
                // limpar form
                venda.value = {
                    produto_id: '',
                    cliente_id: '',
                    quantidade: 1,
                    valor_total: 0
                };
                router.push('/pdv')
            }
        } catch (erro) {
            console.error('Erro ao registrar a venda:', erro);
            alert('Erro ao registrar a venda');
        }
    }
        


</script>

<template>

<h1 class="text-center text-black" style="padding-top: 100px;">PDV - Registre sua venda</h1>

<div class="bg-info-subtle border p-3 rounded-3 shadow-sm">
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