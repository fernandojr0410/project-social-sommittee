<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Recebidos</v-card-title>
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
          <template v-slot:item.actions="{ item }">
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
        </v-data-table>

        <Received
          :dialog="filterDialog"
          :filters="filters"
          @close="filterDialog = false"
          @apply="showDetails"
        />

        <ReceivedEdit
          :dialog="editDialog"
          :edited-receipt="editedReceipt"
          @close="editDialog = false"
          @save="saveEditedReceipt"
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
            <v-row v-if="selectedReceipt">
              <v-col
                v-for="(value, key) in selectedReceipt"
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
import ReceivedEdit from '@/components/received/ReceivedEdit.vue'
import ReceivedSelect from '@/components/received/ReceivedSelect.vue'

export default {
  name: 'Received',
  components: { ReceivedEdit, ReceivedSelect },
  data() {
    return {
      id: '',
      issue_date: '',
      description: '',
      type_transaction: '',
      value_amount: '',
      quantity: '',
      payment_method: '',
      receiver_signature: '',
      additional_notes: '',
      created_at: '',
      updated_at: '',
      dialog: false,
      loading: false,
      selectedReceipt: null,
      filterDialog: false,
      filters: {},
      editDialog: false,
      editedReceipt: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Data de Emissão', value: 'issue_date' },
        { text: 'Descrição', value: 'description' },
        { text: 'Tipo de Transação', value: 'type_transaction' },
        { text: 'Ações', value: 'actions', align: 'center' },
      ],
    }
  },
  computed: {
    receiveds() {
      return this.$store.state.receipt.receiveds
    },
  },
  created() {
    this.findAll()
  },
  methods: {
    async findAll() {
      this.loading = true
      await this.$store.dispatch('received/findAll')
      this.loading = false
    },
    showDetails(item) {
      this.selectedReceipt = item
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.selectedReceipt = null
    },
    editItem(item) {
      this.editedReceipt = { ...item }
      this.editDialog = true
    },
    saveEditedReceipt() {
      console.log('Salvando alterações:', this.editedReceipt)
      this.editDialog = false
    },

    translateKey(key) {
      const translations = {
        id: 'ID',
        issue_date: 'Data de Emissão',
        description: 'Descrição',
        type_transaction: 'Tipo de Transação',
        value_amount: 'Valor Total',
        quantity: 'Quantidade Paga',
        payment_method: 'Tipo de Pagamento',
        receiver_signature: 'Recebido por',
        additional_notes: 'Observações',
        created_at: 'Data de Criação',
        updated_at: 'Data de Atualização',
      }
      return translations[key] || key
    },
    isSelected(item) {
      return this.selectedReceipt === item
    },
  },
}
</script>
