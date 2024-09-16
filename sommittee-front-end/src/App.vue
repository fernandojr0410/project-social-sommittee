<template>
  <v-app>
    <Header></Header>
    <v-main class="grey lighten-4">
      <router-view></router-view>

      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/header/Header.vue'
import { mapState } from 'vuex'
import Snackbar from '@/components/snackbar'

export default {
  name: 'App',
  components: {
    Header,
    Snackbar
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      statusSocket: (state) => state.statusSocket,
    }),
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
