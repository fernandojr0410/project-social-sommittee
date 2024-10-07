<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div class="background-container">
        <img src="@/assets/img/imgFundo.png" alt="" class="background-image" />
        <div class="gradient-overlay"></div>

        <v-card class="pa-10 pt-8" style="max-width: 450px; width: 100%">
          <v-card-title
            class="d-flex flex-column justify-center font-weight-bold"
            style="font-size: 30px; border-bottom: 0.5px solid black"
          >
            Login
          </v-card-title>

          <div class="mt-8">
            <v-text-field
              outlined
              :append-icon="'mdi-email'"
              v-model="inputEmail"
              label="Email"
            />

            <v-text-field
              outlined
              @keyup.enter="handleLogin"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              v-model="inputPassword"
              label="Senha"
              @click:append="togglePasswordVisibility"
            />
          </div>

          <v-btn
            @click="handleLogin"
            color="primary"
            block
            dark
            style="display: flex; width: 50%"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Entrando..." : "Entrar" }}
          </v-btn>

          <Modal
            :value="showModal"
            @input="showModal = $event"
            :title="modalTitle"
            :text="modalText"
            :button="modalButton"
          />
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "FormLogin",
  components: {
    Modal,
  },
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      showPassword: false,
      visible: false,
      modalTitle: "",
      modalText: "",
      modalButton: false,
      showModal: false,
      isSubmitting: false,
      recaptchaReady: false,
    };
  },
  mounted() {
    this.loadReCaptcha();
  },
  methods: {
    loadReCaptcha() {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.VUE_APP_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.recaptchaReady = true;
      };
      document.head.appendChild(script);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      if (!this.recaptchaReady) {
        console.error("reCAPTCHA não está pronto");
        return;
      }

      this.isSubmitting = true;
      this.modalTitle = "";
      this.modalText = "";
      this.showModal = false;

      try {
        const token = await grecaptcha.execute(
          process.env.VUE_APP_RECAPTCHA_SITE_KEY,
          {
            action: "login",
          }
        );

        if (!token) {
          throw new Error("Falha ao obter o token do reCAPTCHA");
        }

        const requestBody = {
          email: this.inputEmail,
          password: this.inputPassword,
          recaptchaToken: token,
        };

        const response = await this.$store.dispatch("auth/login", requestBody);
        await this.$store.dispatch("auth/fetchUser");
        this.$router.push(this.$route.query.redirect || "/");
        return response;
      } catch (error) {
        this.openModal(
          "Conta não encontrada!",
          "Email ou senha não encontrado! Verifique suas credenciais e tente novamente."
        );
        throw error;
      } finally {
        this.isSubmitting = false;
      }
    },
    openModal(title, text) {
      this.modalTitle = title;
      this.modalText = text;
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.background-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #fbbf24, #fb923c);
  opacity: 0.6;
}

.line-divider {
  width: 50%;
  height: 2px;
  background-color: black;
  margin-bottom: 20px;
}
</style>
