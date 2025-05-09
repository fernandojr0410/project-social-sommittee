<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedDonor"
                v-model="updatedDonor.name"
                label="Nome completo"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedDonor"
                v-model="updatedDonor.identifier"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###.##'"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedDonor"
                v-model="updatedDonor.email"
                label="E-mail"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedDonor"
                v-model="updatedDonor.telephone"
                label="Contato"
                class="mr-3"
                v-mask="'(##) #####-####'"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-if="updatedDonor"
                v-model="updatedDonor.type_donor"
                :items="[
                  { text: 'Interno', value: 'INTERNAL' },
                  { text: 'Externo', value: 'EXTERNAL' },
                ]"
                item-value="value"
                item-text="text"
                label="Tipo"
                class="mr-3"
                outlined
                dense
                hide-details
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
  name: "DonorEdit",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      updatedDonor: this.getDonor(),
      loading: false,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedDonor = await this.$store.dispatch("donor/findById", id);
        }
        this.updatedDonor.identifier = this.formatIdentifier(
          this.updatedDonor.identifier
        );
        this.updatedDonor.telephone = this.formatTelephone(
          this.updatedDonor.telephone
        );
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
    getDonor() {
      return {
        name: "",
        identifier: "",
        email: "",
        telephone: "",
        type_donor: "",
      };
    },
    closeDialog() {
      this.$emit("close");
    },
    async saveChanges() {
      try {
        const donorId = this.id;
        const updateData = {
          id: donorId,
          payload: {
            name: this.updatedDonor.name,
            identifier: this.updatedDonor.identifier.replace(/\D/g, ""),
            email: this.updatedDonor.email,
            telephone: this.updatedDonor.telephone.replace(/\D/g, ""),
            type_donor: this.updatedDonor.type_donor,
          },
        };
        await this.$store.dispatch("donor/update", updateData);
        this.$success("Registro atualizado!");
        this.updatedDonor = this.getDonor();
        this.closeDialog();
      } catch (error) {
        this.$error("Erro ao atualizar!");
        throw error;
      }
    },
  },
};
</script>
