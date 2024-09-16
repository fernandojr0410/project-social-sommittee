<template>
  <v-app>
    <v-main>
      <v-btn fab color="green" class="fab" @click="handleFabClick">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-main>
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Adicionar novo recebimento</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="pt-10">
              <v-col cols="12">
                <span class="font-weight-bold" style="font-size: 16px">
                  Recebimento:
                </span>
                <v-row class="pt-4">
                  <v-col cols="12" md="6" class="pa-2">
                    <v-text-field
                      label="Valor"
                      outlined
                      v-model="createdReceived.value"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pa-2">
                    <v-text-field
                      label="Descrição"
                      outlined
                      v-model="createdReceived.description"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold" style="font-size: 16px">
                  Endereço:
                </span>
                <v-row class="pt-4">
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Cep"
                      outlined
                      v-model="createdReceived.address.zip_code"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Rua"
                      outlined
                      v-model="createdReceived.address.street"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Número"
                      outlined
                      v-model="createdReceived.address.number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Complemento"
                      outlined
                      v-model="createdReceived.address.complement"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Bairro"
                      outlined
                      v-model="createdReceived.address.neighborhood"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Cidade"
                      outlined
                      v-model="createdReceived.address.city"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Estado"
                      outlined
                      v-model="createdReceived.address.state"
                      maxlength="2"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold" style="font-size: 16px">
                  Produto:
                </span>
                <v-row class="pt-4">
                  <v-col cols="12" md="6" class="pa-2">
                    <v-text-field
                      label="Nome do Produto"
                      outlined
                      v-model="createdReceived.product.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pa-2">
                    <v-text-field
                      label="Descrição do Produto"
                      outlined
                      v-model="createdReceived.product.description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pt-4">
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Categoria"
                      outlined
                      v-model="createdReceived.product.type"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold" style="font-size: 16px">
                  Estoque:
                </span>
                <v-row class="pt-4">
                  <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field
                      label="Quantidade no estoque"
                      outlined
                      v-model="createdReceived.stock.value"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="createRecord"
            style="background-color: #228b22; color: white"
          >
            CRIAR REGISTRO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'FloatingAction',
  data() {
    return {
      dialog: false,
      createdReceived: {
        value: '',
        description: '',
        date: '',
        created_at: '',
        updated_at: '',
        user: {},
        address: {
          zip_code: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
        product: {
          name: '',
          description: '',
          type: '',
        },
        stock: {
          value: '',
        },
      },
    }
  },
  methods: {
    handleFabClick() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async createRecord() {},
  },
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  color: white;
}
</style>
