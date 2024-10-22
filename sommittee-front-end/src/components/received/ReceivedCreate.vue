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
          <v-card style="padding: 16px">
            <v-row>
              <v-col>
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações do recebimento:
                </span>
              </v-col>
            </v-row>
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
                      label="Data recebimento"
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
                    v-model="createdReceived.date"
                    locale="pt"
                    @input="updateFormattedDate"
                    :title="formattedDateTitle"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="selectedUser"
                  :items="userListFormatted"
                  item-text="name"
                  item-value="id"
                  label="Nome do responsável pelo recebimento"
                  :loading="loading"
                  :rules="[rules.required]"
                  return-object
                  outlined
                  dense
                  hide-details
                  @update:search-input="searchUser"
                >
                  <template v-slot:item="{ item }">
                    <div class="caption d-flex flex-column">
                      <span class="grey--text">
                        Nome: {{ item.name }} | CPF:
                        {{ formatCPF(item.identifier) }}
                      </span>
                    </div>
                  </template>

                  <template v-slot:selection="{ item }">
                    <span class="caption">
                      {{ item.name }}
                    </span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-select
                  v-if="createdReceived"
                  v-model="createdReceived.condition_product"
                  :items="[
                    { text: 'Novo', value: 'NEW' },
                    { text: 'Usado', value: 'USED' },
                    { text: 'Danificado', value: 'DAMAGED' },
                  ]"
                  label="Condição do produto"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-if="createdReceived"
                  v-model="createdReceived.description"
                  label="Descrição (opcional)"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>

          <v-card style="padding: 14px; margin-top: 30px">
            <v-container class="d-flex justify-space-between">
              <div v-if="products.length === 0">
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
                      Informações do produto:
                    </span>
                  </v-col>
                </v-row>
                <v-list>
                  <v-list-item-group
                    class="d-flex flex-column"
                    style="gap: 16px"
                  >
                    <div
                      v-for="(item, index) in products"
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
          </v-card>

          <v-card style="padding: 14px; margin-top: 30px">
            <v-row>
              <v-col>
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações do doador:
                </span>
              </v-col>
            </v-row>
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
                  @update:search-input="searchDonor"
                  outlined
                  dense
                  hide-details
                  style="width: 97.6%"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdReceived && createdReceived.donor"
                  v-model="createdReceived.donor.name"
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
                  v-if="createdReceived && createdReceived.donor"
                  :value="createdReceived.donor.identifier | cpf"
                  label="CPF"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 95%"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdReceived && createdReceived.donor"
                  :value="createdReceived.donor.telephone | phone"
                  label="Contato"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-select
                  v-if="createdReceived && createdReceived.donor"
                  v-model="createdReceived.donor.type_donor"
                  :items="[
                    { value: 'INTERNAL', text: 'Interno' },
                    { value: 'EXTERNAL', text: 'Externo' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Tipo"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 95%"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdReceived && createdReceived.donor"
                  v-model="createdReceived.donor.email"
                  label="E-mail"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 97.6%"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeProductDialog"
            color="primary"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createReceived"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CRIAR
          </v-btn>

          <SelectedProduct
            :value="productDialog"
            @add-product="addProductToList"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SelectedProduct from "./SelectedProduct.vue";

export default {
  name: "ReceivedCreate",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  components: { SelectedProduct },
  data() {
    return {
      dialog: false,
      productDialog: false,
      createdReceived: this.getReceived(),
      selectedProduct: null,
      selectedDonor: null,
      selectedUser: null,
      userList: [],
      products: [],
      productList: [],
      editingIndex: null,
      donorList: [],
      search: "",
      items: [],
      id: null,
      loading: false,
      dateFormatted: "",
      menu1: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },

  computed: {
    userListFormatted() {
      return this.userList.map((user) => ({
        ...user,
        name: `${user.name}`,
        identifier: user.identifier,
      }));
    },
    formattedDateTitle() {
      const date = new Date(this.createdReceived.date);
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
            const response = await this.$store.dispatch(
              "customers/findById",
              id
            );
            return (this.items = [response]);
          }
        }
      },
    },
    selectedUser(newValue) {
      if (newValue) {
        this.createdReceived.userColaborator = { ...newValue };
      } else {
        this.createdReceived.userColaborator =
          this.getReceived().userColaborator;
      }
    },
    selectedDonor(newValue) {
      if (newValue) {
        this.createdReceived.donor = { ...newValue };
      } else {
        this.createdReceived.donor = this.getReceived().donor;
      }
    },
  },

  methods: {
    getReceived() {
      return {
        date: new Date().toISOString().split("T")[0],
        condition_product: "",
        description: "",
        products: [],
        userColaborator: {},
        stock: {
          amount: "",
        },
        donor: {
          name: "",
          identifier: "",
          email: "",
          telephone: "",
          type_donor: "",
        },
      };
    },
    openProductDialog() {
      this.productDialog = true;
    },
    closeProductDialog() {
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.createdReceived = this.getReceived();
      this.selectedProduct = [];
      this.selectedDonor = null;
      this.selectedUser = null;
      this.dateFormatted = this.formatDate(new Date());
      this.products = [];
    },
    updateFormattedDate(date) {
      if (date) {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(
          adjustedDate.getHours() + adjustedDate.getTimezoneOffset() / 60
        );
        this.createdReceived.date = adjustedDate.toISOString().split("T")[0];
        this.dateFormatted = this.formatDate(adjustedDate);
      }
      this.menu1 = false;
    },

    updateBirthDate() {
      this.createdReceived.date = this.parseDate(this.dateFormatted);
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

    formatCPF(identifier) {
      if (!identifier) return "";
      return identifier.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },

    addProductToList(product) {
      if (this.editingIndex !== null) {
        this.products.splice(this.editingIndex, 1, product);
        this.editingIndex = null;
      } else {
        this.products.push(product);
      }
      this.productDialog = false;
    },

    editProduct(index) {
      if (this.products && this.products[index]) {
        this.selectedProduct = this.products[index];
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

    async findAll(search, type) {
      if (type === "donor") {
        const responseDonor = await this.$store.dispatch("donor/findAll", {
          search,
        });
        return responseDonor;
      } else if (type === "user") {
        const responseUser = await this.$store.dispatch(
          "userColaborator/findAll",
          {
            search,
          }
        );

        return responseUser;
      }
    },

    async fetchUser(search = "") {
      this.userList = [];
      try {
        const response = await this.findAll(search, "user");

        if (response && Array.isArray(response)) {
          this.userList = response;
        } else if (
          response &&
          response.dataUsers &&
          Array.isArray(response.dataUsers)
        ) {
          this.userList = response.dataUsers;
        }
      } catch (error) {
        this.$error("Erro ao selecionar usuário!");
        throw error;
      }
    },
    async fetchDonor(search = "") {
      this.loading = true;
      try {
        const response = await this.findAll(search, "donor");
        this.donorList = response;
      } catch (error) {
        this.$error("Erro ao carregar doador!");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createReceived() {
      const receivedData = {
        date: this.createdReceived.date,
        condition_product: this.createdReceived.condition_product,
        description: this.createdReceived.description,
        user_id: this.selectedUser.id,
        donor_id: this.selectedDonor.id,
        donor: {
          name: this.createdReceived.donor.name,
          identifier: this.createdReceived.donor.identifier,
          email: this.createdReceived.donor.email,
          telephone: this.createdReceived.donor.telephone,
          type_donor: this.createdReceived.donor.type_donor,
        },

        products: this.products.map((item) => ({
          product_id: item.product.id,
          type: item.product.type,
          amount: item.amount,
        })),
      };

      try {
        const response = await this.$store.dispatch(
          "received/create",
          receivedData
        );

        if (response) {
          this.$success("Registro criado!");
          this.$store.dispatch("received/findAll");
          this.createdReceived = this.getReceived();
          this.selectedProduct = [];
          this.selectedDonor = null;
          this.selectedUser = null;
          this.dateFormatted = this.formatDate(new Date());
          this.closeDialog();
        } else {
          this.$error("Erro ao criar recebimento!");
        }
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },
    async searchUser(search) {
      if (search) {
        this.fetchUser(search);
      } else {
        this.userList = [];
      }
    },

    async searchDonor(search) {
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
