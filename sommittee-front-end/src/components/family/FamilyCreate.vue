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
        <v-card-title>
          <span class="headline">Cadastrar registro</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-card class="elevation-4" style="padding: 16px">
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="selectedPeople"
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
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Adicionar pessoas à família:
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
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações do endereço:
                </span>
              </div>

              <v-row>
                <v-col>
                  <v-text-field
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.zip_code"
                    class="mr-3"
                    label="CEP"
                    v-mask="'#####-###'"
                    readonly
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.street"
                    label="Rua"
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
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.number"
                    label="Número"
                    class="mr-3"
                    readonly
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.neighborhood"
                    label="Bairro"
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
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.complement"
                    label="Complemento"
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
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="cityAndState"
                    label="Cidade"
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
            color="primary"
            style="color: white; font-weight: bold; margin-right: 16px"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createFamily"
            style="color: white; font-weight: bold; margin-right: 16px"
          >
            CRIAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { states } from "@/assets/state";

export default {
  name: "FamilyCreate",
  data() {
    return {
      dialog: false,
      selectedPeople: {},
      selectedFunction: "",
      peopleList: [],
      familyMembers: [],
      loading: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
      states,
    };
  },
  computed: {
    cityAndState() {
      const city = this.selectedPeople.address.city || "";
      const state = this.selectedPeople.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
  },
  methods: {
    getPeople() {
      return {
        name: "",
        identifier: "",
        birth_date: "",
        email: "",
        telephone: "",
        gender: "",
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
    openDialog() {
      this.dialog = true;
      this.selectedPeople = this.getPeople();
      this.selectedFunction = "";
    },
    closeDialog() {
      this.dialog = false;
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
      if (this.selectedPeople && this.selectedFunction) {
        this.familyMembers.push({
          id: this.selectedPeople.id,
          name: this.selectedPeople.name,
          function: this.selectedFunction,
          address: this.selectedPeople.address,
        });

        this.selectedFunction = null;
      }
    },
    removePerson(index) {
      this.familyMembers.splice(index, 1);
    },

    // async createFamily() {
    //   if (!this.familyMembers.length) {
    //     this.$error("Adicione pelo menos uma pessoa à família.");
    //     return;
    //   }

    //   const familyData = this.familyMembers.map((person) => ({
    //     people_id: person.id,
    //     address_id: this.selectedPeople?.address_id,
    //     function: person.function,
    //   }));

    //   try {
    //     for (const familyMember of familyData) {
    //       const response = await this.$store.dispatch(
    //         "family/create",
    //         familyMember
    //       );
    //       if (response) {
    //         this.$success("Família criada com sucesso!");
    //         this.$store.dispatch("family/findAll");
    //         this.closeDialog();
    //         this.selectedFunction = "";
    //         this.familyMembers = [];
    //         this.selectedPeople = this.getPeople();
    //       } else {
    //         this.$error("Erro ao criar a família!");
    //       }
    //     }
    //   } catch (error) {
    //     this.$error("Erro ao criar a família!");
    //     throw error;
    //   }
    // },
    async createFamily() {
      if (!this.familyMembers.length) {
        this.$error("Adicione pelo menos uma pessoa à família.");
        return;
      }

      // Criação do objeto da família com endereço e dados de pessoas
      const familyData = {
        address_id: this.selectedPeople?.address_id, // ID do endereço associado
        members: this.familyMembers.map((person) => ({
          people_id: person.id,
          function: person.function,
        })),
      };

      try {
        // Criar a família uma vez e associar todos os membros
        const response = await this.$store.dispatch(
          "family/create",
          familyData
        );

        if (response) {
          this.$success("Família criada com sucesso!");
          this.$store.dispatch("family/findAll");
          this.closeDialog();
          this.selectedFunction = "";
          this.familyMembers = [];
          this.selectedPeople = this.getPeople();
        } else {
          this.$error("Erro ao criar a família!");
        }
      } catch (error) {
        this.$error("Erro ao criar a família!");
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
