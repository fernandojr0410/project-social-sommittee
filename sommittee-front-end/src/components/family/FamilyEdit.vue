<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
  >
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="updatedFamily"
                :items="peopleList"
                item-text="name"
                item-value="id"
                label="Buscar pessoa..."
                :loading="loading"
                :rules="[rules.required]"
                return-object
                @update:search-input="searchPeople"
                outlined
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-select
                v-if="updatedFamily"
                v-model="selectedFunction"
                :rules="[rules.required]"
                :items="[
                  { text: 'Mãe', value: 'mother' },
                  { text: 'Pai', value: 'father' },
                  { text: 'Filho(a)', value: 'child' },
                  { text: 'Vó', value: 'grandMother' },
                  { text: 'Vô', value: 'grandFather' },
                  { text: 'Tio', value: 'uncle' },
                  { text: 'Tia', value: 'aunt' },
                ]"
                item-value="value"
                item-text="text"
                label="Função - Mãe, Pai, Filho(a), Vó..."
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-card>
        <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
          <div style="padding-bottom: 16px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações da pessoa:
            </span>
          </div>
          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedFamily.name"
                label="Nome completo"
                class="mr-3"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="updatedFamily.identifier"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###-##'"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedFamily.birth_date"
                label="Data de nascimento"
                type="date"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="updatedFamily.email"
                label="E-mail"
                class="mr-3"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedFamily.telephone"
                label="Telefone"
                class="mr-3"
                v-mask="'(##) #####-####'"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-model="updatedFamily.gender"
                :items="[
                  { text: 'Masculino', value: 'MALE' },
                  { text: 'Feminino', value: 'FEMALE' },
                ]"
                item-value="value"
                item-text="text"
                class="mr-3"
                label="Sexo"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="updatedFamily.work"
                :items="[
                  { text: 'Sim', value: true },
                  { text: 'Não', value: false },
                ]"
                item-value="value"
                item-text="text"
                class="mr-3"
                label="Trabalha?"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="updatedFamily.education"
                label="Educação"
                class="mr-3"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
          <div style="padding-bottom: 16px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do endereço:
            </span>
          </div>
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.zip_code"
                class="mr-3"
                label="CEP"
                v-mask="'#####-###'"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.street"
                label="Rua"
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
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.number"
                label="Número"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.neighborhood"
                label="Bairro"
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
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.complement"
                label="Complemento"
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
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.city"
                label="Cidade"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-if="updatedFamily && updatedFamily.address"
                v-model="updatedFamily.address.state"
                :items="states"
                item-value="acronym"
                item-text="name"
                class="mr-3"
                label="Estado"
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
import { states } from "@/assets/state";

export default {
  name: "FamilyEdit",
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
      updatedFamily: {},
      peopleList: [],
      selectedFunction: "",
      loading: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
      states,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedFamily = await this.$store.dispatch(
            "family/findById",
            id
          );
          this.selectedFunction = this.updatedFamily.function || "";
        }
      },
    },
  },
  methods: {
    getPeople() {
      return {
        id: "",
        name: "",
        identifier: "",
        email: "",
        birth_date: "",
        gender: "",
        telephone: "",
        work: "",
        education: "",
        address: {
          zip_code: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
        },
        people_family: [],
      };
    },

    async fetchPeople(search = "") {
      this.loading = true;
      try {
        const response = await this.findAll(search);
        this.peopleList = response;
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async findAll(search) {
      return await this.$store.dispatch("people/findAll", { search });
    },
    async saveChanges() {
      try {
        const familyId = this.id;
        const updateData = {
          id: familyId,
          payload: {
            people_id: this.updatedFamily.id,
            address_id: this.updatedFamily.address_id,
            function: this.selectedFunction,
          },
        };

        await this.$store.dispatch("family/update", updateData);
        this.$success("Registro atualizado!");
        this.updatedFamily = this.getPeople();
        this.selectedFunction = "";
        this.$emit("input", false);
      } catch (error) {
        this.$error("Erro ao atualizar!");
        throw error;
      }
    },
    searchPeople(search) {
      if (search && search.length > 2) {
        this.fetchPeople(search);
      } else {
        this.peopleList = [];
      }
    },
  },
};
</script>
