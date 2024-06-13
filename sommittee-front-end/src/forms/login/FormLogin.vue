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
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              v-model="inputPassword"
              label="Senha"
              @click:append="togglePasswordVisibility"
            />

            <div class="my-password">
              <span>Esqueci minha senha</span>
            </div>
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
  </v-app>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'
import { EventBus } from '@/config/EventBus'
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
        const response = await API.updatedLogin(requestBody)

        if (response && response.access_token) {
          const token = response.access_token
          localStorage.setItem('@sommittee.access_token', token)
          EventBus.$emit('userLoggedIn')
          this.$router.push('/home')
        }
      } catch (error) {
        this.openModal(
          'Conta não encontrada!',
          'Email ou senha não encontrado! Verifique suas credenciais e tente novamente.'
        )
        throw error
      }
    },
    openModal(title, text) {
      this.modalTitle = title
      this.modalText = text
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
