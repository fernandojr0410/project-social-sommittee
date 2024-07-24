<template>
  <v-app :style="{ backgroundColor: $vuetify.theme.themes.light.grayPrimary }">
    <Index />
  </v-app>
</template>

<script>
import Index from '@/components/people/index.vue'

export default {
  name: 'People',
  components: {
    Index,
  },
}
</script>
