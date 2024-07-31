<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="family"
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

          <template v-slot:[``]></template>

          <template v-slot:[`item.name`]="{ item }">
            <span>
              {{ item.people_family[0].people.name }}
            </span>
          </template>

          <template v-slot:[`item.cpf`]="{ item }">
            <span>{{ item.people_family[0].people.cpf }}</span>
          </template>

          <template v-slot:[`item.zip_code`]="{ item }">
            <span>{{ item.address.zip_code }}</span>
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
          <!-- :color="isSelected(item) ? 'primary' : ''"
          @click="showDetails(item)" -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2">mdi-eye</v-icon>

            <v-icon class="mr-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { formatDate } from '@/filters'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Data criação', value: 'created_at' },
        { text: 'Nome completo', value: 'name' },
        { text: 'CPF', value: 'cpf' },
        { text: 'CEP', value: 'zip_code' },
        { text: 'Rua', value: 'street' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'Ações', value: 'actions' },
      ],
      formatDate,
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
        console.error('Error loading data')
        this.$error('Erro ao carregador dados!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      await this.$store.dispatch('family/findAll')
    },
    // showDetails(item) {
    //   this.selectedFamily = item
    //   this.dialog = true
    // },
    // editItem(item) {
    //   this.selectedFamilyId = item.id
    //   this.editDialog = true
    // },
  },
}
</script>
