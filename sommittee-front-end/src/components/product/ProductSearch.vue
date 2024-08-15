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
  name: 'ProductSearch',
  data() {
    return {
      query: {
        search: '',
        searchField: 'name',
      },
      formattedSearch: '',
      categories: [
        { value: 'name', text: 'Produto' },
        { value: 'description', text: 'Descrição' },
        { value: 'type', text: 'Categoria' },
      ],
    }
  },
  computed: {
    filteredItems() {
      return this.$store.state.filteredProduct
    },
  },
  methods: {
    async applyFilter() {
      this.query.search = this.formattedSearch
      await this.$store.dispatch('product/findAll', this.query)
    },
  },
}
</script>
