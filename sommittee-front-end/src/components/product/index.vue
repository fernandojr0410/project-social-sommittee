<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="product"
          :items-per-page="10"
          no-data-text="Nenhuma família encontrada"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <span>{{ item.name }}</span>
          </template>

          <template v-slot:[`item.description`]="{ item }">
            <span>{{ item.description }}</span>
          </template>
          <template v-slot:[`item.type`]="{ item }">
            <span>{{ item.type }}</span>
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <span>
              {{
                item.stocks && item.stocks.length > 0
                  ? item.stocks[0].amount
                  : 'N/A'
              }}
            </span>
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
        { text: 'Nome', value: 'name' },
        { text: 'Descrição', value: 'description' },
        { text: 'Tipo produto', value: 'type' },
        { text: 'Quantidade estoque', value: 'amount' },
      ],
      formatDate,
    }
  },
  computed: {
    product() {
      return this.$store.state.product.product
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
      await this.$store.dispatch('product/findAll')
    },
  },
}
</script>
