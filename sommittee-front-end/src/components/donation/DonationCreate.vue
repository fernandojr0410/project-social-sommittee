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
        <v-card-title>Cadastrar registro</v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span style="font-weight: bold; font-size: 16px"
                >Informações da doação</span
              >
            </div>
            <v-row>
              <v-col>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date_delivery"
                      label="Data entrega"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      hide-details
                    />
                  </template>
                  <v-date-picker
                    color="secondary"
                    v-model="date_delivery"
                    locale="pt"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-select
                  v-if="createdDonation"
                  v-model="createdDonation.state"
                  :items="[
                    { text: 'Pendente', value: 'PENDING' },
                    { text: 'Confirmado', value: 'CONFIRMED' },
                    { text: 'Em Trânsito', value: 'IN_TRANSIT' },
                    { text: 'Cancelado', value: 'CANCELED' },
                    { text: 'Entregue', value: 'DELIVERED' },
                    { text: 'Processando', value: 'PROCESSING' },
                    { text: 'Aprovado', value: 'APPROVED' },
                    { text: 'Rejeitado', value: 'REJECTED' },
                    { text: 'Em Revisão', value: 'UNDER_REVIEW' },
                  ]"
                  item-text="text"
                  item-value="value"
                  label="Status"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea
                  v-if="createdDonation"
                  v-model="createdDonation.description"
                  label="Observação (opcional)"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <v-row>
              <v-col>
                <span color="primary" style="font-weight: 500; font-size: 16px">
                  Informações da pessoa:
                </span>
              </v-col>
            </v-row>
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
                  style="width: 98%;"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonation"
                  v-model="createdDonation.people.name"
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
                  v-if="createdDonation"
                  :value="createdDonation.people.identifier | cpf"
                  label="CPF"
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
                  v-if="createdDonation"
                  :value="createdDonation.people.birth_date"
                  type="date"
                  label="Data de nascimento"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-select
                  v-if="createdDonation"
                  v-model="createdDonation.people.gender"
                  :items="[
                    { text: 'Masculino', value: 'MALE' },
                    { text: 'Feminino', value: 'FEMALE' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Data de nascimento"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide_details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonation"
                  :value="createdDonation.people.telephone | phone"
                  label="Telefone"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-select
                  v-if="createdDonation"
                  v-model="createdDonation.people.work"
                  :items="[
                    { text: 'Sim', value: true },
                    { text: 'Não', value: false },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Trabalha?"
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
                  v-if="createdDonation"
                  v-model="createdDonation.people.email"
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
                  v-if="createdDonation"
                  v-model="createdDonation.people.education"
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
            @click="createDonation"
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
  name: "DonationCreate",
  data() {
    return {
      selectedPeople: null,
      loading: false,
      dialog: false,
      createdDonation: this.getPeople(),
      search: "",
      peopleList: [],
      items: [],
      id: null,
      date_delivery: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  watch: {
    search: function (search) {
      clearTimeout(this.debounce);
      if (search) {
        this.debounce = setTimeout(() => {
          this.doSearch();
        }, 500);
      } else {
        this.items = [];
      }
    },
    value: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          if (id && typeof id === "string") {
            const response = await this.$store.dispatch("people/findById", id);
            return (this.items = [response]);
          }
        }
      },
    },
    selectedPeople(newValue) {
      if (newValue) {
        this.createdDonation.people = { ...newValue };
      } else {
        this.createdDonation.people = this.getPeople().people;
      }
    },
  },
  methods: {
    getPeople() {
      return {
        people: {
          name: "",
          identifier: "",
          birth_date: "",
          email: "",
          telephone: "",
          gender: "",
          work: "",
          education: "",
        },
        address: {
          zip_code: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
        },
        donor: {
          name: "",
          identifier: "",
          telephone: "",
          type_donor: "",
        },
        product: {
          name: "",
          description: "",
          type: "",
        },
      };
    },
    openDialog() {
      this.dialog = true;
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
    async createDonation() {
      const donationData = {
        people_id: this.selectedPeople?.id,
      };
      try {
        const response = await this.$store.dispatch(
          "donation/create",
          donationData
        );
        if (response) {
          this.$success("Registro criado!");
          this.$store.dispatch("donation/findAll");
          this.closeDialog();
          this.selectedPeople = this.getPeople();
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
