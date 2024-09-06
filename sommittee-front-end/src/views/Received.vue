<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/received/index.vue'

export default {
  name: 'Received',
  components: {
    Index,
  },
}
</script>
