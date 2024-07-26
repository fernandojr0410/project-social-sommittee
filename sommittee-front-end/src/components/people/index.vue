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
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações da pessoa:
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.name"
                label="Nome"
                class="mr-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.surname"
                label="Sobrenome"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.cpf"
                label="CPF"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.birth_date"
                type="date"
                label="Data de nascimento"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedPeople.telephone"
                label="Telefone"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedPeople.gender"
                :items="genderItems"
                item-value="value"
                item-text="text"
                label="Sexo"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedPeople.work"
                :items="workItems"
                item-value="value"
                item-text="text"
                label="Trabalha?"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="selectedPeople.education"
                label="Educação"
                class="mr-3"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16" md="10">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do endereço:
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.zip_code"
                label="CEP"
                class="mr-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.street"
                label="Rua"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.number"
                label="Número"
                class="mr-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.neighborhood"
                label="Bairro"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.complement"
                label="Complemento"
                class="mr-3"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.city"
                label="Cidade"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedPeople && selectedPeople.address"
                v-model="selectedPeople.address.state"
                label="Estado"
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
import { mapActions } from 'vuex'

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
      selectedPeople: {
        name: '',
        surname: '',
        cpf: '',
        email: '',
        birth_date: '',
        gender: '',
        telephone: '',
        work: '',
        education: '',
        address: {
          zip_code: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
      },
      states,
      formatDate,
      genderItems: [
        { value: 'MALE', text: 'Masculino' },
        { value: 'FEMALE', text: 'Feminino' },
      ],
      workItems: [
        { value: true, text: 'Sim' },
        { value: false, text: 'Não' },
      ],
    }
  },
  computed: {
    people() {
      return this.$store.state.people.people
    },
    genderOtions() {
      return this.genderItems
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
    closeDialog() {
      this.dialog = false
      this.selectedPeople = null
    },
    editItem(item) {
      this.updatedPeopleId = item.id
      this.editDialog = true
    },
    ...mapActions('people', ['update', 'create']),
    async saveUpdatedPeople(updatedPeople) {
      await this.update(updatedPeople)
    },
    async createdPeople(createdPeople) {
      await this.$store.dispatch('people/create', createdPeople)
      await this.loadData()
      this.createDialog = false
    },
    isSelected(item) {
      return this.selectedPeople === item
    },
  },
}
</script>
