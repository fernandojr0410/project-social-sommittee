<template>
  <v-card flat style="width: 100%; max-width: 400px" class="mx-auto">
    <v-form class="pt-10">
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Senha antiga"
            v-model="oldPassword"
            @input="validatePassword"
            required
            :type="showOldPassword ? 'text' : 'password'"
            :append-icon="showOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleOldPasswordVisibility"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Nova senha"
            v-model="newPassword"
            @input="validatePassword"
            required
            :type="showNewPassword ? 'text' : 'password'"
            :append-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleNewPasswordVisibility"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Confirmar nova senha"
            v-model="confirmPassword"
            @input="validatePassword"
            required
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleConfirmPasswordVisibility"
          />
        </v-col>
      </v-row>
      <v-row v-if="showPasswordCriteria">
        <v-col cols="12">
          <v-list class="pl-0 ml-0" dense>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.length,
                'text-error': !passwordCriteria.length,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.length,
                  'icon-error': !passwordCriteria.length,
                }"
              >
                {{
                  passwordCriteria.length
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              Precisa ter no mínimo 8 caracteres
            </v-list-item>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.uppercase,
                'text-error': !passwordCriteria.uppercase,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.uppercase,
                  'icon-error': !passwordCriteria.uppercase,
                }"
              >
                {{
                  passwordCriteria.uppercase
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              Precisa ter pelo menos uma letra maiúscula
            </v-list-item>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.lowercase,
                'text-error': !passwordCriteria.lowercase,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.lowercase,
                  'icon-error': !passwordCriteria.lowercase,
                }"
              >
                {{
                  passwordCriteria.lowercase
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              Precisa ter pelo menos uma letra minúscula
            </v-list-item>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.special,
                'text-error': !passwordCriteria.special,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.special,
                  'icon-error': !passwordCriteria.special,
                }"
              >
                {{
                  passwordCriteria.special
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              Precisa ter pelo menos um caractere especial
            </v-list-item>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.number,
                'text-error': !passwordCriteria.number,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.number,
                  'icon-error': !passwordCriteria.number,
                }"
              >
                {{
                  passwordCriteria.number
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              Precisa ter pelo menos um dígito numérico
            </v-list-item>
            <v-list-item
              class="pl-0 ml-0"
              :class="{
                'text-success': passwordCriteria.match,
                'text-error': !passwordCriteria.match,
              }"
            >
              <v-icon
                left
                :class="{
                  'icon-success': passwordCriteria.match,
                  'icon-error': !passwordCriteria.match,
                }"
              >
                {{
                  passwordCriteria.match
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
              As senhas precisam ser iguais
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="d-flex justify-center pt-5">
      <v-btn
        color="primary"
        :disabled="!isFormValid()"
        @click="updatePassword"
        width="300"
      >
        ALTERAR SENHA
      </v-btn>
    </v-card-actions>
    <Modal
      :value="showModal"
      @input="showModal = $event"
      :title="modalTitle"
      :text="modalText"
      :button="modalButton"
      @confirm="redirectToLogin"
    />
  </v-card>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'

export default {
  name: 'FormPassword',
  components: {
    Modal,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      showPasswordCriteria: false,
      modalTitle: '',
      modalText: '',
      modalButton: false,
      showModal: false,
      passwordCriteria: {
        length: false,
        uppercase: false,
        lowercase: false,
        special: false,
        number: false,
        match: false,
      },
    }
  },
  methods: {
    toggleOldPasswordVisibility() {
      this.showOldPassword = !this.showOldPassword
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    validatePassword() {
      this.showPasswordCriteria =
        this.newPassword.length > 0 || this.confirmPassword.length > 0
      this.passwordCriteria.length = this.newPassword.length >= 8
      this.passwordCriteria.uppercase = /[A-Z]/.test(this.newPassword)
      this.passwordCriteria.lowercase = /[a-z]/.test(this.newPassword)
      this.passwordCriteria.special = /[!@#$%^&*(),.?":{}|<>]/.test(
        this.newPassword
      )
      this.passwordCriteria.number = /[0-9]/.test(this.newPassword)
      this.passwordCriteria.match = this.newPassword === this.confirmPassword
    },
    isFormValid() {
      return (
        this.passwordCriteria.length &&
        this.passwordCriteria.uppercase &&
        this.passwordCriteria.lowercase &&
        this.passwordCriteria.special &&
        this.passwordCriteria.number &&
        this.passwordCriteria.match
      )
    },
    async updatePassword() {
      const requestBody = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      }
      try {
        const response = await this.$store.dispatch(
          'auth/updatePassword',
          requestBody
        )
        this.showModal = true
        this.openModal(
          'Senha alterada!',
          'Sua senha foi alterada com sucesso! Você será deslogado!',
          'OK'
        )

        await this.$store.dispatch('auth/logout')
        this.showModal = false
        this.$router.push('/login')

        return response
      } catch (error) {
        this.showModal = true
        this.openModal(
          'Senha antiga incorreta!',
          'A senha que você digitou está incorreta, tente novamente!',
          'OK'
        )

        throw error
      }
    },
    openModal(title, text) {
      ;(this.modalTitle = title),
        (this.modalText = text),
        (this.modalButton = true)
    },
    redirectToLogin() {},
  },
}
</script>

<style scoped>
.text-success {
  color: green !important;
}

.text-error {
  color: red !important;
}

.icon-success {
  color: green !important;
}

.icon-error {
  color: red !important;
}
</style>
