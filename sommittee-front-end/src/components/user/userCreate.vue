<template>
  <v-container>
    <v-fab-transition>
      <v-btn
        fixed
        fab
        right
        bottom
        @click="openDialog"
        color="green"
        x-large
        style="color: white"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>Cadastrar registro</v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações do usuário</span
              >
            </div>
            <v-row justify="center" align="center">
              <v-col
                cols="auto"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <v-avatar size="120">
                  <v-img
                    v-if="createdUser && createdUser.avatar_url"
                    :src="createdUser.avatar_url"
                    alt="Avatar"
                  />
                  <v-icon v-else size="120" color="orange"
                    >mdi-account-circle</v-icon
                  >
                </v-avatar>
                <span
                  style="font-weight: 400; margin-top: 8px; font-size: 16px"
                  color="primary"
                  >Foto perfil</span
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdUser"
                  v-model="createdUser.name"
                  label="Nome completo"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-if="createdUser"
                  v-model="createdUser.identifier"
                  label="CPF"
                  class="mr-3"
                  :rules="[rules.required]"
                  v-mask="'###.###.###-##'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdUser"
                  v-model="createdUser.email"
                  label="E-mail"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdUser"
                  v-model="createdUser.telephone"
                  label="Telefone"
                  class="mr-3"
                  :rules="[rules.required]"
                  v-mask="'(##) #####-####'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-select
                  v-if="createdUser"
                  v-model="createdUser.role"
                  label="Tipo acesso"
                  class="mr-3"
                  :rules="[rules.required]"
                  :items="[
                    { value: 'ADMIN', text: 'Administrador' },
                    { value: 'MANAGER', text: 'Gerente' },
                    { value: 'OPERATOR', text: 'Usuário padrão' },
                  ]"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdUser"
                  outlined
                  dense
                  hide-details
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  v-model="createdUser.password"
                  label="Senha"
                  @click:append="togglePasswordVisibility"
                  style="width: 98.5%"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
            color="primary"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createUser"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CRIAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "userCreate",
  data() {
    return {
      dialog: false,
      createdUser: this.getUser(),
      loading: false,
      showPassword: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    getUser() {
      return {
        name: "",
        identifier: "",
        email: "",
        telephone: "",
        role: "",
        password: "",
      };
    },
    generatePassword() {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
      let password = "";
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    },
    openDialog() {
      this.dialog = true;
      this.createdUser = this.getUser();
      this.createdUser.password = this.generatePassword();
    },
    closeDialog() {
      this.dialog = false;
    },
    async createUser() {
      const userData = {
        name: this.createdUser.name,
        identifier: this.createdUser.identifier.replace(/\D/g, ""),
        email: this.createdUser.email,
        telephone: this.createdUser.telephone.replace(/[^0-9]/g, ""),
        role: this.createdUser.role,
        password: this.createdUser.password,
      };

      try {
        const response = await this.$store.dispatch(
          "userColaborator/create",
          userData
        );

        if (response) {
          this.$success("Registro criado!");

          this.createdUser = this.getUser();
          this.closeDialog();
        } else {
          this.$error("Erro ao criar usuário.");
        }
      } catch (error) {
        this.$error("Erro ao criar usuário.");
        console.error(error);
      }
    },
  },
};
</script>
