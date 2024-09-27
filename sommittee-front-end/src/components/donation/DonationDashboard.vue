<template>
  <v-card max-width="600px" class="donation-card">
    <v-card-title>
      <span
        class="headline"
        style="font-weight: 500; border-bottom: 1px solid gray; width: 100%"
      >
        Últimas Doações
      </span>
    </v-card-title>

    <v-row
      v-if="donationData && donationData.length > 0"
      class="d-flex flex-column"
      style="padding: 16px"
    >
      <v-col v-for="donation in donationData" :key="donation.id" class="mb-3">
        <div class="donation-item">
          <div class="donation-field">
            <span class="font-weight-bold">Doador: </span>
            <span>{{ donation.donor.name }}</span>
          </div>

          <div class="donation-field" style="display: flex; gap: 5px">
            <span style="font-weight: bold">Data de Entrega: </span>
            <span>{{ formatDate(donation.date_delivery) }}</span>
          </div>

          <div class="donation-field">
            <strong>Produtos:</strong>
            <ul>
              <li
                v-for="product in donation.donation_products"
                :key="product.product.id"
              >
                {{ product.product.name }} - Quantidade: {{ product.amount }}
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="info" dismissible> Nenhuma doação encontrada. </v-alert>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DonationDashboard",
  data() {
    return {
      donationData: [],
    };
  },
  methods: {
    async fetchLatestDonations() {
      try {
        const response = await this.$store.dispatch(
          "donation/fetchLatestDonations"
        );
        this.donationData = response;
      } catch (error) {
        console.error("Erro ao buscar as últimas doações:", error);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  mounted() {
    this.fetchLatestDonations();
  },
};
</script>

<style scoped>
.donation-item {
  margin-bottom: 20px;
}

.donation-field {
  margin-bottom: 8px;
}

hr {
  border: 0;
  height: 1px;
  background: gray;
  margin: 10px 0;
}
</style>
