<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Lista de Recebimentos</v-card-title>
      <v-card-text>
        <v-data-table
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
      dialog: false,
      filterDialog: false,
      selectedReceived: null,
      filters: {},
      editDialog: false,
      updatedReceivedId: null,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Data do recebimento', value: 'date' },
        { text: 'Valor do recebimento', value: 'value' },
        { text: 'Descrição', value: 'description' },
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
    // ...mapActions('received', ['findById', 'update']),

    // async saveUpdatedReceived(updatedReceived) {
    //   console.log('Salvando alterações:', updatedReceived)
    //   // await this.updateReceived(updatedReceived)
    //   await this.$store.dispatch('received/update', updatedReceived)
    //   // this.editDialog = false
    // },
    async saveUpdatedReceived(updatedReceived) {
      try {
        console.log('Salvando alterações:', updatedReceived)
        await this.$store.dispatch('received/update', updatedReceived)
        this.editDialog = false
      } catch (error) {
        console.error('Erro ao atualizar recebido:', error)
        // Exemplo de tratamento de erro mais detalhado
        if (error.response && error.response.data) {
          console.log('Detalhes do erro:', error.response.data)
        }
        // Tratamento de erro específico para status 400
        if (error.response && error.response.status === 400) {
          // Exemplo: exibir mensagem de erro específica para o usuário
          this.errorMessage =
            'Erro: dados inválidos. Verifique os campos e tente novamente.'
        } else {
          // Outros tipos de tratamento de erro
          this.errorMessage =
            'Ocorreu um erro ao atualizar o recebido. Tente novamente mais tarde.'
        }
      }
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
