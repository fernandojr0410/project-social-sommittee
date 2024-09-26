<template>
  <v-container>
    <ProductDashboard />
  </v-container>
</template>

<script>
import ProductDashboard from "../product/ProductDashboard.vue";

export default {
  name: "index",
  components: {
    ProductDashboard,
  },
};
</script>
