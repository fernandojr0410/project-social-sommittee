<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Recebimento</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filters.id"
              label="Código do recebimento"
            ></v-text-field>
            <v-text-field
              v-model="filters.date"
              label="Data do recebimento"
            ></v-text-field>
            <v-text-field
              v-model="filters.amount"
              label="Valor do recebimento"
            ></v-text-field>
            <v-text-field
              v-model="filters.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="filters.created_at"
              label="Data de Criação"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filters.updated_at"
              label="Data de Atualização"
            ></v-text-field>
            <v-text-field
              v-model="filters.user_id"
              label="Código do usuário"
            ></v-text-field>
            <v-text-field
              v-model="filters.address_id"
              label="Código do endereço"
            ></v-text-field>
            <v-text-field
              v-model="filters.product_id"
              label="Código do produto"
            ></v-text-field>
            <v-text-field
              v-model="filters.donor_id"
              label="Código do doador"
            ></v-text-field>
            <v-text-field
              v-model="filters.stock_id"
              label="Código do estoque"
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
  name: 'ReceivedSelect',
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
