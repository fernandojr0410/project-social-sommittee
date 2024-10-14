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
                v-model="selectedPerson"
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
              >
                Adicionar Pessoa
              </v-btn>
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
                    {{
                      person.people_family && person.people_family.function
                        ? person.people_family.function
                        : "Não definida" | functionFamily
                    }}
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
      selectedPerson: null,
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

          if (!this.updatedFamily.address_id) {
            this.$error("O endereço da família não está definido.");
          }

          if (
            this.updatedFamily.people_family &&
            this.updatedFamily.people_family.length > 0
          ) {
            this.familyMembers = this.updatedFamily.people_family.map(
              (personFamily) => {
                return {
                  people_id: personFamily.people_id || "",
                  name: personFamily.people?.name || "Nome não definido",
                  people_family: {
                    function: personFamily.function || "Não definida",
                  },
                  address: {
                    address_id: this.updatedFamily.address_id || "Not defined",
                    ...this.updatedFamily.address,
                  },
                };
              }
            );
          } else {
            this.familyMembers = [];
          }
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
      const selectedPerson = this.selectedPerson;

      if (!selectedPerson || !selectedPerson.id) {
        this.$error("Selecione uma pessoa válida para adicionar à família.");
        return;
      }

      const addressId = this.updatedFamily?.address_id || null;

      if (!addressId) {
        this.$error("O endereço não está definido para a família.");
        return;
      }

      const existingPerson = this.familyMembers.find(
        (member) => member.people_id === selectedPerson.id
      );

      if (existingPerson) {
        this.$error("Essa pessoa já foi adicionada à família.");
        return;
      }

      this.familyMembers.push({
        people_id: selectedPerson.id,
        address_id: addressId,
        people_family: {
          function: this.selectedFunction || "Função não definida",
        },
        name: selectedPerson.name || "Nome não definido",
        address: this.updatedFamily.address || {},
      });

      this.selectedFunction = null;
      this.selectedPerson = null;
    },

    removePerson(index) {
      const memberToRemove = this.familyMembers[index];
      if (memberToRemove.people_id) {
        if (!this.removedMembers) {
          this.removedMembers = [];
        }
        this.removedMembers.push({ people_id: memberToRemove.people_id });
      }

      this.familyMembers.splice(index, 1);
    },

    async saveChanges() {
      try {
        const familyId = this.id;

        if (this.familyMembers.length === 0) {
          this.$error("Adicione pelo menos um membro à família.");
          return;
        }

        const updateData = {
          members: this.familyMembers.map((member, index) => {
            const addressId =
              member.address_id || this.updatedFamily.address_id;

            if (!addressId) {
              this.$error(`Endereço não definido para o membro ${index + 1}.`);
              throw new Error(`address_id ausente para o membro ${index + 1}`);
            }

            return {
              people_id: member.people_id || "",
              address_id: addressId,
              people_family: {
                function:
                  member.people_family?.function || "Função não definida",
              },
              address: {
                zip_code: member.address?.zip_code || "",
                street: member.address?.street || "",
                number: member.address?.number || "",
                complement: member.address?.complement || "",
                neighborhood: member.address?.neighborhood || "",
                city: member.address?.city || "",
                state: member.address?.state || "",
              },
            };
          }),
          removedMembers: this.removedMembers || [],
        };

        console.log("Payload para atualização", updateData);

        const response = await this.$store.dispatch("family/update", {
          id: familyId,
          payload: updateData,
        });

        if (response) {
          this.$success("Registro atualizado com sucesso!");
          this.$emit("input", false);
        }

        this.selectedFunction = null;
        this.selectedPerson = null;
        this.removedMembers = [];
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        this.$error("Erro ao atualizar o registro!");
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
