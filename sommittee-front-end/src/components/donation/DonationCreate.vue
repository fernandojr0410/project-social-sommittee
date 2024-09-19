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
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações da doação</span
              >
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4">
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
                      v-model="formattedDate"
                      label="Data entrega"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="secondary"
                    v-model="createdDonation.date_delivery"
                    locale="pt"
                    @input="updateDate"
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
                  v-model="createdDonation.observation"
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
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
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
                  return-object
                  outlined
                  dense
                  hide-details
                  @update:search-input="searchPeople"
                  style="width: 98%"
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

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações do endereço:</span
              >
            </div>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonation && createdDonation.people.address"
                  :value="createdDonation.people.address.zip_code | cep"
                  label="CEP"
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
                  v-model="createdDonation.people.address.street"
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
                  v-if="createdDonation"
                  v-model="createdDonation.people.address.number"
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
                  v-if="createdDonation"
                  v-model="createdDonation.people.address.neighborhood"
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
                  v-if="createdDonation"
                  v-model="createdDonation.people.address.complement"
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
                  v-if="createdDonation"
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

          <v-card style="padding: 14px; margin-top: 30px">
            <v-container class="d-flex justify-space-between">
              <div v-if="donation_products.length === 0">
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Nenhum produto adicionado
                </span>
              </div>
              <v-container v-else>
                <v-row>
                  <v-col>
                    <span
                      color="primary"
                      style="font-weight: bold; font-size: 16px"
                    >
                      Produto
                    </span>
                  </v-col>
                </v-row>
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, index) in donation_products"
                      :key="item.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.product.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.product.description }} (Quantidade:
                          {{ item.amount }})
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="editProduct(index)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="removeProduct(index)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-container>
              <v-btn
                color="green"
                @click="openProductDialog"
                style="color: white; font-weight: bold"
              >
                ADICIONAR
              </v-btn>
            </v-container>
            <SelectedProduct
              :value="productDialog"
              @add-product="addProductToList"
            />
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações do doador:</span
              >
            </div>

            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="selectedDonor"
                  :items="donorList"
                  item-text="name"
                  item-value="id"
                  label="Buscar doador..."
                  :loading="loading"
                  :rules="[rules.required]"
                  return-object
                  outlined
                  dense
                  hide-details
                  @update:search-input="searchDonor"
                  style="width: 98%"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonation"
                  v-model="createdDonation.donor.name"
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
                  :value="createdDonation.donor.identifier | cpf"
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
                  :value="createdDonation.donor.telephone | phone"
                  label="Telefone"
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
                  :value="createdDonation.donor.type_donor | typeDonor"
                  label="Tipo doador"
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
                  :value="createdDonation.donor.email"
                  label="E-mail"
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
import SelectedProduct from "../received/SelectedProduct.vue";

export default {
  name: "DonationCreate",
  components: { SelectedProduct },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedPeople: null,
      selectedProduct: null,
      selectedDonor: null,
      productDialog: false,
      loading: false,
      dialog: false,
      createdDonation: this.getDonation(),
      search: "",
      peopleList: [],
      productList: [],
      donorList: [],
      donation_products: [],
      editingIndex: null,
      items: [],
      id: null,
      menu2: false,
      formattedDate: "",
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  computed: {
    cityAndState() {
      const city = this.createdDonation.people.address.city || "";
      const state = this.createdDonation.people.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
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
        this.createdDonation.people = this.getDonation().people;
      }
    },
    selectedProduct(newValue) {
      if (newValue) {
        this.createdDonation.donation_products.product = { ...newValue };
      } else {
        this.createdDonation.donation_products.product =
          this.getDonation().donation_products.product;
      }
    },
    selectedDonor(newValue) {
      if (newValue) {
        this.createdDonation.donor = { ...newValue };
      } else {
        this.createdDonation.donor = this.getDonation().donor;
      }
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const year = d.getUTCFullYear();
      return `${day}/${month}/${year}`;
    },
    updateDate() {
      this.formattedDate = this.formatDate(this.createdDonation.date_delivery);
      this.menu2 = false;
    },

    getDonation() {
      return {
        date_delivery: new Date().toISOString(),
        state: "",
        observation: "",
        people: {
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
        },
        amount: "",

        donation_products: [
          {
            product: {
              name: "",
              description: "",
              type: "",
            },
            amount: "",
          },
        ],
        donor: {
          name: "",
          identifier: "",
          telephone: "",
          type_donor: "",
        },
      };
    },
    openProductDialog() {
      this.productDialog = true;
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },

    addProductToList(product) {
      if (this.editingIndex !== null) {
        this.donation_products.splice(this.editingIndex, 1, product);
        this.editingIndex = null;
      } else {
        this.donation_products.push(product);
      }
      this.productDialog = false;
    },

    editProduct(index) {
      if (this.donation_products && this.donation_products[index]) {
        this.selectedProduct = this.donation_products[index];
        this.productDialog = true;
        this.editingIndex = index;
      }
    },

    addProduct() {
      if (this.selectedProduct) {
        this.$emit("add-product", this.selectedProduct);
        this.selectedProduct = null;
      }
      this.$emit("update:dialog", false);
    },

    removeProduct(index) {
      this.donation_products.splice(index, 1);
      this.$success("Produto removido!");
    },

    async fetchPeople(search = "") {
      this.loading = true;
      try {
        const response = await this.findAll2(search);
        this.peopleList = response;
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(search = "") {
      this.loading = true;
      try {
        const response = await this.findAll(search, "product");
        this.productList = response;
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchDonor(search = "") {
      this.loading = true;
      try {
        const response = await this.findAll(search, "donor");
        this.donorList = response;
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async findAll2(search) {
      return await this.$store.dispatch("people/findAll", { search });
    },
    async findAll(search, type) {
      if (type === "people") {
        return await this.$store.dispatch("people/findAll", {
          search,
        });
      } else if (type === "product") {
        const responseProduct = await this.$store.dispatch("product/findAll", {
          search,
        });
        return responseProduct;
      } else if (type === "donor") {
        const responseDonor = await this.$store.dispatch("donor/findAll", {
          search,
        });
        return responseDonor;
      }
    },

    async createDonation() {
      console.log(this.createdDonation);

      const donationData = {
        description: this.createdDonation.description,
        state: this.createdDonation.state,
        observation: this.createdDonation.observation,
        date_delivery: this.createdDonation.date_delivery,
        donor_id: this.selectedDonor?.id,
        people_id: this.selectedPeople?.id,
        family_id: this.selectedFamily?.id,
        products: this.createdDonation.donation_products.map((item) => ({
          product_id: item.product?.id,
          amount: Number(item.amount),
        })),
      };

      console.log("donationData", donationData);
      try {
        const response = await this.$store.dispatch(
          "donation/create",
          donationData
        );
        if (response) {
          this.$success("Registro criado!");
          this.$store.dispatch("donation/findAll");
          this.closeDialog();
          this.selectedPeople = this.getDonation();
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
    searchProduct(search) {
      if (search && search.length > 2) {
        this.fetchProduct(search);
      } else {
        this.productList = [];
      }
    },
    searchDonor(search) {
      if (search && search.length > 2) {
        this.fetchDonor(search);
      } else {
        this.donorList = [];
      }
    },
  },
  mounted() {
    this.formattedDate = this.formatDate(this.createdDonation.date_delivery);
  },
};
</script>
