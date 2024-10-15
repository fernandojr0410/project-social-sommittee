<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
  >
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <div style="padding-bottom: 20px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações da pessoa:
            </span>
          </div>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedPeople.name"
                label="Nome completo"
                class="mr-3"
                outlined
                dense
                hide-details
                style="width: 100%"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedPeople.identifier"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###-##'"
                readonly
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Data de nascimento"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="updateBirthDate"
                    v-on="on"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="secondary"
                  v-model="updatedPeople.birth_date"
                  locale="pt"
                  @input="updateFormattedDate"
                  :title="formattedDateTitle"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="updatedPeople.email"
                label="E-mail"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="updatedPeople.telephone"
                label="Telefone"
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
                v-model="updatedPeople.gender"
                :items="[
                  { text: 'Masculino', value: 'MALE' },
                  { text: 'Feminino', value: 'FEMALE' },
                ]"
                item-value="value"
                item-text="text"
                label="Sexo"
                outlined
                dense
                hide-details
                style="width: 96.5%"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="updatedPeople.work"
                :items="[
                  { text: 'Sim', value: true },
                  { text: 'Não', value: false },
                ]"
                item-value="value"
                item-text="text"
                label="Trabalha?"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="updatedPeople.education"
                label="Educação"
                class="mr-3"
                outlined
                dense
                hide-details
                style="width: 100%"
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
                v-if="updatedPeople && updatedPeople.address"
                v-model="updatedPeople.address.zip_code"
                label="CEP"
                class="mr-3"
                @blur="fetchAddress"
                v-mask="'#####-###'"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedPeople && updatedPeople.address"
                v-model="updatedPeople.address.street"
                label="Rua"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedPeople && updatedPeople.address"
                v-model="updatedPeople.address.number"
                label="Número"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedPeople && updatedPeople.address"
                v-model="updatedPeople.address.neighborhood"
                label="Bairro"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedPeople && updatedPeople.address"
                v-model="updatedPeople.address.complement"
                label="Complemento"
                class="mr-3"
                outlined
                dense
                hide-details
                style="width: 100%"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedPeople && updatedPeople.address"
                v-model="cityAndState"
                label="Cidade"
                class="mr-3"
                readonly
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
import API from "@/services/module/API";
import { states } from "@/assets/state";

export default {
  name: "PeopleEdit",
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
      updatedPeople: {},
      states,
      dateFormatted: "",
      menu1: false,
    };
  },
  computed: {
    formattedDateTitle() {
      const date = new Date(this.updatedPeople.birth_date);
      if (isNaN(date.getTime())) return "";
      const options = { day: "numeric", weekday: "short", month: "long" };
      return date.toLocaleDateString("pt-BR", options);
    },
    cityAndState() {
      const city = this.updatedPeople?.address.city || "";
      const state = this.updatedPeople?.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedPeople = await this.$store.dispatch(
            "people/findById",
            id
          );
          if (this.updatedPeople.birth_date) {
            this.dateFormatted = this.formatDate(this.updatedPeople.birth_date);
          }
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
      };
    },
    closeDialog() {
      this.$emit("input", false);
    },
    updateFormattedDate(date) {
      if (date) {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(
          adjustedDate.getHours() + adjustedDate.getTimezoneOffset() / 60
        );
        this.updatedPeople.birth_date = adjustedDate
          .toISOString()
          .split("T")[0];
        this.dateFormatted = this.formatDate(adjustedDate);
      }
      this.menu1 = false;
    },

    updateBirthDate() {
      this.updatedPeople.birth_date = this.parseDate(this.dateFormatted);
    },

    formatDate(date) {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Intl.DateTimeFormat("pt-BR", options).format(d);
    },

    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return new Date(year, month - 1, day).toISOString().split("T")[0];
    },
    
    async fetchAddress() {
      try {
        const address = await API.cep.getAddressByZipcode(
          this.updatedPeople.address.zip_code
        );
        if (address) {
          this.updatedPeople.address = {
            ...this.updatedPeople.address,
            ...address,
          };
        } else {
          console.error("Endereço não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço pelo CEP:", error);
      }
    },
    async saveChanges() {
      const updateData = {
        id: this.updatedPeople.id,
        payload: {
          name: this.updatedPeople.name,
          birth_date: this.updatedPeople.birth_date,
          gender: this.updatedPeople.gender,
          telephone: this.updatedPeople.telephone.replace(/[^0-9]/g, ""),
          work: this.updatedPeople.work,
          education: this.updatedPeople.education,
          address: {
            zip_code: this.updatedPeople.address.zip_code.replace(
              /[^0-9]/g,
              ""
            ),

            street: this.updatedPeople.address.street,
            number: this.updatedPeople.address.number,
            complement: this.updatedPeople.address.complement,
            neighborhood: this.updatedPeople.address.neighborhood,
            city: this.updatedPeople.address.city,
            state: this.updatedPeople.address.state,
          },
        },
      };

      this.$loading("Carregando...");
      try {
        await this.$store.dispatch("people/update", updateData);
        this.$success("Registro atualizado!");
        this.$emit("close");
        return updateData;
      } catch (error) {
        this.$error("Erro ao atualizar!");
        throw error;
      }
    },
  },
};
</script>
