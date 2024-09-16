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
  name: 'FamilySearch',
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
        { value: 'e-mail', text: 'E-mail' },
      ],
    }
  },
  watch: {
    query: {
      deep: true,
      handler(newQuery) {
        if (this.query.searchField === 'identifier') {
          this.formattedSearch = this.formatCpf(newQuery.search)
        }
      },
    },
  },
  computed: {
    filteredItems() {
      return this.$store.state.filteredFamily
    },
  },
  methods: {
    formatCpf(identifier) {
      identifier = identifier.replace(/\D/g, '')
      return identifier.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    async applyFilter() {
      if (this.query.searchField === 'identifier') {
        this.query.search = this.formattedSearch.replace(/\D/g, '')
      } else {
        this.query.search = this.formattedSearch
      }
      await this.$store.dispatch('family/findAll', this.query)
    },
  },
}
</script>
