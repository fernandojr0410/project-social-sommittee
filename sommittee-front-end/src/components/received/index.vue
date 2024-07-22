<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="receiveds"
          :items-per-page="10"
          no-data-text="Nenhum recebimento encontrado"
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
          <span class="headline">Detalhes do recebimento</span>
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
    <FloatingAction />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ReceivedSelect from '@/components/received/ReceivedSelect.vue'
import ReceivedEdit from '@/components/received/ReceivedEdit.vue'
import FloatingAction from '@/components/button/FloatingAction.vue'

export default {
  name: 'index',
  components: { ReceivedSelect, ReceivedEdit, FloatingAction },
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
        { text: 'Data do Recebimento', value: 'date' },
        { text: 'Código do Recebimento', value: 'id' },
        { text: 'Descrição', value: 'description' },
        { text: 'Valor do Recebimento', value: 'value' },
        { text: 'Ações', value: 'actions' },
      ],
    }
  },
  computed: {
    receiveds() {
      return this.$store.state.received.received
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
    translateKey(key) {
      const translations = {
        id: 'Código',
        date: 'Data',
        value: 'Valor',
        description: 'Descrição',
        created_at: 'Data de criação',
        updated_at: 'Data de atualização',
      }
      return translations[key] || key
    },
    isSelected(item) {
      return this.selectedReceived === item
    },
  },
}
</script>
