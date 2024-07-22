<template>
  <v-app>
    <v-card-title>Lista de Recebimentos</v-card-title>
    <Index />
  </v-app>
</template>

<script>
import Index from '../components/received/index.vue'

export default {
  name: 'Received',
  components: {
    Index,
  },
}
</script>
