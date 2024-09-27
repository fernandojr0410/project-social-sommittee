<template>
  <v-card max-width="500px">
    <v-card-title>
      <span
        class="headline"
        style="font-weight: 500; border-bottom: 1px solid gray; width: 100%"
      >
        Dashboard de Produtos
      </span>
    </v-card-title>

    <v-row
      style="padding: 6px"
      v-if="dashboardData && dashboardData.length > 0"
    >
      <v-col>
        <canvas id="doughnutChart"></canvas>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

export default {
  name: "ProductDashboard",
  computed: {
    dashboardData() {
      return this.$store.getters["product/dashboardProducts"];
    },
  },
  data() {
    return {
      chartInstance: null,
      pollInterval: null,
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        await this.$store.dispatch("product/fetchDashboardData");
        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (error) {
        console.error("Erro ao buscar dados da dashboard:", error);
      }
    },

    getColorByStock(amount) {
      if (amount > 50) return "rgb(34, 139, 34)";
      if (amount > 10) return "rgb(255, 204, 0)";
      return "rgb(220, 20, 60)";
    },

    translateCategory(type) {
      return this.$options.filters.productCategory(type);
    },

    renderChart() {
      const ctx = document.getElementById("doughnutChart").getContext("2d");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      if (
        !Array.isArray(this.dashboardData) ||
        this.dashboardData.length === 0
      ) {
        console.error("Nenhum dado disponível para o gráfico.");
        return;
      }

      const labels = this.dashboardData.map((item) =>
        this.translateCategory(item.type)
      );
      const stockAmounts = this.dashboardData.map((item) => item.totalAmount);
      const backgroundColors = stockAmounts.map((amount) =>
        this.getColorByStock(amount)
      );

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Estoque",
            data: stockAmounts,
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          },
        ],
      };

      const config = {
        type: "doughnut",
        data: data,
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.label || "";
                  const value = tooltipItem.raw;
                  return `${label}: Quantidade ${value}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      this.chartInstance = new Chart(ctx, config);
    },

    startPolling() {
      this.pollInterval = setInterval(() => {
        this.fetchDashboardData();
      }, 5000);
    },
  },
  mounted() {
    this.fetchDashboardData();
    this.startPolling();
  },
  beforeDestroy() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 400px;
}
</style>
