<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <DonorSearch @search="handleSearch" />
          <DonorRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="donor"
          :items-per-page="10"
          no-data-text="Nenhum doador encontrado"
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
          <template v-slot:[`item.identifier`]="{ item }">
            <span>{{ item.identifier | cpf }}</span>
          </template>
          <template v-slot:[`item.telephone`]="{ item }">
            <span>{{ item.telephone | phone }}</span>
          </template>
          <template v-slot:[`item.type_donor`]="{ item }">
            <span>{{ item.type_donor | typeDonor }}</span>
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
        <DonorEdit
          :dialog="editDialog"
          :id="updatedDonorId"
          @close="editDialog = false"
          @save="saveUpdatedDonor"
        />

        <DonorDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do doador</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do doador:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedDonor"
                v-model="selectedDonor.name"
                label="Nome completo"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedDonor"
                v-model="selectedDonor.identifier"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###.##'"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedDonor"
                v-model="selectedDonor.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedDonor"
                v-model="selectedDonor.telephone"
                label="Contato"
                class="mr-3"
                v-mask="'(##) #####-####'"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-if="selectedDonor"
                v-model="selectedDonor.type_donor"
                :items="[
                  { text: 'Interno', value: 'INTERNAL' },
                  { text: 'Externo', value: 'EXTERNAL' },
                ]"
                item-value="value"
                item-text="text"
                label="Tipo"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <DonorCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdDonor"
    />
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'
import DonorCreate from './DonorCreate.vue'
import DonorEdit from './DonorEdit.vue'
import DonorDelete from './DonorDelete.vue'
import DonorSearch from './DonorSearch.vue'
import DonorRefresh from './DonorRefresh.vue'

export default {
  name: 'index',
  components: {
    DonorCreate,
    DonorEdit,
    DonorDelete,
    DonorSearch,
    DonorRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedDonor: null,
      createDialog: false,
      editDialog: false,
      updatedDonorId: null,
      deleteDialog: false,
      itemToDelete: null,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome completo', value: 'name' },
        { text: 'CPF', value: 'identifier' },
        { text: 'Contato', value: 'telephone' },
        { text: 'Tipo doador', value: 'type_donor' },
        { text: 'Ações', value: 'actions' },
      ],
      formatDate,
    }
  },
  computed: {
    donor() {
      return this.$store.state.donor.donor
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
      await this.$store.dispatch('donor/findAll')
    },
    async handleSearch(search) {
      this.search = search
    },
    showDetails(item) {
      this.selectedDonor = item
      this.dialog = true
    },
    editItem(item) {
      this.updatedDonorId = item.id
      this.editDialog = true
    },

    async saveUpdatedDonor(updatedDonor) {
      try {
        await this.$store.dispatch('donor/update', updatedDonor)
        this.loadData()
        this.editDialog = false
      } catch (error) {
        this.$error('Erro ao atualizar registro!')
        throw error
      }
    },

    async createdDonor(newDonor) {
      try {
        await this.$store.dispatch('donor/create', newDonor)
        this.$success('Registro criado!')
        this.loadData()
        this.createDialog = false
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    isSelected(item) {
      return this.updatedDonorId === item.id
    },
    closeDialog() {
      this.dialog = false
    },
    confirmDelete(item) {
      this.itemToDelete = item.id
      this.deleteDialog = true
    },
    handleDeleteClose() {
      this.deleteDialog = false
      this.itemTodelete = null
    },
  },
}
</script>
