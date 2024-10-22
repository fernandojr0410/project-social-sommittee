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
                    @change="updateAddressFields"
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
                      <v-list-item-title v-if="person.name">
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
                    v-model="addressFields.zip_code"
                    class="mr-3"
                    label="CEP"
                    v-mask="'#####-###'"
                    outlined
                    dense
                    hide-details
                    :readonly="!!selectedPeople.address"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="addressFields.street"
                    label="Rua"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                    :readonly="!!selectedPeople.address"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressFields.number"
                    label="Número"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                    :readonly="!!selectedPeople.address"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="addressFields.neighborhood"
                    label="Bairro"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                    :readonly="!!selectedPeople.address"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressFields.complement"
                    label="Complemento"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                    :readonly="!!selectedPeople.address"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="cityAndState"
                    label="Cidade"
                    outlined
                    dense
                    hide-details
                    readonly
                    style="width: 98.5%"
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
      addressFields: {
        zip_code: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
      },
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  computed: {
    cityAndState() {
      const city =
        this.selectedPeople.address?.city || this.addressFields.city || "";
      const state =
        this.selectedPeople.address?.state || this.addressFields.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.clearAddressFields();
      this.selectedPeople = {};
      this.selectedFunction = "";
    },
    closeDialog() {
      this.dialog = false;
    },

    async fetchPeople(search = "") {
      this.loading = true;
      try {
        const response = await this.$store.dispatch("people/findAll", {
          search,
        });
        this.peopleList = response;
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    addPersonToFamily() {
      if (this.selectedPeople && this.selectedFunction) {
        const person = {
          people_id: String(this.selectedPeople.id),
          name: this.selectedPeople.name,
          identifier: this.selectedPeople.identifier,
          email: this.selectedPeople.email,
          birth_date: this.selectedPeople.birth_date,
          gender: this.selectedPeople.gender,
          telephone: this.selectedPeople.telephone,
          education: this.selectedPeople.education,
          work: this.selectedPeople.work,
          address_id: this.selectedPeople.address_id,
          address: {
            zip_code: this.selectedPeople.address.zip_code || "",
            street: this.selectedPeople.address.street || "",
            number: this.selectedPeople.address.number || "",
            complement: this.selectedPeople.address.complement || "",
            neighborhood: this.selectedPeople.address.neighborhood || "",
            city: this.selectedPeople.address.city || "",
            state: this.selectedPeople.address.state || "",
          },
          function: this.selectedFunction,
        };

        const existingPerson = this.familyMembers.find(
          (member) => member.people_id === person.people_id
        );

        if (!existingPerson) {
          this.familyMembers.push(person);
        } else {
          this.$error("Essa pessoa já foi adicionada à família.");
        }

        this.selectedFunction = null;
        this.selectedPeople = {};
        this.peopleList = [];
      }
    },

    clearAddressFields() {
      this.addressFields = {
        zip_code: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      };
    },

    updateAddressFields() {
      if (this.selectedPeople && this.selectedPeople.address) {
        this.addressFields = {
          zip_code: this.selectedPeople.address.zip_code || "",
          street: this.selectedPeople.address.street || "",
          number: this.selectedPeople.address.number || "",
          complement: this.selectedPeople.address.complement || "",
          neighborhood: this.selectedPeople.address.neighborhood || "",
          city: this.selectedPeople.address.city || "",
          state: this.selectedPeople.address.state || "",
        };
      } else {
        this.clearAddressFields();
      }
    },

    removePerson(index) {
      this.familyMembers.splice(index, 1);
    },

    async createFamily() {
      if (!this.familyMembers.length) {
        this.$error("Adicione pelo menos uma pessoa à família.");
        return;
      }

      const familyData = {
        members: this.familyMembers.map((person) => ({
          people_id: String(person.people_id),
          address_id: String(person.address_id),
          address: {
            zip_code: person.address.zip_code,
            street: person.address.street,
            number: person.address.number,
            complement: person.address.complement,
            neighborhood: person.address.neighborhood,
            city: person.address.city,
            state: person.address.state,
          },
          people: {
            name: person.name,
            identifier: person.identifier,
            email: person.email,
            birth_date: person.birth_date,
            gender: person.gender,
            telephone: person.telephone,
            education: person.education,
            work: person.work,
          },
          people_family: {
            function: person.function,
          },
        })),
      };

      try {
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
          this.selectedPeople = {};
        } else {
          this.$error("Erro ao criar a família!");
        }
      } catch (error) {
        this.$error("Erro ao criar a família!");
        throw error;
      }
    },

    searchPeople(search) {
      this.peopleList = [];

      if (search) {
        this.fetchPeople(search);
      }
    },
  },
};
</script>
