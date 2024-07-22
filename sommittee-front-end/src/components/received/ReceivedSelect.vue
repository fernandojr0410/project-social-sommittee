<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Visualização de recebimento</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="filters.id" label="Código"></v-text-field>
            <v-text-field v-model="filters.value" label="Valor"></v-text-field>
            <v-text-field
              v-model="filters.description"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              :value="formatDate(filters.created_at)"
              label="Data de Criação"
              disabled
            ></v-text-field>
            <v-text-field
              :value="formatDate(filters.updated_at)"
              label="Data de Atualização"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="applyFilters">Aplicar Filtros</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReceivedSelect',
  props: {
    dialog: Boolean,
    filters: Object,
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    applyFilters() {
      this.$emit('apply')
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('pt-BR')
    },
  },
}
</script>
