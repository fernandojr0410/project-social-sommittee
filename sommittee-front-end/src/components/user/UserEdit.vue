<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
    @close="resetPasswordEdit"
    @open="resetPasswordEdit"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <div style="padding-bottom: 16px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do usuário:
            </span>
          </div>
          <v-row justify="center" align="center">
            <v-col
              cols="auto"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <v-avatar size="120">
                <v-img
                  v-if="updatedUser && updatedUser.avatar_url"
                  :src="updatedUser.avatar_url"
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
                v-model="updatedUser.name"
                label="Nome completo"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="updatedUser.identifier"
                label="CPF"
                class="mr-3"
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
                v-model="updatedUser.email"
                label="E-mail"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedUser.telephone"
                label="Telefone"
                class="mr-3"
                v-mask="'(##) #####-####'"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-model="updatedUser.role"
                label="Tipo acesso"
                class="mr-3"
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
                v-if="updatedUser"
                v-model="updatedUser.failed_attempts"
                label="Tentativas de login"
                class="mr-3"
                type="number"
                outlined
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-select
                v-if="updatedUser"
                v-model="updatedUser.account_locked"
                label="Conta bloqueada"
                class="mr-3"
                :items="[
                  { value: true, text: 'Sim' },
                  { value: false, text: 'Não' },
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
              <v-checkbox
                v-model="enablePasswordEdit"
                label="Habilitar edição da senha"
                @change="handlePasswordEditToggle"
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                hide-details
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                v-model="updatedUser.password"
                label="Senha"
                @click:append="togglePasswordVisibility"
                :disabled="!enablePasswordEdit"
                style="width: 98.5%"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="saveChanges"
          style="
            background-color: #007fff;
            color: white;
            font-weight: bold;
            margin-right: 12px;
          "
        >
          SALVAR ALTERAÇÕES
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UserEdit",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      updatedUser: this.getUser(),
      loading: false,
      showPassword: false,
      enablePasswordEdit: false,
    };
  },

  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedUser = await this.$store.dispatch(
            "userColaborator/findById",
            id
          );
          this.updatedUser.identifier = this.formatIdentifier(
            this.updatedUser.identifier
          );
          this.updatedUser.telephone = this.formatTelephone(
            this.updatedUser.telephone
          );

          this.$set(
            this.updatedUser,
            "failed_attempts",
            this.updatedUser.failed_attempts
          );

          this.updatedUser.password = "*****";
          this.enablePasswordEdit = false;
        }
      },
    },
  },
  methods: {
    formatIdentifier(value) {
      if (!value) return "";
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    },
    formatTelephone(value) {
      if (!value) return "";
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handlePasswordEditToggle() {
      if (this.enablePasswordEdit) {
        this.updatedUser.password = this.generatePassword();
      } else {
        this.updatedUser.password = "*****";
      }
    },
    resetPasswordEdit() {
      this.enablePasswordEdit = false;
      this.updatedUser.password = "*****";
    },
    getUser() {
      return {
        name: "",
        identifier: this.formatIdentifier(""),
        email: "",
        telephone: this.formatTelephone(""),
        role: "",
        failed_attempts: "",
        account_locked: "",
        password: "*****",
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
    closeDialog() {
      this.$emit("input", false);
      this.resetPasswordEdit();
    },
    async saveChanges() {
      try {
        if (this.updatedUser.account_locked === false) {
          this.updatedUser.failed_attempts = 0;
        }

        const updateData = {
          email: this.updatedUser.email,
          name: this.updatedUser.name,
          failed_attempts: this.updatedUser.failed_attempts,
          account_locked: this.updatedUser.account_locked,
          password: this.enablePasswordEdit
            ? this.updatedUser.password
            : undefined,
          identifier: this.updatedUser.identifier.replace(/\D/g, ""),
          telephone: this.updatedUser.telephone.replace(/[^0-9]/g, ""),
          role: this.updatedUser.role,
        };

        console.log("Payload enviado ao backend:", updateData);

        const response = await this.$store.dispatch("userColaborator/update", {
          id: this.id,
          payload: updateData,
        });

        console.log("updated:", response);
        this.$success("Registro atualizado!");
        this.closeDialog();
        return response;
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        throw error;
      }
    },
  },
};
</script>
