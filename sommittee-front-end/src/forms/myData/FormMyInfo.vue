<template>
  <v-card class="elevation-4">
    <div
      class="d-flex flex-column align-center justify-center"
      style="padding-top: 20px"
    >
      <AvatarPhoto v-model="form.avatar_url" />
    </div>
    <v-form>
      <v-row class="pa-15">
        <v-col cols="12" sm="6">
          <v-text-field label="Nome" filled v-model="form.name" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="form.identifier | cpf"
            label="CPF"
            filled
            readonly
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Telefone"
            v-mask="'(##) #####-####'"
            filled
            v-model="form.telephone"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="E-mail" filled v-model="form.email" />
        </v-col>
      </v-row>

      <v-card-actions class="mr-13">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="updateProfile"
          :disabled="!isFormChanged"
        >
          ALTERAR DADOS
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import AvatarPhoto from "./AvatarPhoto.vue";

export default {
  name: "FormMyInfo",
  components: { AvatarPhoto },
  data() {
    return {
      form: {
        name: "",
        identifier: "",
        telephone: "",
        email: "",
        avatar_url: "",
      },
      originalForm: {
        name: "",
        identifier: "",
        telephone: "",
        email: "",
        avatar_url: "",
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    isFormChanged() {
      return (
        this.form.name !== this.originalForm.name ||
        this.form.identifier !== this.originalForm.identifier ||
        this.form.telephone !== this.originalForm.telephone ||
        this.form.email !== this.originalForm.email ||
        this.form.avatar_url !== this.originalForm.avatar_url
      );
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user) {
          this.form = { ...user };
          this.originalForm = { ...this.form };
        }
      },
    },
  },
  methods: {
    async updateProfile() {
      try {
        const payload = { ...this.form };

        delete payload.created_at;
        delete payload.updated_at;
        delete payload.last_action;

        await this.$store.dispatch("auth/updateProfile", payload);
        this.$success("Dados atualizados com sucesso!");
      } catch (error) {
        this.$error("Erro ao atualizar perfil.");
        throw error;
      }
    },
  },
};
</script>
