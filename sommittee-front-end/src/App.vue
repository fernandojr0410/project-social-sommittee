<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/header/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      await this.$store.dispatch('auth/fetchUser')
    },
  },
}
</script>

<style>
html,
body {
  font-family: Helvetica;
  margin: 0;
  padding: 0;
}
</style>
