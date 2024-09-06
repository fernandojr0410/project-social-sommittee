<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="received"
          :items-per-page="10"
          no-data-text="Nenhum recebimento encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.value`]="{ item }">
            <span>{{ item.value | currency }}</span>
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <span>{{ item.donor.name }}</span>
          </template>

          <template v-slot:[`item.contact`]="{ item }">
            <span>{{ item.donor.contact | phone }}</span>
          </template>

          <template v-slot:[`item.type_donor`]="{ item }">
            <span>{{ item.donor.type_donor | typeDonor }}</span>
          </template>

          <template v-slot:[`item.type`]="{ item }">
            <span>{{ item.product.type }}</span>
          </template>

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

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
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
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do recebimento:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived"
                :value="formatDate(selectedReceived.date)"
                label="Data de recebimento"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="selectedReceived"
                :value="selectedReceived.value | currency"
                label="Valor total"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-if="selectedReceived"
                v-model="selectedReceived.description"
                label="Descrição"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto doado:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.product"
                v-model="selectedReceived.product.name"
                label="Produto"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.product"
                v-model="selectedReceived.product.type"
                label="Categoria"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-if="selectedReceived && selectedReceived.product"
                v-model="selectedReceived.product.description"
                label="Descrição"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do Estoque:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.stock"
                v-model="selectedReceived.stock.amount"
                label="Quantidade"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do Doador:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.donor"
                v-model="selectedReceived.donor.name"
                label="Nome completo"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.donor"
                :value="selectedReceived.donor.cpf | cpf"
                label="CPF"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.donor"
                :value="selectedReceived.donor.contact | phone"
                label="Contato"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.donor"
                :value="selectedReceived.donor.type_donor | typeDonor"
                label="Tipo"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedReceived && selectedReceived.donor"
                v-model="selectedReceived.donor.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <ReceivedCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdReceived"
    />
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'
import ReceivedCreate from './ReceivedCreate.vue'
import ReceivedEdit from './ReceivedEdit.vue'

export default {
  name: 'index',
  components: { ReceivedCreate, ReceivedEdit },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedReceived: null,
      createDialog: false,
      editDialog: false,
      updatedReceivedId: null,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Valor total doação', value: 'value' },
        { text: 'Nome doador', value: 'name' },
        { text: 'Contato doador', value: 'contact' },
        { text: 'Tipo doador', value: 'type_donor' },
        { text: 'Tipo doação', value: 'type' },
        { text: 'Ações', value: 'actions' },
      ],
      formatDate,
    }
  },
  computed: {
    received() {
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
        this.$error('Erro ao carregar dados!')
        throw error
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
    editItem(item) {
      this.updatedReceivedId = item.id
      this.editDialog = true
    },

    async saveUpdatedReceived(updatedReceived) {
      try {
        const response = await this.$store.dispatch(
          'received/update',
          updatedReceived
        )
        console.log('updatedReceived', response)
        this.loadData()
        this.editDialog = false
        return response
      } catch (error) {
        console.error('Error saveUpdatedReceived', error)
        throw error
      }
    },

    async createdReceived(newReceived) {
      try {
        const createIndex = await this.$store.dispatch(
          'received/create',
          newReceived
        )
        console.log('createIndex', createIndex)
        this.$success('Registro criado!')
        this.loadData()
        this.createDialog = false
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    closeDialog() {
      this.dialog = false
    },
    isSelected(item) {
      this.updatedReceivedid === item.id
    },
  },
}
</script>
