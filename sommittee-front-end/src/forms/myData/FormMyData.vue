<template>
  <v-main class="fill-height" style="background-color: #d9d9d9">
    <v-container>
      <v-row class="justify-center align-center">
        <v-col cols="12" sm="8" md="6" lg="50">
          <v-card class="pa-4 elevation-12">
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="name"
                      label="Nome"
                      filled
                      :rules="nameRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="surname"
                      label="Sobrenome"
                      filled
                      :rules="surnameRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="telephone"
                      label="Telefone"
                      filled
                      v-mask="'(##) ####-#####' || '(##) #####-###'"
                      :rules="telephoneRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="email" label="Email" filled />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newPassword"
                      label="Nova Senha"
                      filled
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="togglePasswordVisibility"
                      :rules="passwordRules"
                    />
                  </v-col>
                </v-row>
                <Modal
                  :value="showModal"
                  @input="showModal = $event"
                  :title="modalTitle"
                  :text="modalText"
                  :button="modalButton"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="updateProfileUser">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'
import API from '@/services/module/API'

export default {
  name: 'FormMyData',
  components: {
    Modal,
  },
  data() {
    return {
      id: '',
      name: '',
      surname: '',
      telephone: '',
      email: '',
      password: '',
      showPassword: false,
      newPassword: '',
      showModal: false,
      modalTitle: '',
      modalText: '',
      modalButton: false,
      nameRules: [(v) => !!v || 'Nome é obrigatório'],
      surnameRules: [(v) => !!v || 'Sobrenome é obrigatório'],
      telephoneRules: [(v) => !!v || 'Telefone é obrigatório'],
      emailRules: [
        (v) => !!v || 'Email é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
      ],
      passwordRules: [
        (v) =>
          (v && v.length >= 8) || 'A senha deve ter pelo menos 8 caracteres',
        (v) =>
          /[A-Z]/.test(v) ||
          'A senha deve conter pelo menos uma letra maiúscula',
        (v) =>
          /[a-z]/.test(v) ||
          'A senha deve conter pelo menos uma letra minúscula',
        (v) =>
          /\d/.test(v) || 'A senha deve conter pelo menos um dígito (número)',
        (v) =>
          /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
          'A senha deve conter pelo menos um caracter especial',
      ],
    }
  },
  async mounted() {
    await this.dataProfileUser()
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async dataProfileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        if (token) {
          const userDetails = await API.getUserProfile(token)
          this.id = userDetails.id
          this.name = userDetails.name
          this.surname = userDetails.surname
          this.telephone = userDetails.telephone
          this.email = userDetails.email
        }
      } catch (error) {
        throw error
      }
    },

    async updateProfileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        if (token && this.id) {
          const dataUser = {
            name: this.name,
            surname: this.surname,
            telephone: this.telephone,
            email: this.email,
          }
          if (this.newPassword) {
            dataUser.password = this.newPassword
          }
          await API.updateUserProfile(this.id, dataUser)
          if (this.newPassword) {
            await this.updatedPassword()
          }
          this.showModal = true
          this.openModal(
            'Registros salvos com sucesso!',
            'Caso tenha alterado e-mail ou senha, favor realizar o login novamente!',
            'OK'
          )
          console.log('Atualizado:', dataUser)
        }
      } catch (error) {
        throw error
      }
    },
    openModal(title, text) {
      this.modalTitle = title
      this.modalText = text
      this.showModal = true
    },
    async updatedPassword() {
      try {
        const dataLogin = {
          email: this.email,
          password: this.newPassword,
        }
        await API.updatedLogin(this.id, dataLogin)
      } catch (error) {
        throw error
      }
    },
    async updatedPassword() {
      try {
        const dataLogin = {
          email: this.email,
          password: this.newPassword,
        }
        await API.updatedLogin(this.id, dataLogin)
        openModal()
      } catch (error) {
        throw error
      }
    },
  },
  created() {
    this.dataProfileUser()
  },
}
</script>
