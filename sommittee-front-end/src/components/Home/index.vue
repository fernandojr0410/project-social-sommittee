<template>
  <v-container>
    <div class="d-flex flex-column" style="gap: 30px; padding: 20px">
      <ProductDashboard />
      <div class="dashboard-container" style="display: flex; width: 100%; gap: 30px;">
        <div class="flex-grow-1">
          <ReceivedDashboard />
        </div>
        <div class="flex-grow-1">
          <DonationDashboard />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import DonationDashboard from "../donation/DonationDashboard.vue";
import ProductDashboard from "../product/ProductDashboard.vue";
import ReceivedDashboard from "../received/ReceivedDashboard.vue";

export default {
  name: "index",
  components: { ProductDashboard, ReceivedDashboard, DonationDashboard },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
}

.received-card,
.donation-card {
  flex-grow: 1;
  align-self: flex-start;
}
</style>
