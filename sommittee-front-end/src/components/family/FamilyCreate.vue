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
                    v-if="selectedPeople"
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
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações da pessoa:
                </span>
              </div>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="selectedPeople.name"
                    label="Nome completo"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="selectedPeople.identifier"
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
                    v-model="selectedPeople.birth_date"
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
                    v-model="selectedPeople.email"
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
                    v-model="selectedPeople.telephone"
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
                    v-model="selectedPeople.gender"
                    :items="[
                      { text: 'Masculino', value: 'MALE' },
                      { text: 'Feminino', value: 'FEMALE' },
                    ]"
                    item-value="value"
                    item-text="text"
                    class="mr-3"
                    label="Sexo"
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                    v-model="selectedPeople.work"
                    :items="[
                      { text: 'Sim', value: true },
                      { text: 'Não', value: false },
                    ]"
                    item-value="value"
                    item-text="text"
                    class="mr-3"
                    label="Trabalha?"
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="selectedPeople.education"
                    label="Educação"
                    class="mr-3"
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
              </v-row>
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
                    v-model="selectedPeople.address.city"
                    label="Cidade"
                    class="mr-3"
                    readonly
                    outlined
                    dense
                    hide-details
                  />
                </v-col>
                <v-col>
                  <v-select
                    v-if="selectedPeople && selectedPeople.address"
                    v-model="selectedPeople.address.state"
                    :items="states"
                    item-value="acronym"
                    item-text="name"
                    class="mr-3"
                    label="Estado"
                    readonly
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
      loading: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
      states,
    };
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

    async createFamily() {
      const familyData = {
        address_id: this.selectedPeople?.address_id,
        people_id: this.selectedPeople?.id,
        people_family: this.selectedPeople.people_family,
        function: this.selectedFunction,
      };

      try {
        const response = await this.$store.dispatch(
          "family/create",
          familyData
        );
        if (response) {
          this.$success("Registro criado!");
          this.$store.dispatch("family/findAll");
          this.closeDialog();
          this.selectedFunction = "";
          this.selectedPeople = this.getPeople();
          return response;
        } else {
          this.$error("Erro ao criar a família!");
        }
      } catch (error) {
        this.$error("Erro ao criar registro!");
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
