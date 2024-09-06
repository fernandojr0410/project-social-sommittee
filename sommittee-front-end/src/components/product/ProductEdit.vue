<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar informações</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do produto:
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="updatedProduct.name"
              label="Produto"
              class="mr-3"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updatedProduct.type"
              label="Categoria"
              class="mr-3"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="updatedProduct.description"
              label="Descrição"
              class="mr-3"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="saveChanges"
          style="background-color: #007fff; color: white; font-weight: bold"
        >
          SALVAR ALTERAÇÕES
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProductEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      updatedProduct: this.getProduct(),
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedProduct = await this.$store.dispatch(
            'product/findById',
            id
          )
        }
      },
    },
  },
  methods: {
    getProduct() {
      return {
        name: '',
        type: '',
        description: '',
      }
    },
    closeDialog() {
      this.$emit('close')
    },
    async saveChanges() {
      try {
        const productId = this.id
        const updateData = {
          id: productId,
          payload: {
            name: this.updatedProduct.name,
            type: this.updatedProduct.type,
            description: this.updatedProduct.description,
          },
        }
        const response = await this.$store.dispatch(
          'product/update',
          updateData
        )
        this.$success('Registro atualizado!')
        this.updatedProduct = this.getProduct()
        this.closeDialog()
        return response
      } catch (error) {
        this.$error('Erro ao atualizar registro!')
        throw error
      }
    },
  },
}
</script>
