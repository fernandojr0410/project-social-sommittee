<template>
  <v-container>
    <v-fab-transition>
      <v-btn
        fixed
        fab
        right
        bottom
        @click="openDialog"
        color="green"
        x-large
        style="color: white"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>Criar produto</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="createdProduct.name"
                label="Produto"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="createdProduct.type"
                label="Categoria"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="createdProduct.description"
                label="Descrição"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
            color="primary"
            style="color: white; font-weight: bold"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createProduct"
            style="color: white; font-weight: bold"
          >
            CRIAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ProductCreate',
  data() {
    return {
      dialog: false,
      createdProduct: this.getProduct(),
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  methods: {
    getProduct() {
      return {
        name: '',
        type: '',
        description: '',
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },

    async createProduct() {
      const productData = {
        name: this.createdProduct.name,
        type: this.createdProduct.type,
        description: this.createdProduct.description,
      }
      console.log('Product Data:', productData)

      try {
        const response = await this.$store.dispatch(
          'product/create',
          productData
        )
        console.log('Response:', response)
        if (response) {
          this.$success('Registro criado!')
          this.$store.dispatch('product/findAll')
          this.closeDialog()
        } else {
          this.$error('Erro ao criar produto!')
        }
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
  },
}
</script>
