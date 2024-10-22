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
                      label="Data de entrega"
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
                    v-model="createdDonation.date_delivery"
                    locale="pt"
                    @input="updateFormattedDate"
                    :title="formattedDateTitle"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
                  v-model="createdDonation.people.gender"
                  :items="[
                    { text: 'Masculino', value: 'MALE' },
                    { text: 'Feminino', value: 'FEMALE' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Gênero"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation && createdDonation.people"
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
                  v-if="createdDonation?.people?.address"
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
                  v-if="createdDonation?.people?.address"
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
                  v-if="createdDonation?.people?.address"
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
                  v-if="createdDonation?.people?.address"
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
                  v-if="createdDonation?.people?.address"
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
                  v-if="createdDonation?.people?.address"
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
                  <v-list-item-group
                    class="d-flex flex-column"
                    style="gap: 16px"
                  >
                    <div
                      v-for="(item, index) in donation_products"
                      :key="item.id"
                      class="d-flex"
                      style="
                        padding: 6px;
                        border-radius: 2px;
                        border: 1px gray solid;
                      "
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
                      <v-list-item-action :disabled="false">
                        <v-btn
                          icon
                          color="blue"
                          @click.stop="editProduct(index)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          color="red"
                          @click.stop="removeProduct(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </div>
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
                  v-if="createdDonation && createdDonation.donor"
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
                  v-if="createdDonation && createdDonation.donor"
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
                  v-if="createdDonation && createdDonation.donor"
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
                  v-if="createdDonation && createdDonation.donor"
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
                  v-if="createdDonation && createdDonation.donor"
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
      createdDonation: {},
      search: "",
      peopleList: [],
      productList: [],
      donorList: [],
      donation_products: [],
      editingIndex: null,
      items: [],
      id: null,
      dateFormatted: "",
      menu1: false,
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
    formattedDateTitle() {
      const date = new Date(this.createdDonation.date_delivery);
      if (isNaN(date.getTime())) return "";
      const options = { day: "numeric", weekday: "short", month: "long" };
      return date.toLocaleDateString("pt-BR", options);
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
    getDonation() {
      return {
        date_delivery: new Date().toISOString().split("T")[0],
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
      this.createdDonation = this.getDonation();
    },
    closeDialog() {
      this.dialog = false;
    },

    updateFormattedDate(date) {
      if (date) {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(
          adjustedDate.getHours() + adjustedDate.getTimezoneOffset() / 60
        );
        this.createdDonation.date_delivery = adjustedDate
          .toISOString()
          .split("T")[0];
        this.dateFormatted = this.formatDate(adjustedDate);
      }
      this.menu1 = false;
    },

    updateBirthDate() {
      this.createdDonation.date_delivery = this.parseDate(this.dateFormatted);
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
        const response = await this.findAll(search, "people");
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

    async findAll(search, type) {
      if (type === "people") {
        return await this.$store.dispatch("people/findAll", {
          search,
        });
      } else if (type === "product") {
        return await this.$store.dispatch("product/findAll", {
          search,
        });
      } else if (type === "donor") {
        return await this.$store.dispatch("donor/findAll", {
          search,
        });
      }
    },

    async createDonation() {
      const productsArray = Array.isArray(this.donation_products)
        ? this.donation_products
        : [];

      const donationData = {
        date_delivery: this.createdDonation.date_delivery,
        state: this.createdDonation.state,
        observation: this.createdDonation.observation || "",
        donor_id: this.selectedDonor?.id,
        people_id: this.selectedPeople?.id,
        products: productsArray.map((product) => ({
          product_id: product.product.id,
          amount: Number(product.amount),
        })),
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
          this.createdDonation = response;
          this.selectedPeople = "";
          this.donation_products = [];
          this.selectedDonor = "";
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
      if (search) {
        this.fetchPeople(search);
      } else {
        this.peopleList = [];
      }
    },
    searchProduct(search) {
      if (search) {
        this.fetchProduct(search);
      } else {
        this.productList = [];
      }
    },
    searchDonor(search) {
      if (search) {
        this.fetchDonor(search);
      } else {
        this.donorList = [];
      }
    },
  },
  mounted() {
    const today = new Date();
    this.dateFormatted = this.formatDate(today);
  },
};
</script>
