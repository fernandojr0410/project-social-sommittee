<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <DonationSearch @search="handleSearch" />
          <DonationRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="donation"
          no-data-text="Nenhuma doação encontrada"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.state`]="{ item }">
            <span>{{ item.state | stateDonation }}</span>
          </template>

          <template v-slot:[`item.date_delivery`]="{ item }">
            <span>{{ dateDelivery(item.date_delivery) }}</span>
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <span>{{ item.people.name }}</span>
          </template>

          <template v-slot:[`item.identifier`]="{ item }">
            <span>{{ item.people.identifier | cpf }}</span>
          </template>

          <template v-slot:[`item.telephone`]="{ item }">
            <span>{{ item.people.telephone | phone }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              :color="isSelected(item) ? 'primary' : ''"
              @click="showDetails(item)"
              >mdi-eye</v-icon
            >

            <v-icon class="mr-2" color="blue" @click="editItem(item)"
              >mdi-pencil</v-icon
            >

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
        <DonationEdit
          v-model="editDialog"
          :id="updatedDonationId"
          @save="saveUpdatedDonation"
        />
        <DonationDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes da doação</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações da doação:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedDonation"
                  v-model="selectedDonation.date_delivery"
                  type="date"
                  label="Data entrega"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedDonation"
                  :value="selectedDonation.state | stateDonation"
                  label="Status"
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
                <v-textarea
                  v-if="selectedDonation"
                  v-model="selectedDonation.observation"
                  label="Observação (opcional)"
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
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações da pessoa:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.name"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.people.identifier | cpf"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.people.birth_date"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.gender"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.people.telephone | phone"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.work"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.email"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.education"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.people.address.zip_code | cep"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.address.street"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.address.number"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.address.neighborhood"
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
                  v-if="selectedDonation"
                  v-model="selectedDonation.people.address.complement"
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
                  v-if="selectedDonation"
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
                      v-for="item in donation_products"
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
                          {{ item.product.id }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.product.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.product.description }} (Quantidade:
                          {{ item.amount }})
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-container>
            </v-container>
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações do doador:</span
              >
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedDonation"
                  v-model="selectedDonation.donor.name"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.donor.identifier | cpf"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.donor.telephone | phone"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.donor.type_donor | typeDonor"
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
                  v-if="selectedDonation"
                  :value="selectedDonation.donor.email"
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
      </v-card>
    </v-dialog>
    <DonationCreate
      :value="createDialog"
      @close="createDialog = false"
      @save="createdDonation"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/filters";
import DonationCreate from "./DonationCreate.vue";
import DonationEdit from "./DonationEdit.vue";
import DonationDelete from "./DonationDelete.vue";
import DonationSearch from "./DonationSearch.vue";
import DonationRefresh from "./DonationRefresh.vue";

export default {
  name: "index",
  components: {
    DonationCreate,
    DonationEdit,
    DonationDelete,
    DonationSearch,
    DonationRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedDonation: null,
      createDialog: false,
      editDialog: false,
      updatedDonationId: null,
      deleteDialog: false,
      itemToDelete: null,
      search: "",
      donation_products: [],
      headers: [
        { text: "Data criação", value: "created_at" },
        { text: "Responsável família", value: "name" },
        { text: "Telefone responsável", value: "telephone" },
        { text: "Estado", value: "state" },
        { text: "Data entrega", value: "date_delivery" },
        { text: "Ações", value: "actions" },
      ],
      formatDate,
      dateFormatted: "",
    };
  },
  computed: {
    donation() {
      return this.$store.state.donation.donation;
    },
    cityAndState() {
      const city = this.selectedDonation.people.address.city || "";
      const state = this.selectedDonation.people.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    dateDelivery(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    },
    async loadData() {
      this.loading = true;
      try {
        await this.findAll();
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async findAll() {
      const response = await this.$store.dispatch("donation/findAll");
      console.log("response", response);
    },
    async handleSearch(search) {
      this.search = search;
    },
    showDetails(item) {
      this.selectedDonation = item;
      this.dialog = true;
    },
    editItem(item) {
      this.updatedDonationId = item.id;
      this.editDialog = true;
    },
    async createdDonation(newDonation) {
      try {
        await this.$store.dispatch("donation/create", newDonation);
        this.$success("Registro criado!");
        this.loadData();
        this.createDialog = false;
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },

    async saveUpdatedDonation(updatedDonation) {
      try {
        const response = await this.$store.dispatch(
          "donation/update",
          updatedDonation
        );
        console.log("updatedDonation", response);
        this.loadData();
        this.editDialog = false;
        return response;
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },

    closeDialog() {
      this.dialog = false;
    },
    isSelected(item) {
      return this.updatedDonationId === item.id;
    },
    confirmDelete(item) {
      this.itemToDelete = item.id;
      this.deleteDialog = false;
      this.$nextTick(() => {
        this.deleteDialog = true;
      });
    },
    handleDeleteClose() {
      this.deleteDialog = false;
      this.itemToDelete = null;
    },
  },
};
</script>
