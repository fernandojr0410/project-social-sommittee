<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <PeopleSearch @search="handleSearch" />
          <PeopleRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="people"
          :items-per-page="10"
          no-data-text="Nenhuma pessoa encontrada"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.identifier`]="{ item }">
            <span>{{ item.identifier | cpf }}</span>
          </template>

          <template v-slot:[`item.gender`]="{ item }">
            <span>{{ item.gender | gender }}</span>
          </template>

          <template v-slot:[`item.work`]="{ item }">
            <span>{{ item.work | work }}</span>
          </template>

          <template v-slot:[`item.zip_code`]="{ item }">
            <span>{{ item.address?.zip_code | cep }}</span>
          </template>

          <template v-slot:[`item.street`]="{ item }">
            <span>{{ item.address?.street }}</span>
          </template>

          <template v-slot:[`item.number`]="{ item }">
            <span>{{ item.address?.number }}</span>
          </template>

          <template v-slot:[`item.neighborhood`]="{ item }">
            <span>{{ item.address?.neighborhood }}</span>
          </template>

          <template v-slot:[`item.address`]="{ item }">
            <span>{{ formatAddress(item.address) }}</span>
          </template>

          <template v-slot:[`item.states`]="{ item }">
            <span>{{ item.states | state }}</span>
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

        <PeopleEdit
          :dialog="editDialog"
          :id="updatedPeopleId"
          @close="editDialog = false"
          @save="saveUpdatedPeople"
        />

        <PeopleDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do registro</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 20px">
              <span
                class="primary--text"
                style="font-weight: bold; font-size: 16px"
              >
                Informações da pessoa:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.name"
                  label="Nome completo"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%;"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.identifier"
                  label="CPF"
                  class="mr-3"
                  v-mask="'###.###.###-##'"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%;"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.birth_date"
                  type="date"
                  label="Data de nascimento"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.email"
                  label="E-mail"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%;"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.telephone"
                  label="Telefone"
                  v-mask="'(##) #####-####'"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  v-if="selectedPeople"
                  v-model="selectedPeople.gender"
                  :items="[
                    { text: 'Masculino', value: 'MALE' },
                    { text: 'Feminino', value: 'FEMALE' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Sexo"
                  readonly
                  outlined
                  dense
                  hide-details
              />
              </v-col>
              <v-col>
                <v-select
                  v-if="selectedPeople"
                  v-model="selectedPeople.work"
                  :items="[
                    { text: 'Sim', value: true },
                    { text: 'Não', value: false },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Trabalha?"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedPeople.education"
                  label="Educação"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>
          </v-card>
          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 20px">
              <span
                class="primary--text"
                style="font-weight: bold; font-size: 16px"
              >
                Informações do endereço:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  :value="selectedPeople.address.zip_code"
                  label="CEP"
                  class="mr-3"
                  v-mask="'#####-###'"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.street"
                  label="Rua"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.number"
                  label="Número"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.neighborhood"
                  label="Bairro"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.complement"
                  label="Complemento"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.city"
                  label="Cidade"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 96%"
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-if="selectedPeople?.address"
                  v-model="selectedPeople.address.state"
                  label="Estado"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>

    <PeopleCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdPeople"
    />
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'
import { states } from '@/assets/state'
import PeopleEdit from './PeopleEdit.vue'
import PeopleCreate from './PeopleCreate.vue'
import PeopleSearch from './PeopleSearch.vue'
import PeopleRefresh from './PeopleRefresh.vue'
import PeopleDelete from './PeopleDelete.vue'

export default {
  name: 'index',
  components: {
    PeopleEdit,
    PeopleCreate,
    PeopleSearch,
    PeopleRefresh,
    PeopleDelete,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      updatedPeopleId: null,
      itemToDelete: null,
      selectedPeople: null,
      createDialog: false,
      search: '',
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome completo', value: 'name' },
        { text: 'CPF', value: 'identifier' },
        { text: 'CEP', value: 'zip_code' },
        { text: 'Rua', value: 'street' },
        { text: 'Número', value: 'number' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'Ações', value: 'actions' },
      ],
      states,
      formatDate,
    }
  },
  computed: {
    people() {
      return this.$store.state.people.people
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
      await this.$store.dispatch('people/findAll')
    },
    async handleSearch(search) {
      this.search = search
    },
    showDetails(item) {
      this.selectedPeople = item
      this.dialog = true
    },
    editItem(item) {
      this.updatedPeopleId = item.id
      this.editDialog = true
    },
    async saveUpdatedPeople(updatedPeople) {
      try {
        await this.$store.dispatch('people/update', updatedPeople)
        this.loadData()
        await this.fetchPeople()
        this.editDialog = false
      } catch (error) {
        this.$error('Erro ao salvar pessoa:')
        throw error
      }
    },
    async createdPeople(newPerson) {
      try {
        await this.$store.dispatch('people/create', newPerson)
        this.loadData()
        this.createDialog = false
      } catch (error) {
        console.error('Erro ao criar pessoa:', error)
      }
    },
    formatAddress(address) {
      return `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}`
    },
    isSelected(item) {
      return this.updatedPeopleId === item.id
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
      this.itemToDelete = null
    },
  },
}
</script>
