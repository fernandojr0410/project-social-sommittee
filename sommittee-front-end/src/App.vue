<template>
  <v-app>
    <Header v-if="user && $route.path !== '/login'"></Header>
    <v-main class="grey lighten-4">
      <router-view></router-view>
      <SessionExpiredModal v-if="sessionExpired && $route.path !== '/login'" />

      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { mapState } from "vuex";
import Snackbar from "@/components/snackbar";
import SessionExpiredModal from "@/components/modal/SessionExpiredModal.vue";
import { jwtDecode } from "jwt-decode";

export default {
  name: "App",
  components: {
    Header,
    Snackbar,
    SessionExpiredModal,
  },
  data() {
    return {
      tokenExpirationTimer: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      sessionExpired: (state) => state.auth.sessionExpired,
      token: (state) => state.auth.token,
    }),
  },
  watch: {
    sessionExpired(newVal) {
      if (newVal) {
        console.log("Sessão expirada, exibindo modal");
      }
    },

    token(newToken) {
      console.log("Watcher do token disparado, novo token:", newToken);
      this.setupTokenExpirationWatcher(newToken);
    },
  },
  async mounted() {
    await this.fetchUser();
    const token = this.token;
    console.log("Token no mounted após fetchUser:", token);
    if (token) {
      this.setupTokenExpirationWatcher(token);
    } else {
      this.clearTokenExpirationTimer();
    }
  },
  beforeDestroy() {
    this.clearTokenExpirationTimer();
  },
  methods: {
    async fetchUser() {
      await this.$store.dispatch("auth/fetchUser");
      const token = this.token;
      console.log("Token após fetchUser:", token);
      if (token) {
        this.setupTokenExpirationWatcher(token);
      } else {
        this.clearTokenExpirationTimer();
      }
    },
    setupTokenExpirationWatcher(token) {
      this.clearTokenExpirationTimer();
      if (!token) {
        console.log("Nenhum token disponível para configurar o watcher");
        return;
      }
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const expiresIn = decodedToken.exp - currentTime;

        if (expiresIn > 0) {
          console.log(`Token expira em ${expiresIn} segundos`);
          this.tokenExpirationTimer = setTimeout(() => {
            console.log("Token expirou, atualizando estado");
            this.$store.dispatch("auth/setSessionExpired", true);
          }, expiresIn * 1000);
        } else {
          console.log("Token já expirado, atualizando estado");
          this.$store.dispatch("auth/setSessionExpired", true);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
      }
    },
    clearTokenExpirationTimer() {
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    },
  },
};
</script>
