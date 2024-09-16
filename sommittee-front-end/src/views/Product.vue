<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/product/index.vue'

export default {
  name: 'Product',
  components: {
    Index,
  },
}
</script>
