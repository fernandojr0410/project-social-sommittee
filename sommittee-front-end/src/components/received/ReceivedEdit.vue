<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: 500; font-size: 16px">
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
                    @blur="updateDate"
                    v-on="on"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="secondary"
                  v-model="updatedReceived.date"
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
                label="Nome do responsável pela recepção..."
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
                  <span class="caption">{{ item.name }}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-select
                v-if="updatedReceived"
                v-model="updatedReceived.condition_product"
                :items="[
                  { text: 'Novo', value: 'NEW' },
                  { text: 'Usado', value: 'USED' },
                  { text: 'Danificado', value: 'DAMAGED' },
                ]"
                label="Condição produto"
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
                v-if="updatedReceived"
                v-model="updatedReceived.description"
                label="Descrição (opcional)"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="elevation-4" style="padding: 14px; margin-top: 30px">
          <v-container class="d-flex justify-space-between">
            <div v-if="products.length === 0">
              <span color="primary" style="font-weight: 500; font-size: 16px">
                Nenhum produto adicionado
              </span>
            </div>
            <v-container v-else>
              <v-row>
                <v-col>
                  <span
                    color="primary"
                    style="font-weight: 500; font-size: 16px"
                  >
                    Informações do produto:
                  </span>
                </v-col>
              </v-row>
              <v-list>
                <v-list-item-group class="d-flex flex-column" style="gap: 16px">
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
                      <v-btn icon color="blue" @click.stop="editProduct(index)">
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

        <v-card class="elevation-4" style="padding: 14px; margin-top: 30px">
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: 500; font-size: 16px">
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
                style="width: 98.5%"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedReceived && updatedReceived.donor"
                v-model="updatedReceived.donor.name"
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
                v-if="updatedReceived && updatedReceived.donor"
                :value="updatedReceived.donor.identifier | cpf"
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
                v-if="updatedReceived && updatedReceived.donor"
                :value="updatedReceived.donor.telephone | phone"
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
                v-if="updatedReceived && updatedReceived.donor"
                v-model="updatedReceived.donor.type_donor"
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
                style="width: 96.5%"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="updatedReceived && updatedReceived.donor"
                v-model="updatedReceived.donor.email"
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
          text
          @click="saveChanges"
          style="
            background-color: #007fff;
            color: white;
            font-weight: bold;
            margin-right: 10px;
          "
        >
          SALVAR ALTERAÇÕES
        </v-btn>

        <SelectedProduct
          v-model="productDialog"
          @add-product="addProductToList"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SelectedProduct from "./SelectedProduct.vue";

export default {
  name: "ReceivedEdit",
  components: { SelectedProduct },
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
      updatedReceived: {},
      productDialog: false,
      selectedProduct: null,
      selectedDonor: null,
      selectedUser: null,
      userList: [],
      products: [],
      productList: [],
      donorList: [],
      editingIndex: null,
      search: "",
      items: [],
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
      const date = new Date(this.updatedReceived.date);
      if (isNaN(date.getTime())) return "";
      const options = { day: "numeric", weekday: "short", month: "long" };
      return date.toLocaleDateString("pt-BR", options);
    },
  },

  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        this.fetchUser();
        this.fetchDonor();
        if (id) {
          this.updatedReceived = await this.$store.dispatch(
            "received/findById",
            id
          );

          if (this.updatedReceived.user) {
            this.selectedUser = {
              ...this.updatedReceived.user,
              id: this.updatedReceived.user_id,
            };
          }

          if (this.updatedReceived.donor) {
            this.selectedDonor = {
              ...this.updatedReceived.donor,
              id: this.updatedReceived.donor_id,
            };
          }

          if (this.updatedReceived.date) {
            this.dateFormatted = this.formatDate(this.updatedReceived.date);
          }

          if (this.updatedReceived.products) {
            this.products = this.updatedReceived.products;
          }
        }
      },
    },
    // search: function (search) {
    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => this.fetchUser(search), 500);
    // }
  },

  methods: {
    getReceived() {
      return {
        date: "",
        condition_product: "",
        description: "",
        products: [],
        user: {},
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
    formatCPF(identifier) {
      if (!identifier) return "";
      return identifier.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },

    updateFormattedDate(date) {
      if (date) {
        const adjustedDate = new Date(date);

        adjustedDate.setHours(
          adjustedDate.getHours() + adjustedDate.getTimezoneOffset() / 60
        );

        this.updatedReceived.date = adjustedDate.toISOString().split("T")[0];

        this.dateFormatted = this.formatDate(adjustedDate);
      }
      this.menu1 = false;
    },

    updateDate() {
      this.updatedReceived.date = this.parseDate(this.dateFormatted);
    },

    formatDate(date) {
      if (date instanceof Date) {
        date = date.toISOString();
      }

      if (typeof date === "string") {
        const [year, month, day] = date.split("T")[0].split("-");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      }

      return "";
    },

    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return new Date(year, month - 1, day).toISOString().split("T")[0];
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
        this.dialog = false;
      }
      this.$emit("update:dialog", false);
    },

    removeProduct(index) {
      this.products.splice(index, 1);
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

    async saveChanges() {
      const updateData = {
        date: this.updatedReceived.date,
        condition_product: this.updatedReceived.condition_product,
        description: this.updatedReceived.description || "",
        user_id: this.selectedUser?.id,
        donor_id: this.selectedDonor?.id,
        donor: {
          name: this.updatedReceived.donor.name,
          identifier: this.updatedReceived.donor.identifier,
          email: this.updatedReceived.donor.email,
          telephone: this.updatedReceived.donor.telephone,
          type_donor: this.updatedReceived.donor.type_donor,
        },
        products: this.products.map((item) => ({
          product_id: item.product.id,
          type: item.product.type,
          amount: Number(item.amount),
        })),
      };
      console.log("updateData", updateData);
      try {
        const response = await this.$store.dispatch("received/update", {
          id: this.id,
          payload: updateData,
        });

        console.log("payload", response);

        if (response) {
          console.log("registro atualizado!", response);
          this.$success("Registro atualizado!");
          this.$emit("input", false);
          this.selectedProduct = "";
          this.selectedDonor = "";
          return response;
        } else {
          this.$error("Erro ao atualizar recebimento!");
        }
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        console.error("Erro ao atualizar", error);
        throw error;
      }
    },
    async searchUser(search) {
      if (search && search.length > 2) {
        this.fetchUser(search);
      } else {
        this.userList = [];
      }
    },
    async searchDonor(search) {
      if (search && search.length > 2) {
        this.fetchDonor(search);
      } else {
        this.donorList = [];
      }
    },
  },
};
</script>
