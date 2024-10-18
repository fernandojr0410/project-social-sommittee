<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">Sessão Expirada</v-card-title>
      <v-card-text
        >Sua sessão expirou. Por favor, faça login novamente.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$store.dispatch("auth/setSessionExpired", false);
      this.$router.push("/login");
    },
  },
};
</script>
