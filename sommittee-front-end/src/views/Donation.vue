<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/donation/index.vue'

export default {
  name: 'Donation',
  components: {
    Index,
  },
}
</script>
