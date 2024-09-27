<template>
  <v-card max-width="600px" class="received-card">
    <v-card-title>
      <span
        class="headline"
        style="font-weight: 500; border-bottom: 1px solid gray; width: 100%"
      >
        Últimos Recebimentos
      </span>
    </v-card-title>

    <v-row
      v-if="receivedData && receivedData.length > 0"
      class="d-flex flex-column"
      style="padding: 16px"
    >
      <v-col
        v-for="received in receivedData"
        :key="received.id"
        class="mb-3"
        style="padding-bottom: 16px"
      >
        <div class="received-item">
          <div class="received-field">
            <span class="font-weight-bold">Responsável que recebeu: </span>
            <span>{{ received.user.name }}</span>
          </div>

          <div class="received-field">
            <span class="font-weight-bold">Recebido de: </span>
            <span>{{ received.donor.name }}</span>
          </div>

          <div class="received-field" style="display: flex; gap: 5px">
            <span style="font-weight: bold">Data de Recebimento:</span>
            <span>{{ formatDate(received.date) }}</span>
          </div>

          <div class="received-field">
            <strong>Condição do Produto:</strong>
            {{ received.condition_product | conditionProduct }}
          </div>

          <div class="received-field">
            <strong>Produtos:</strong>
            <ul>
              <li v-for="product in received.products" :key="product.id">
                {{ product.product.name }} - Quantidade: {{ product.amount }}
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col style="display: flex; justify-content: center">
        <v-alert
          type="info"
          dismissible
          class="d-flex items-center justify-center"
          style="width: 80%"
        >
          Nenhum recebimento encontrado.
        </v-alert>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ReceivedDashboard",
  data() {
    return {
      receivedData: [],
    };
  },
  methods: {
    async fetchLatestReceived() {
      try {
        const response = await this.$store.dispatch(
          "received/fetchLatestReceived"
        );
        this.receivedData = response;
      } catch (error) {
        console.error("Erro ao buscar os últimos recebimentos:", error);
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
    this.fetchLatestReceived();
  },
};
</script>

<style scoped>
.received-item {
  margin-bottom: 20px;
}

.received-field {
  margin-bottom: 8px;
}

hr {
  border: 0;
  height: 1px;
  background: gray;
  margin: 10px 0;
}
</style>
