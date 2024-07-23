<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <v-card-title>Listas de endereços</v-card-title>
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/address/index.vue'

export default {
  name: 'Address',
  components: {
    Index,
  },
}
</script>
