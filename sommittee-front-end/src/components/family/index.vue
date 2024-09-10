<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <FamilySearch @search="handleSearch" />
          <FamilyRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="family || []"
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

          <template v-slot:item.function="{ item }">
            {{
              item.people_family && item.people_family.length > 0
                ? $options.filters.functionFamily(
                    item.people_family[0].function
                  )
                : 'N/A'
            }}
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <span>
              {{ item.people.name }}
            </span>
          </template>

          <template v-slot:[`item.identifier`]="{ item }">
            <span>{{ item.people.identifier | cpf }}</span>
          </template>

          <template v-slot:[`item.zip_code`]="{ item }">
            <span>{{ item.address.zip_code | cep }}</span>
          </template>

          <template v-slot:[`item.street`]="{ item }">
            <span>{{ item.address.street }}</span>
          </template>

          <template v-slot:[`item.number`]="{ item }">
            <span>{{ item.address.number }}</span>
          </template>

          <template v-slot:[`item.neighborhood`]="{ item }">
            <span>{{ item.address.neighborhood }}</span>
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
        <FamilyEdit
          :dialog="editDialog"
          :id="updatedFamilyId"
          @close="editDialog = false"
          @save="saveUpdatedFamily"
        />

        <FamilyDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes da família</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações da pessoa:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.name"
                label="Nome completo"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.identifier"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###-##'"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.birth_date"
                type="date"
                label="Data de nascimento"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.telephone"
                label="Telefone"
                class="mr-3"
                v-mask="'(##) #####-####'"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.gender"
                :items="[
                  { text: 'Masculino', value: 'MALE' },
                  { text: 'Feminino', value: 'FEMALE' },
                ]"
                item-value="value"
                item-text="text"
                class="mr-3"
                label="Sexo"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.work"
                :items="[
                  { text: 'Sim', value: true },
                  { text: 'Não', value: false },
                ]"
                item-value="value"
                item-text="text"
                class="mr-3"
                label="Trabalha?"
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="selectedPeopleFamily?.people"
                v-model="selectedPeopleFamily.people.education"
                label="Educação"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do endereço:
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.zip_code"
                class="mr-3"
                label="CEP"
                v-mask="'#####-###'"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.street"
                label="Rua"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.number"
                label="Número"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.neighborhood"
                label="Bairro"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.complement"
                label="Complemento"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.city"
                label="Cidade"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                v-model="selectedPeopleFamily.address.state"
                :items="states"
                item-value="acronym"
                item-text="name"
                class="mr-3"
                label="Estado"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16" md="10">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Função da pessoa na família:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-if="
                  selectedPeopleFamily && selectedPeopleFamily.people_family
                "
                v-model="selectedPeopleFamily.people_family[0].function"
                :items="[
                  { text: 'Mãe', value: 'mother' },
                  { text: 'Pai', value: 'father' },
                  { text: 'Filho(a)', value: 'child' },
                  { text: 'Vó', value: 'grandMother' },
                  { text: 'Vô', value: 'grandFather' },
                  { text: 'Tio', value: 'uncle' },
                  { text: 'Tio', value: 'aunt' },
                ]"
                item-value="value"
                item-text="text"
                label="Função"
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <FamilyCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdFamily"
    />
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'
import { states } from '@/assets/state'
import FamilyCreate from './FamilyCreate.vue'
import FamilyEdit from './FamilyEdit.vue'
import FamilyDelete from './FamilyDelete.vue'
import FamilySearch from './FamilySearch.vue'
import FamilyRefresh from './FamilyRefresh.vue'

export default {
  name: 'index',
  components: {
    FamilyCreate,
    FamilyEdit,
    FamilyDelete,
    FamilySearch,
    FamilyRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedPeopleFamily: null,
      createDialog: false,
      editDialog: false,
      updatedFamilyId: null,
      deleteDialog: false,
      itemToDelete: null,
      search: '',
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome', value: 'name' },
        { text: 'CPF', value: 'identifier' },
        { text: 'Função', value: 'function' },
        { text: 'CEP', value: 'zip_code' },
        { text: 'Rua', value: 'street' },
        { text: 'Número', value: 'number' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'Ações', value: 'actions' },
      ],
      formatDate,
      states,
    }
  },
  computed: {
    family() {
      return this.$store.state.family.family
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
      await this.$store.dispatch('family/findAll')
    },
    async handleSearch(search) {
      this.search = search
    },
    showDetails(item) {
      this.selectedPeopleFamily = item
      this.dialog = true
    },
    editItem(item) {
      this.updatedFamilyId = item.id
      this.editDialog = true
    },
    async saveUpdatedFamily(updatedFamily) {
      try {
        await this.$store.dispatch('family/update', updatedFamily)
        this.loadData()
        this.editDialog = false
      } catch (error) {
        this.$error('Erro ao atualizar registro!')
        throw error
      }
    },

    async createdFamily(newFamily) {
      try {
        await this.$store.dispatch('family/create', newFamily)
        this.$success('Registro criado!')
        this.loadData()
        this.createDialog = false
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    isSelected(item) {
      return this.updatedFamilyId === item.id
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
