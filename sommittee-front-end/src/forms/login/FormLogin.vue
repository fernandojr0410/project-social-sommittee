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
            :value="showErrorModal"
            @input="showErrorModal = $event"
            :title="modalTitle"
            :text="modalText"
            :button="modalButton"
          />

          <v-dialog v-model="show2FAModal" width="460">
            <v-card>
              <v-card-title>
                Por favor, verifique seu e-mail para o código de verificação.
              </v-card-title>
              <v-card-text>
                <v-otp-input
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
      otpCode: "",
      showPassword: false,
      modalTitle: "",
      modalText: "",
      modalButton: false,
      showErrorModal: false,
      show2FAModal: false,
      userId: null,
      isSubmitting: false,
      loginAttempts: 0,
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
        const token = await grecaptcha.execute(
          process.env.VUE_APP_RECAPTCHA_SITE_KEY,
          { action: "login" }
        );

        const requestBody = {
          email: this.inputEmail,
          password: this.inputPassword,
          recaptchaToken: token,
        };

        const response = await this.$store.dispatch("auth/login", requestBody);

        if (response && response.accountLocked) {
          this.openErrorModal(
            "Conta bloqueada",
            "Sua conta foi bloqueada devido a várias tentativas de login mal-sucedidas. Por favor, entre em contato com o administrador."
          );
          return;
        }

        if (response && response.two_factor) {
          this.userId = response.user_id;
          this.show2FAModal = true;
          this.loginAttempts = 0;
        } else {
          router.push({ name: "dashboard" });
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessage = error.response.data.message;

          if (errorMessage === "Usuário não encontrado!") {
            this.openErrorModal(
              "Usuário não encontrado",
              "O e-mail informado não corresponde a nenhuma conta. Verifique o e-mail e tente novamente."
            );
            this.loginAttempts = 0;
          } else if (errorMessage === "Credenciais inválidas!") {
            this.loginAttempts += 1;

            if (this.loginAttempts >= 3) {
              this.openErrorModal(
                "Conta bloqueada",
                "Sua conta foi bloqueada devido a várias tentativas de login mal-sucedidas. Por favor, entre em contato com o administrador."
              );
            } else {
              this.openErrorModal(
                "Credenciais inválidas",
                "A senha informada está incorreta. Por favor, tente novamente."
              );
            }
          } else if (
            errorMessage ===
            "Conta bloqueada. Entre em contato com o administrador."
          ) {
            this.openErrorModal(
              "Conta bloqueada",
              "Sua conta foi bloqueada devido a várias tentativas de login mal-sucedidas. Por favor, entre em contato com o administrador."
            );
          }
        } else {
          this.openErrorModal(
            "Erro de autenticação",
            "Houve um problema ao tentar fazer login. Tente novamente mais tarde."
          );
        }
      } finally {
        this.isSubmitting = false;
      }
    },
    async submitOtpCode() {
      this.isSubmitting = true;

      try {
        const response = await this.$store.dispatch("auth/verifyTwoFactor", {
          code: this.otpCode,
          user_id: this.userId,
        });

        if (response.success) {
          router.push({ name: "dashboard" });
        } else {
          this.openErrorModal(
            "Erro de autenticação",
            "Código inválido. Tente novamente."
          );
        }
      } finally {
        this.isSubmitting = false;
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
