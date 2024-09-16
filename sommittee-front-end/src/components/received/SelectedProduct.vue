<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
  >
    <v-card>
      <v-card-title>Selecionar produto</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="selectedProduct"
              :items="productList"
              item-text="name"
              item-value="id"
              label="Buscar produto..."
              :loading="loading"
              :rules="[rules.required]"
              return-object
              @update:search-input="searchProduct"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col style="padding-top: 50px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do Estoque:
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="amount"
              type="number"
              label="Quantidade"
              class="mr-3"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="addProduct"
          color="green"
          style="font-weight: bold; color: white"
        >
          ADICIONAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SelectedProduct',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedProduct: null,
      productList: [],
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
      createdReceived: {
        product: [],
      },
      amount: '',
    }
  },
  methods: {
    async fetchProduct(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search, 'product')
        this.productList = response
      } catch (error) {
        this.$error('Erro ao carregar produto!')
        throw error
      } finally {
        this.loading = false
      }
    },

    async findAll(search, type) {
      if (type === 'product') {
        return await this.$store.dispatch('product/findAll', {
          search,
        })
      }
    },

    async searchProduct(search) {
      if (search && search.length > 2) {
        this.fetchProduct(search)
      } else {
        this.productList = []
      }
    },

    addProduct() {
      if (this.selectedProduct && this.amount) {
        this.createdReceived.product.push({
          product: this.selectedProduct,
          amount: Number(this.amount),
        })
        this.$emit('add-product', {
          product: this.selectedProduct,
          amount: Number(this.amount),
        })
        this.$emit('update:dialog', false)
        this.selectedProduct = null
        this.amount = ''
      }
    },
  },
}
</script>
