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

          <!-- Modal para erros (conta não encontrada) -->
          <Modal
            :value="showErrorModal"
            @input="showErrorModal = $event"
            :title="modalTitle"
            :text="modalText"
            :button="modalButton"
          />

          <!-- Modal 2FA para autenticação -->
          <v-dialog v-model="show2FAModal" width="400">
            <v-card>
              <v-card-title>Autenticação 2FA</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="otpCode"
                  label="Digite o código 2FA"
                  outlined
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="submitOtpCode"
                  color="primary"
                  block
                  :disabled="isSubmitting"
                >
                  Validar Código
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "FormLogin",
  components: {
    Modal,
  },
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      otpCode: "", // Código 2FA inserido pelo usuário
      showPassword: false,
      modalTitle: "",
      modalText: "",
      modalButton: false,
      showErrorModal: false,
      show2FAModal: false, // Modal de autenticação 2FA
      userId: null, // ID do usuário para a validação do código 2FA
      isSubmitting: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    resetModals() {
      this.showErrorModal = false;
      this.show2FAModal = false;
    },

    async handleLogin() {
      this.isSubmitting = true;
      this.resetModals();

      try {
        console.log("Iniciando o login...");

        // Simula o recaptcha token
        const token = await grecaptcha.execute(
          process.env.VUE_APP_RECAPTCHA_SITE_KEY,
          { action: "login" }
        );
        console.log("Token reCAPTCHA gerado:", token);

        const requestBody = {
          email: this.inputEmail,
          password: this.inputPassword,
          recaptchaToken: token,
        };

        console.log("Enviando dados de login para o servidor:", requestBody);
        const response = await this.$store.dispatch("auth/login", requestBody);

        if (response && response.two_factor) {
          this.userId = response.user_id;
          this.show2FAModal = true;
        } else {
          console.error(
            "Erro: Resposta inválida no fluxo de 2FA ou ID de usuário não encontrado."
          );
        }
      } catch (error) {
        console.error("Erro durante o login:", error);
        this.openErrorModal(
          "Erro de autenticação!",
          "Você não está autorizado. Tente novamente."
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    async submitOtpCode() {
      const requestBody = {
        code: this.otpCode,
        user_id: this.userId,
      };
      try {
        console.log("Enviando código 2FA:", requestBody);
        const response = await this.$store.dispatch(
          "auth/verifyTwoFactor",
          requestBody
        );
        console.log("Resposta da verificação do código 2FA:", response);
        // Redireciona o usuário para a página Home após a verificação bem-sucedida
        this.$router.push("/");
        return response;
        // O `getProfile` será chamado automaticamente após o redirecionamento
      } catch (error) {
        console.error("Erro durante a verificação do código 2FA:", error);
        this.$emit("erroOtp", "O código inserido é inválido.");
      }
    },

    openErrorModal(title, text) {
      this.modalTitle = title;
      this.modalText = text;
      this.showErrorModal = true;
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
</style>
