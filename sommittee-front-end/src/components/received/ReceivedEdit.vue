<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar Recebimento</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Colaborador:
            </span>
            <v-text-field
              v-if="updatedReceived && updatedReceived.user"
              v-model="updatedReceived.user.name"
              label="Nome"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.user"
              v-model="updatedReceived.user.surname"
              label="Sobrenome"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.user"
              v-model="updatedReceived.user.email"
              label="E-mail"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Recebimento:
            </span>
            <v-text-field
              v-model="updatedReceived.id"
              label="Código"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="updatedReceived.value"
              label="Valor"
            ></v-text-field>
            <v-text-field
              v-model="updatedReceived.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="updatedReceived.date"
              :value="formatDateTime(updatedReceived.updated_at)"
              label="Data de criação"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="updatedReceived.date"
              label="Data de atualização"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Endereço:
            </span>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.zip_code"
              label="Cep"
            ></v-text-field>

            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.street"
              label="Rua"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.number"
              label="Número"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.complement"
              label="Complemento"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.neighborhood"
              label="Bairro"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.city"
              label="Cidade"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.address"
              v-model="updatedReceived.address.state"
              label="Estado"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Produto:
            </span>
            <v-text-field
              v-if="updatedReceived && updatedReceived.product"
              v-model="updatedReceived.product.name"
              label="Produto"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.product"
              v-model="updatedReceived.product.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-if="updatedReceived && updatedReceived.product"
              v-model="updatedReceived.product.type"
              label="Categoria"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Estoque:
            </span>
            <v-text-field
              v-if="updatedReceived && updatedReceived.stock"
              v-model="updatedReceived.stock.amount"
              label="Quantidade no estoque"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="saveChanges">
          Salvar Alterações
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'ReceivedEdit',
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
      updatedReceived: {
        user: {},
        product: {},
        stock: {},
        address: {},
      },
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedReceived = await this.$store.dispatch(
            'received/findById',
            id
          )
          console.log('ReceivedEdit ID', this.updatedReceived)
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    saveChanges() {
      this.$emit('save', this.updatedReceived)
    },
    formatDate(date) {
      if (!date) return ''
      try {
        return format(new Date(date), 'dd/MM/yyyy')
      } catch (error) {
        console.error('Invalid date value:', date)
        return ''
      }
    },
    formatDateTime(dateTime) {
      if (!dateTime) return ''
      try {
        return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss')
      } catch (error) {
        console.error('Invalid datetime value:', dateTime)
        return ''
      }
    },
  },
}
</script>
