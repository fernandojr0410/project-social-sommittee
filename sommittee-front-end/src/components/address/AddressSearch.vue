<template>
  <!-- class="flex"  gap: 20px" -->

  <v-container style="display: flex; gap: 20px">
    <v-select
      outlined
      v-model="selectedCategory"
      :items="categories"
      label="Pesquisar por"
      style="max-width: 200px"
    ></v-select>
    <v-text-field
      outlined
      rounded
      placeholder="Digite e tecle Enter"
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      style="max-width: 500px"
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
      ],
    }
  },
  computed: {
    filteredItems() {
      return this.$store.state.filteredAddress
    },
  },
  async mounted() {
    await this.$store.dispatch('address/fetchAllAddresses')
  },
  methods: {
    async applyFilter() {
      try {
        const filterParams = {
          category: this.selectedCategory,
          search: this.search,
        }
        console.log('Antes de aplicar o filtro:', filterParams)
        await this.$store.dispatch('address/filter', filterParams)
        console.log('Após aplicar o filtro:', this.filteredAddress)
      } catch (error) {
        console.error('Erro ao aplicar filtro:', error)
      }
    },
  },
}
</script>
