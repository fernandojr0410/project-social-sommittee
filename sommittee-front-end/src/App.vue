<template>
  <v-app>
    <Header v-if="showHeader"></Header>
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
  computed: {
    showHeader() {
      const currentRoute = this.$route.name

      const isAuthenticated = this.isAuthenticated()

      return currentRoute !== 'login' && isAuthenticated
    },
  },
  methods: {
    isAuthenticated() {
      const accessToken = localStorage.getItem('@sommittee.access_token')
      return !!accessToken
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
