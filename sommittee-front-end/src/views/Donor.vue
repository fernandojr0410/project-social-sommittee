<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/donor/index.vue'

export default {
  name: 'Donor',
  components: {
    Index,
  },
}
</script>
