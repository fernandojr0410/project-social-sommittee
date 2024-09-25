<template>
  <v-container class="d-flex" style="gap: 20px">
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
      <v-list-item v-for="item in filteredItems" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>
            {{ item[selectedCategory] || "Não disponível" }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "DonationSearch",
  data() {
    return {
      query: {
        search: "",
        searchField: "name",
      },
      formattedSearch: "",
      categories: [
        { value: "name", text: "Nome pessoa" },
        { value: "telephone", text: "Telefone pessoa" },
        { value: "state", text: "Status entrega" },
        { value: "date_delivery", text: "Data entrega" },
      ],
      stateMap: {
        PENDING: "Pendente",
        CONFIRMED: "Confirmado",
        IN_TRANSIT: "Em Trânsito",
        CANCELED: "Cancelado",
        DELIVERED: "Entregue",
        PROCESSING: "Processando",
        APPROVED: "Aprovado",
        REJECTED: "Rejeitado",
        UNDER_REVIEW: "Em Revisão",
      },
    };
  },
  computed: {
    filteredItems() {
      return this.$store.filteredDonation;
    },
  },
  methods: {
    formatedTelephone(phone) {
      if (phone) {
        return phone.replace(/[\s()-]/g, "");
      }
      return "";
    },
    parseDate(input) {
      const parts = input.split("/");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    },

    async applyFilter() {
      try {
        if (this.query.searchField === "telephone") {
          this.query.search = this.formatedTelephone(this.formattedSearch);
        } else if (this.query.searchField === "state") {
          const foundState = Object.keys(this.stateMap).find(
            (key) =>
              this.stateMap[key].toLowerCase() ===
              this.formattedSearch.toLowerCase()
          );
          this.query.search = foundState || "";
        } else if (this.query.searchField === "date_delivery") {
          this.query.search = this.parseDate(this.formattedSearch);
        } else {
          this.query.search = this.formattedSearch;
        }

        const response = await this.$store.dispatch(
          "donation/findAll",
          this.query
        );
        console.log("response", response);
      } catch (error) {
        this.$error("Erro ao filtrar doação");
        throw error;
      }
    },
  },
};
</script>
