<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from "../components/user/index.vue";

export default {
  name: "User",
  components: {
    Index,
  },
};
</script>
