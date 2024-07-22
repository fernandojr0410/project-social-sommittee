<template>
  <v-container class="flex" style="display: flex; gap: 20px">
    <v-select
      filled
      dense
      hide-details
      v-model="selectedCategory"
      :items="categories"
      label="Pesquisar por"
      style="max-width: 400px; margin-bottom: 16px"
    ></v-select>
    <v-text-field
      filled
      rounded
      dense
      hide-details
      placeholder="Digite e tecle Enter"
      autofocus
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      style="max-width: 400px"
      @keyup.enter="applyFilter"
    ></v-text-field>
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
  name: 'addressSearch',
  data() {
    return {
      search: '',
      selectedCategory: null,
      categories: [
        { value: 'zip_code', text: 'CEP' },
        { value: 'street', text: 'Rua' },
        { value: 'number', text: 'Número' },
        { value: 'neighborhood', text: 'Bairro' },
        { value: 'complement', text: 'Complemento' },
        { value: 'city', text: 'Cidade' },
        { value: 'state', text: 'Estado' },
        { value: 'created_at', text: 'Data de criação' },
        { value: 'updated_at', text: 'Data de atualização' },
      ],
    }
  },
  computed: {
    filteredItems() {
      return this.$store.state.address.filteredAddress
    },
  },
  methods: {
    async applyFilter() {
      try {
        const filterParams = {
          category: this.selectedCategory,
          search: this.search,
        }
        await this.$store.dispatch('address/filter', filterParams)
      } catch (error) {
        console.error('Erro ao aplicar filtro:', error)
      }
    },
  },
}
</script>
