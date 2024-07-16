<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Filtrar Recibos</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="" md="6">
            <v-text-field
              v-model="filters.issue_date"
              label="Data de Emissão"
            ></v-text-field>
            <v-text-field
              v-model="filters.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="filters.type_transaction"
              label="Tipo de Transação"
            ></v-text-field>
            <v-text-field
              v-model="filters.value_amount"
              label="Valor Total"
            ></v-text-field>
            <v-text-field
              v-model="filters.quantity"
              label="Quantidade Paga"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filters.payment_method"
              label="Tipo de Pagamento"
            ></v-text-field>
            <v-text-field
              v-model="filters.receiver_signature"
              label="Recebido por"
            ></v-text-field>
            <v-text-field
              v-model="filters.additional_notes"
              label="Observações"
            ></v-text-field>
            <v-text-field
              v-model="filters.created_at"
              label="Data de Criação"
            ></v-text-field>
            <v-text-field
              v-model="filters.updated_at"
              label="Data de Atualização"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="applyFilters">
          Aplicar Filtros
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReceiptSelect',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    applyFilters() {
      this.$emit('apply')
    },
  },
}
</script>
