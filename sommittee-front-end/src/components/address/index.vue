<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="address"
          no-data-text="Nenhuma família encontrada"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.zip_code`]="{ item }">
            <span>{{ item.zip_code | cep }}</span>
          </template>

          <template v-slot:[`item.street`]="{ item }">
            <span>{{ item.street }}</span>
          </template>

          <template v-slot:[`item.number`]="{ item }">
            <span>{{ item.number }}</span>
          </template>

          <template v-slot:[`item.neighborhood`]="{ item }">
            <span>{{ item.neighborhood }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'CEP', value: 'zip_code' },
        { text: 'Rua', value: 'street' },
        { text: 'Número', value: 'number' },
        { text: 'Bairro', value: 'neighborhood' },
      ],
      formatDate,
    }
  },
  computed: {
    address() {
      return this.$store.state.address.address
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        await this.findAll()
      } catch (error) {
        this.$error('Erro ao carregar dados!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      const response = await this.$store.dispatch('address/findAll')
      console.log('findAll', response)
      return response
    },
  },
}
</script>
