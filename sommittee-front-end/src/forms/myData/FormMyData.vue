<template>
  <v-main class="fill-height" style="background-color: #d9d9d9">
    <v-container class="justify-center align-center">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="#f2522e"
          centered
          dark
          icons-and-text
          class="pt-20"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Informações
            <v-icon>mdi-information-outline</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Autenticação
            <v-icon>mdi-two-factor-authentication</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Senha
            <v-icon>mdi-lock-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card flat>
              <v-form>
                <v-row class="pa-15">
                  <v-col cols="12" sm="6">
                    <v-text-field label="Nome" filled v-model="form.name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Sobrenome"
                      filled
                      v-model="form.surname"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Telefone"
                      filled
                      v-model="form.telephone"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="E-mail"
                      filled
                      v-model="form.email"
                      disabled
                    />
                  </v-col>
                </v-row>

                <v-card-actions class="mr-13">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="nextPage">Próximo</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat>
              <v-row class="justify-center pa-15">
                <v-form style="width: 40%">
                  <v-col>
                    <v-otp-input length="6" type="number" />
                  </v-col>
                </v-form>
              </v-row>
              <v-card-actions class="mr-13">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="nextPageTab3">Próximo</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <v-card flat>
              <v-form>
                <v-row class="pa-3">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Nova Senha"
                      type="password"
                      v-model="password"
                      @input="validatePassword"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Confirmar Nova Senha"
                      type="password"
                      v-model="confirmPassword"
                      @input="validatePassword"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pa-3" v-if="showPasswordCriteria">
                  <v-col cols="12">
                    <v-list>
                      <v-list-item
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
              <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!isFormValid">
                  Alterar Senha
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormMyData',
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
  watch: {
    user: {
      immediate: true,
      handler: function (user) {
        if (user) {
          this.form = JSON.parse(
            JSON.stringify({
              name: user.name,
              surname: user.surname,
              telephone: user.telephone,
              email: user.email,
            })
          )
        }
      },
    },
  },
  data() {
    return {
      tab: ['tab-1', 'tab-2', 'tab-3'],
      form: {
        name: '',
        surname: '',
        telephone: '',
        email: '',
      },
      password: '',
      confirmPassword: '',
      showPasswordCriteria: false,
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
    nextPage() {
      this.tab = 'tab-2'
    },
    nextPageTab3() {
      this.tab = 'tab-3'
    },
    validatePassword() {
      this.showPasswordCriteria =
        this.password.length > 0 || this.confirmPassword.length > 0
      this.passwordCriteria.length = this.password.length >= 8
      this.passwordCriteria.uppercase = /[A-Z]/.test(this.password)
      this.passwordCriteria.lowercase = /[a-z]/.test(this.password)
      this.passwordCriteria.special = /[!@#$%^&*(),.?":{}|<>]/.test(
        this.password
      )
      this.passwordCriteria.number = /[0-9]/.test(this.password)
      this.passwordCriteria.match = this.password === this.confirmPassword
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
  },
}
</script>

<style>
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
