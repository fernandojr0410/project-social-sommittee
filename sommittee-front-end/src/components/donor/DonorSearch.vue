<template>
  <v-container style="display: flex; gap: 20px">
    <v-select
      outlined
      v-model="query.searchField"
      :items="categories"
      label="Pesquisar por..."
      style="max-width: 200px"
    />
    <v-text-field
      outlined
      rounded
      v-model="formattedSearch"
      prepend-inner-icon="mdi-magnify"
      placeholder="Digite e tecle enter"
      @keyup.enter="applyFilter"
      style="max-width: 500px"
    />
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="item in filteredItems" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ item[selectedCategory] || 'Não disponível' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'DonorSearch',
  data() {
    return {
      query: {
        search: '',
        searchField: 'name',
      },
      formattedSearch: '',
      categories: [
        { value: 'name', text: 'Nome' },
        { value: 'identifier', text: 'CPF' },
        { value: 'email', text: 'E-mail' },
        { value: 'telephone', text: 'Contato' },
        { value: 'type_donor', text: 'Tipo doador' },
      ],
    }
  },
  watch: {
    query: {
      deep: true,
      handler(newQuery) {
        if (this.query.searchField === 'identifier') {
          this.formattedSearch = this.formatCpf(newQuery.search)
        } else if (this.query.searchField === 'telephone') {
          this.formattedSearch = this.formatTelephone(newQuery.search)
        }
      },
    },
  },
  computed: {
    filteredItems() {
      return this.$store.state.filteredDonor
    },
    selectedCategory() {
      return this.query.searchField
    },
  },
  methods: {
    formatCpf(identifier) {
      identifier = identifier.replace(/\D/g, '')
      return identifier.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    formatTelephone(telephone) {
      telephone = telephone.replace(/\D/g, '')
      return telephone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    },
    async applyFilter() {
      if (this.query.searchField === 'identifier') {
        this.query.search = this.formattedSearch.replace(/\D/g, '')
      } else if (this.query.searchField === 'telephone') {
        this.query.search = this.formattedSearch.replace(/\D/g, '')
      } else {
        this.query.search = this.formattedSearch
      }
      await this.$store.dispatch('donor/findAll', this.query)
    },
  },
}
</script>
