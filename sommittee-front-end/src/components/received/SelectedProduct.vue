<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>Selecionar produto</v-card-title>
        <v-card-text>
          <!-- Seu conteúdo do diálogo -->
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

          <v-list>
            <v-list-item-group v-if="createdReceived.product.length > 0">
              <v-list-item
                v-for="(product, index) in createdReceived.product"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product.name }} - {{ product.type }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ product.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removeProduct(index)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <!-- <v-row>
            <v-col style="padding-top: 50px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do Estoque:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="createdReceived"
                v-model="createdReceived.stock.amount"
                type="number"
                label="Quantidade"
                class="mr-3"
              />
            </v-col>
          </v-row> -->
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
  </v-container>
</template>

<script>
export default {
  name: 'SelectedProduct',
  props: {
    dialog: {
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
        stock: {
          amount: '',
        },
      },
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
        const responseProduct = await this.$store.dispatch('product/findAll', {
          search,
        })
        return responseProduct
      }
    },

    async searchProduct(search) {
      if (search && search.length > 2) {
        this.fetchProduct(search)
      } else {
        this.productList = []
      }
    },
    removeProduct(index) {
      this.createdReceived.product.splice(index, 1)
    },
    addProduct() {
      if (this.selectedProduct) {
        console.log('Produto selecionado para adicionar:', this.selectedProduct) // Debugging
        this.$emit('add-product', this.selectedProduct)
        this.selectedProduct = null
      }
      this.$emit('update:dialog', false)
    },
  },
}
</script>
