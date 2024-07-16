<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar Recibo</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="editedReceipt.issue_date"
              label="Data de Emissão"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.type_transaction"
              label="Tipo de Transação"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.value_amount"
              label="Valor Total"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.quantity"
              label="Quantidade Paga"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="editedReceipt.payment_method"
              label="Tipo de Pagamento"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.receiver_signature"
              label="Recebido por"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.additional_notes"
              label="Observações"
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.created_at"
              label="Data de Criação"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="editedReceipt.updated_at"
              label="Data de Atualização"
              disabled
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
export default {
  name: 'ReceiptEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.editedReceipt = await this.$store.dispatch('receipt/id', id)
        }
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    saveChanges() {
      this.$emit('save')
    },
  },
}
</script>
