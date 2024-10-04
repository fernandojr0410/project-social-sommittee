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
                outlined
                dense
                hide-details
                @update:search-input="searchPeople"
              />
            </v-col>

            <v-col>
              <v-select
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

            <v-col>
              <v-btn
                @click="addPersonToFamily"
                color="green"
                style="color: white; font-weight: bold; margin-right: 16px"
                >Adicionar Pessoa</v-btn
              >
            </v-col>
          </v-row>
        </v-card>

        <v-card class="elevation" style="margin-top: 30px; padding: 16px">
          <div style="padding-bottom: 16px">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Pessoas adicionadas à família:
            </span>
          </div>

          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(person, index) in familyMembers"
                :key="index"
                class="elevation-2 mb-2"
                style="border: 1px solid #ccc; padding: 10px"
                :ripple="false"
                dense
                inactive
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Nome:</strong> {{ person.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <strong>Função:</strong>
                    {{ person.function | functionFamily }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removePerson(index)" icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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
                v-if="updatedFamily.address"
                v-model="updatedFamily.address.zip_code"
                label="CEP"
                v-mask="'#####-###'"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedFamily.address"
                v-model="updatedFamily.address.street"
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
                v-if="updatedFamily.address"
                v-model="updatedFamily.address.number"
                label="Número"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="updatedFamily.address"
                v-model="updatedFamily.address.neighborhood"
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
                v-if="updatedFamily.address"
                v-model="updatedFamily.address.complement"
                label="Complemento"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedFamily.address"
                v-model="cityAndState"
                label="Cidade"
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
      familyMembers: [],
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

          if (
            this.updatedFamily.people_family &&
            this.updatedFamily.people_family.length > 0
          ) {
            this.familyMembers = this.updatedFamily.people_family.map(
              (personFamily) => {
                const person = this.updatedFamily.people;
                return {
                  name: person?.name,
                  function: personFamily.function,
                  address: { ...this.updatedFamily.address },
                };
              }
            );
          } else {
            this.familyMembers = [];
          }

          this.selectedFunction =
            this.updatedFamily.people_family?.[0]?.function || "";
        }
      },
    },
  },

  computed: {
    cityAndState() {
      const city = this.updatedFamily.address?.city || "";
      const state = this.updatedFamily.address?.state || "";
      return city && state ? `${city}, ${state}` : city || state;
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

    addPersonToFamily() {
      if (this.updatedFamily && this.selectedFunction) {
        const person = this.updatedFamily.people;
        this.familyMembers.push({
          id: person.id,
          name: person?.name || "Nome não definido",
          function: this.selectedFunction,
          address: this.updatedFamily.address,
        });

        this.familyMembers = [...this.familyMembers];

        this.selectedFunction = null;
      }
    },

    removePerson(index) {
      this.familyMembers.splice(index, 1);
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
