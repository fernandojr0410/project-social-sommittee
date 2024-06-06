<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <div class="background-container">
          <img
            src="@/assets/img/imgFundo.png"
            alt=""
            class="background-image"
          />
          <div class="gradient-overlay"></div>

          <v-card
            class="pa-10"
            style="display: flex; flex-direction: column; width: 30%"
          >
            <v-card-title
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 14px;
                font-size: 30px;
                font-weight: bold;
                padding-bottom: 30px;
              "
            >
              Login
              <div class="line-divider"></div>
            </v-card-title>

            <v-text-field
              outlined
              :append-icon="'mdi-email'"
              v-model="inputEmail"
              label="Email"
            />

            <v-text-field
              outlined
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              v-model="inputPassword"
              label="Senha"
              @click:append="togglePasswordVisibility"
            />

            <div class="my-password">
              <span>Esqueci minha senha</span>
            </div>

            <v-btn
              @click="fetchData"
              color="primary"
              block
              dark
              style="display: flex; width: 50%"
            >
              Entrar
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
    </v-main>
  </v-app>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'
import API from '@/services/module/API'

export default {
  name: 'FormLogin',
  components: {
    Modal,
  },
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      showPassword: false,
      visible: false,
      modalTitle: '',
      modalText: '',
      modalButton: false,
      msg: {
        email: '',
        password: '',
      },
      showModal: false,
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async fetchData() {
      const requestBody = {
        email: this.inputEmail,
        password: this.inputPassword,
      }
      try {
        await API.user.login(requestBody)
        this.$router.push({ path: '/Home' })
      } catch (error) {
        this.openModal(
          'Conta não encontada!',
          'Email ou senha não encontrado! Verifique suas credenciais e tente novamente.'
        )
      }
    },
    openModal(title, text, boolean) {
      this.modalTitle = title
      this.modalText = text
      this.modalButton = boolean
      this.showModal = true
    },
  },
}
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

.my-password {
  display: flex;
  justify-content: end;
  margin-bottom: 40px;
  font-weight: bold;
}
</style>
