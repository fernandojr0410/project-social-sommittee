<template>
  <v-container class="fill-height">
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="8" md="6" lg="50">
        <v-card class="pa-4 elevation-12">
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="name" label="Nome" filled />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="surname" label="Sobrenome" filled />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field v-model="telephone" label="Telefone" filled />
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
                  />
                </v-col>
              </v-row>
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
</template>

<script>
import API from '@/services/module/API'

export default {
  name: 'FormMyData',
  data() {
    return {
      id: null,
      name: '',
      surname: '',
      telephone: '',
      email: '',
      password: '',
      showPassword: false,
      newPassword: '',
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
        console.error(error)
      }
    },
    async updateProfileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        if (token && this.id) {
          const profileData = {
            name: this.name,
            surname: this.surname,
            telephone: this.telephone,
            email: this.email,
          }

          const updatedProfile = await API.updateUserProfile(
            this.id,
            profileData
          )

          console.log('Perfil atualizado:', updatedProfile)
        }
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
  },
  created() {
    this.dataProfileUser()
  },
}
</script>
