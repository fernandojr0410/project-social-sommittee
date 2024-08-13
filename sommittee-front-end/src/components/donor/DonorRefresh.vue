<template>
  <v-btn @click="refreshData" icon>
    <v-icon color="blue" style="font-weight: bold; font-size: 30px">
      mdi-refresh
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DonorRefresh',
  methods: {
    async refreshData() {
      await this.$store.dispatch('donor/findAll')
    },
  },
}
</script>
