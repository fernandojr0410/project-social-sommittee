<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Lista de Recebimentos</v-card-title>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="receiveds"
          :items-per-page="10"
          no-data-text="Nenhum recebido encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              :color="isSelected(item) ? 'primary' : ''"
              @click="showDetails(item)"
            >
              mdi-eye
            </v-icon>
            <v-icon class="mr-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.value`]="{ item }">
            {{ item.value | currency }}
          </template>
        </v-data-table>

        <ReceivedSelect
          :dialog="filterDialog"
          :filters="filters"
          @close="filterDialog = false"
          @apply="applyFilters"
        />

        <ReceivedEdit
          :dialog="editDialog"
          :id="updatedReceivedId"
          @close="editDialog = false"
          @save="saveUpdatedReceived"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do Recibo</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="selectedReceived">
              <v-col
                v-for="(value, key) in selectedReceived"
                :key="key"
                cols="12"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ translateKey(key) }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ReceivedSelect from '@/components/received/ReceivedSelect.vue'
import ReceivedEdit from '@/components/received/ReceivedEdit.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Received',
  components: { ReceivedSelect, ReceivedEdit },
  data() {
    return {
      loading: false,
      dialog: false,
      filterDialog: false,
      selectedReceived: null,
      filters: {},
      editDialog: false,
      updatedReceivedId: null,
      headers: [
        { text: 'Data do recebimento', value: 'date' },
        { text: 'Código do recebimento', value: 'id', class: 'custom-header' },
        { text: 'Descrição', value: 'description' },
        { text: 'Valor do recebimento', value: 'value' },
        { text: 'Ações', value: 'actions', align: 'center' },
      ],
    }
  },
  computed: {
    receiveds() {
      return this.$store.state.received.received
    },
  },
  created() {
    // this.loading = true
    this.findAll()
    // this.loading = false
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        await this.findAll()
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      await this.$store.dispatch('received/findAll')
    },
    showDetails(item) {
      this.selectedReceived = item
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.selectedReceived = null
    },
    applyFilters() {
      console.log('Aplicando filtros:', this.filters)
      this.filterDialog = false
      this.findAll()
    },
    editItem(item) {
      this.updatedReceivedId = item.id
      this.editDialog = true
    },
    ...mapActions('received', ['update']),

    async saveUpdatedReceived(updatedReceived) {
      await this.update(updatedReceived)
    },

    async saveChanges() {
      const dataToUpdate = {
        id: this.updatedReceived.id,
        value: this.updatedReceived.value,
        description: this.updatedReceived.description,
      }
      await this.saveUpdatedReceived(dataToUpdate)
    },
    translateKey(key) {
      const translations = {
        id: 'Código do recebimento',
        date: 'Data do recebimento',
        value: 'Valor do recebimento',
        description: 'Descrição',
        created_at: 'Data de Criação',
        updated_at: 'Data de Atualização',
      }
      return translations[key] || key
    },
    isSelected(item) {
      return this.selectedReceived === item
    },
  },
}
</script>
