<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/family/index.vue'

export default {
  name: 'Family',
  components: {
    Index,
  },
}
</script>
