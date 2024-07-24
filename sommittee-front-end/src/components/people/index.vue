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

          <template v-slot:[`item.work`]="{ item }">
            <span>{{ formatWork(item.work) }}</span>
          </template>

          <template v-slot:[`item.gender`]="{ item }">
            <span>{{ formatWork(item.gender) }}</span>
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
          <v-list>
            <v-list-item-group v-if="selectedPeople">
              <v-list-item
                v-for="(value, key) in filteredSelectedPeople"
                :key="key"
              >
                <v-list-item-content>
                  <v-list-item-title style="font-weight: bold">
                    {{ translateKey(key) }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="font-size: 16px" color="primary">
                    {{
                      key === 'created_at' || key === 'updated_at'
                        ? formatDate(value)
                        : key === 'work'
                          ? formatWork(value)
                          : key === 'gender'
                            ? formatGender(value)
                            : value
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

            <v-list-item v-if="selectedPeople && selectedPeople.address">
              <v-list-item-content>
                <v-list-item-title style="font-weight: bold">
                  Endereço
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: 16px" color="primary">
                  {{ formatAddress(selectedPeople.address) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'
import PeopleEdit from './PeopleEdit.vue'
import { mapActions } from 'vuex'

export default {
  name: 'index',
  components: { PeopleEdit },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedPeople: null,
      editDialog: false,
      updatedPeopleId: null,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome', value: 'name' },
        { text: 'Sobrenome', value: 'surname' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Ações', value: 'actions' },
      ],
    }
  },
  computed: {
    people() {
      return this.$store.state.people.people
    },
    filteredSelectedPeople() {
      const { id, address, address_id, ...rest } = this.selectedPeople || {}
      return rest
    },
  },

  created() {
    this.loadData()
  },
  methods: {
    formatDate,
    formatWork(work) {
      return work ? 'Sim' : 'Não'
    },
    formatGender(gender) {
      return gender ? 'Masculino' : 'Feminino'
    },
    formatAddress(address) {
      if (!address) return ''
      return `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip_code}`
    },
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
    ...mapActions('people', ['update']),
    async saveUpdatedPeople(updatedPeople) {
      await this.update(updatedPeople)
    },
    translateKey(key) {
      const translations = {
        name: 'Nome',
        surname: 'Sobrenome',
        cpf: 'CPF',
        email: 'E-mail',
        birth_date: 'Data de nascimento',
        gender: 'Sexo',
        telephone: 'Telefone',
        work: 'Trabalha?',
        education: 'Educação',
        created_at: 'Data de criação',
        updated_at: 'Data de atualização',
      }
      return translations[key] || key
    },
    isSelected(item) {
      return this.selectedPeople === item
    },
  },
}
</script>
