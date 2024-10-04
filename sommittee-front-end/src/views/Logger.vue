<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from "../components/logger/index.vue";

export default {
  name: "Logger",
  components: { Index },
};
</script>
