<template>
  <v-card max-width="500px">
    <v-card-title class="justify-center">
      <span
        class="headline"
        style="font-weight: 500; border-bottom: 1px solid gray"
      >
        Dashboard de Produtos
      </span>
    </v-card-title>

    <v-row
      style="padding: 6px"
      v-if="dashboardData && dashboardData.length > 0"
    >
      <v-col>
        <!-- Container para o gráfico -->
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

export default {
  name: "ProductDashboard",
  data() {
    return {
      dashboardData: [], // Dados das categorias e quantidades de estoque
      chartInstance: null, // Instância do gráfico
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        // Simulando uma requisição ao backend para pegar dados das categorias
        const response = await this.$store.dispatch(
          "product/fetchDashboardData"
        );

        // Verificando se a resposta é um array de objetos com categorias e quantidades
        if (Array.isArray(response)) {
          this.dashboardData = response; // Assume que o backend retorna todas as categorias e estoques

          // Renderizar o gráfico após garantir que o DOM foi atualizado
          this.$nextTick(() => {
            this.renderChart();
          });
        } else {
          console.error(
            "Resposta inesperada: esperado um array de categorias."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados da dashboard:", error);
      }
    },
    renderChart() {
      const ctx = document.getElementById("doughnutChart").getContext("2d");

      // Se o gráfico já existe, destruí-lo para recriar
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Verifica se dashboardData é um array e contém dados
      if (
        !Array.isArray(this.dashboardData) ||
        this.dashboardData.length === 0
      ) {
        console.error("Nenhum dado disponível para o gráfico.");
        return;
      }

      // Labels e dados dinâmicos vindos do backend
      const labels = this.dashboardData.map((item) => item.type); // Ex: ["clothes", "shoes", "accessories"]
      const stockAmounts = this.dashboardData.map((item) => item.totalAmount); // Ex: [23, 15, 12]

      // Configuração do gráfico
      const data = {
        labels: labels, // Os nomes das categorias
        datasets: [
          {
            label: "Estoque",
            data: stockAmounts, // Quantidade de estoque para cada categoria
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      // Configuração do tooltip para mostrar categoria e quantidade
      const config = {
        type: "doughnut",
        data: data,
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
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

      // Criar instância do gráfico
      this.chartInstance = new Chart(ctx, config);
    },
  },
  mounted() {
    this.fetchDashboardData(); // Chama a função assim que o componente é montado
  },
};
</script>

<style scoped>
/* Ajuste o tamanho do gráfico */
canvas {
  max-width: 100%;
  height: 400px;
}
</style>
