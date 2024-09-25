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
              {{ item[selectedCategory] || "Não disponível" }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "ReceivedSearch",
  data() {
    return {
      query: {
        search: "",
        searchField: "name",
      },
      formattedSearch: "",
      categories: [
        { value: "name", text: "Nome doador" },
        { value: "telephone", text: "Telefone doador" },
        { value: "condition_product", text: "Condição produto" },
      ],
      conditionProductMap: {
        Novo: "NEW",
        Usado: "USED",
        Danificado: "DAMAGED",
      },
    };
  },
  computed: {
    filteredItems() {
      return this.$store.state.filteredProduct;
    },
  },
  methods: {
    formatedTelephone(phone) {
      return phone.replace(/[\s()-]/g, "");
    },
    async applyFilter() {
      try {
        if (this.query.searchField === "condition_product") {
          this.query.search =
            this.conditionProductMap[this.formattedSearch] || "";
        } else if (this.query.searchField === "telephone") {
          this.query.search = this.formatedTelephone(this.formattedSearch);
        } else {
          this.query.search = this.formattedSearch;
        }
        return await this.$store.dispatch("received/findAll", this.query);
      } catch (error) {
        console.error("Erro ao filtrar recebimento");
        throw error;
      }
    },
  },
};
</script>
