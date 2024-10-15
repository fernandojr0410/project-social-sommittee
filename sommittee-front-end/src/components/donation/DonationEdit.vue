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
        <v-card>
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
                        v-model="d"
                        label="Data de entrega"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="updateDateDelivery"
                        v-on="on"
                        outlined
                        dense
                        hide-details
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="secondary"
                      v-model="updatedDonation.date_delivery"
                      locale="pt"
                      @input="updateFormattedDate"
                      :title="formattedDateTitle"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-select
                    v-if="updatedDonation"
                    v-model="updatedDonation.state"
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
                    v-if="updatedDonation"
                    v-model="updatedDonation.observation"
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
                    v-if="updatedDonation && updatedDonation.people"
                    v-model="updatedDonation.people.name"
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
                    v-if="updatedDonation && updatedDonation.people"
                    :value="updatedDonation.people.identifier | cpf"
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
                    v-if="updatedDonation && updatedDonation.people"
                    :value="updatedDonation.people.birth_date"
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
                    v-if="updatedDonation && updatedDonation.people"
                    v-model="updatedDonation.people.gender"
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
                    v-if="updatedDonation && updatedDonation.people"
                    :value="updatedDonation.people.telephone | phone"
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
                    v-if="updatedDonation && updatedDonation.people"
                    v-model="updatedDonation.people.work"
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
                    v-if="updatedDonation && updatedDonation.people"
                    v-model="updatedDonation.people.email"
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
                    v-if="updatedDonation && updatedDonation.people"
                    v-model="updatedDonation.people.education"
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
                    v-if="updatedDonation?.people?.address"
                    :value="updatedDonation.people.address.zip_code | cep"
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
                    v-if="updatedDonation?.people?.address"
                    v-model="updatedDonation.people.address.street"
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
                    v-if="updatedDonation?.people?.address"
                    v-model="updatedDonation.people.address.number"
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
                    v-if="updatedDonation?.people?.address"
                    v-model="updatedDonation.people.address.neighborhood"
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
                    v-if="updatedDonation?.people?.address"
                    v-model="updatedDonation.people.address.complement"
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
                    v-if="updatedDonation?.people?.address"
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
                <div v-if="updatedDonation.donation_products.length === 0">
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
                        v-for="(
                          item, index
                        ) in updatedDonation.donation_products"
                        :key="item.product.id"
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
                    v-if="updatedDonation && updatedDonation.donor"
                    v-model="updatedDonation.donor.name"
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
                    v-if="updatedDonation && updatedDonation.donor"
                    :value="updatedDonation.donor.identifier | cpf"
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
                    v-if="updatedDonation && updatedDonation.donor"
                    :value="updatedDonation.donor.telephone | phone"
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
                    v-if="updatedDonation && updatedDonation.donor"
                    :value="updatedDonation.donor.type_donor | typeDonor"
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
                    v-if="updatedDonation && updatedDonation.donor"
                    :value="updatedDonation.donor.email"
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
              style="background-color: #007fff; color: white; font-weight: bold"
            >
              SALVAR ALTERAÇÕES
            </v-btn>
            <SelectedProduct
              v-model="productDialog"
              @add-product="addProductToList"
            />
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import SelectedProduct from "../received/SelectedProduct.vue";

export default {
  name: "DonationEdit",
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
      selectedPeople: null,
      selectedProduct: null,
      selectedDonor: null,
      productDialog: false,
      loading: false,
      dialog: false,
      updatedDonation: this.getDonation(),
      search: "",
      peopleList: [],
      productList: [],
      donorList: [],
      editingIndex: null,
      items: [],
      dateFormatted: "",
      menu1: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  computed: {
    cityAndState() {
      const city = this.updatedDonation.people.address.city || "";
      const state = this.updatedDonation.people.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
    formattedDateTitle() {
      const date = new Date(this.updatedDonation.date_delivery);
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
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedDonation = await this.$store.dispatch(
            "donation/findById",
            id
          );
          this.selectedPeople = this.updatedDonation.people;
          this.selectedProduct = this.updatedDonation.donation_products;
          this.selectedDonor = this.updatedDonation.donor;
          this.dateFormatted = this.formatDate(
            this.updatedDonation.date_delivery
          );
        }
      },
    },
    selectedPeople(newValue) {
      if (newValue) {
        this.updatedDonation.people = { ...newValue };
      } else {
        this.updatedDonation.people = this.getDonation().people;
      }
    },
    selectedProduct(newValue) {
      if (newValue) {
        this.updatedDonation.donation_products.product = { ...newValue };
      } else {
        this.updatedDonation.donation_products.product =
          this.getDonation().donation_products.product;
      }
    },
    selectedDonor(newValue) {
      if (newValue) {
        this.updatedDonation.donor = { ...newValue };
      } else {
        this.updatedDonation.donor = this.getDonation().donor;
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
        donation_products: [],
        donor: {
          name: "",
          identifier: "",
          telephone: "",
          type_donor: "",
        },
      };
    },

    openDialog() {
      this.dialog = true;
      this.updatedDonation = this.getDonation();
    },

    updateFormattedDate(date) {
      if (date) {
        const [year, month, day] = date.split("-");
        const adjustedDate = new Date(Date.UTC(year, month - 1, day));
        this.updatedDonation.date_delivery = adjustedDate
          .toISOString()
          .split("T")[0];
        this.dateFormatted = this.formatDate(adjustedDate);
      }
      this.menu1 = false;
    },
    updateDateDelivery() {
      this.updatedDonation.date_delivery = this.parseDate(this.dateFormatted);
    },

    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return new Date(year, month - 1, day).toISOString().split("T")[0];
    },

    addProductToList(product) {
      if (this.editingIndex !== null) {
        this.updatedDonation.donation_products.splice(
          this.editingIndex,
          1,
          product
        );
        this.editingIndex = null;
      } else {
        this.donation_products.push(product);
      }
      this.productDialog = false;
    },

    editProduct(index) {
      if (
        this.updatedDonation.donation_products &&
        this.updatedDonation.donation_products[index]
      ) {
        this.selectedProduct = this.updatedDonation.donation_products[index];
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
      this.updatedDonation.donation_products.splice(index, 1);
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
        return await this.$store.dispatch("people/findAll", { search });
      } else if (type === "product") {
        return await this.$store.dispatch("product/findAll", { search });
      } else if (type === "donor") {
        return await this.$store.dispatch("donor/findAll", { search });
      }
    },
    async saveChanges() {
      const productsArray = Array.isArray(
        this.updatedDonation.donation_products
      )
        ? this.updatedDonation.donation_products
        : [];

      const updateData = {
        date_delivery: this.updatedDonation?.date_delivery,
        state: this.updatedDonation?.state,
        observation: this.updatedDonation.observation || "",
        donor_id: this.selectedDonor?.id,
        people_id: this.selectedPeople?.id,
        products: productsArray.map((item) => ({
          product_id: item.product?.id,
          amount: Number(item.amount),
        })),
      };
      try {
        const response = await this.$store.dispatch("donation/update", {
          id: this.id,
          payload: updateData,
        });
        if (response) {
          this.$success("Registro atualizado!");
          this.$emit("input", false);
          return response;
        } else {
          this.$error("Erro ao atualizar doação");
        }
      } catch (error) {
        this.$error("Erro ao atualizar registro");
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
};
</script>
