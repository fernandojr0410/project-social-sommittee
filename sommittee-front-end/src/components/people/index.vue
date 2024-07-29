<template>
  <v-container>
    <v-card>
      <v-card-text>
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

          <template v-slot:[`item.cpf`]="{ item }">
            <span>{{ item.cpf | cpf }}</span>
          </template>

          <template v-slot:[`item.gender`]="{ item }">
            <span>{{ item.gender | gender }}</span>
          </template>

          <template v-slot:[`item.work`]="{ item }">
            <span>{{ item.work | work }}</span>
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
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes da pessoa</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="16" md="10">
              <span
                class="primary--text"
                style="font-weight: bold; font-size: 16px"
              >
                Informações da pessoa:
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.name"
                label="Nome"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.surname"
                label="Sobrenome"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.cpf"
                label="CPF"
                class="mr-3"
                disabled
                v-mask="'###.###.###-##'"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.birth_date"
                type="date"
                label="Data de nascimento"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.telephone"
                label="Telefone"
                disabled
                v-mask="'(##) #####-####' || '(##) ####-####'"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
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
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
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
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-if="selectedPeople"
                v-model="selectedPeople.education"
                label="Educação"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16" md="10">
              <span
                class="primary--text"
                style="font-weight: bold; font-size: 16px"
              >
                Informações do endereço:
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.zip_code"
                label="CEP"
                class="mr-3"
                disabled
                v-mask="'#####-###'"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.street"
                label="Rua"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.number"
                label="Número"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.neighborhood"
                label="Bairro"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.complement"
                label="Complemento"
                class="mr-3"
                disabled
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.city"
                label="Cidade"
                disabled
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople?.address"
                v-model="selectedPeople.address.state"
                label="Estado"
                disabled
              />
            </v-col>
          </v-row>
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

export default {
  name: 'index',
  components: { PeopleEdit, PeopleCreate },
  data() {
    return {
      loading: false,
      dialog: false,
      editDialog: false,
      updatedPeopleId: null,
      selectedPeople: null,
      createDialog: false,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome', value: 'name' },
        { text: 'Sobrenome', value: 'surname' },
        { text: 'Gênero', value: 'gender' },
        { text: 'CPF', value: 'cpf' },
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
        console.error('Erro ao carregar dados:', error)
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      await this.$store.dispatch('people/findAll')
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
        this.editDialog = false
      } catch (error) {
        console.error('Erro ao salvar pessoa:', error)
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
  },
}
</script>
