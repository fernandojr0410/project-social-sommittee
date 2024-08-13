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

          <!-- :color="isSelected(item) ? 'primary' : ''" -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="showDetails(item)">mdi-eye</v-icon>

            <v-icon class="mr-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do produto</span>
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
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct"
                v-model="selectedProduct.name"
                label="Produto"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct"
                v-model="selectedProduct.description"
                label="Descrição"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedProduct"
                v-model="selectedProduct.type"
                label="Categoria"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do estoque:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedProduct && selectedProduct.stocks"
                v-model="selectedProduct.stocks[0].amount"
                label="Quantidade de produto"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações de doação:
              </span>
            </v-col>
          </v-row>

          <v-text-field
          
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      dialog: false,
      selectedProduct: null,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome', value: 'name' },
        { text: 'Descrição', value: 'description' },
        { text: 'Tipo produto', value: 'type' },
        { text: 'Quantidade estoque', value: 'amount' },
        { text: 'Ações', value: 'actions' },
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

    showDetails(item) {
      this.selectedProduct = item
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },
  },
}
</script>
