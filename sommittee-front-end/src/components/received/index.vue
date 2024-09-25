<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div class="d-flex items-center">
          <ReceivedSearch @search="handleSearch" />
          <ReceivedRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="received"
          :items-per-page="10"
          no-data-text="Nenhum recebimento encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <span>{{ item.donor.name }}</span>
          </template>

          <template v-slot:[`item.telephone`]="{ item }">
            <span>{{ item.donor.telephone | phone }}</span>
          </template>

          <template v-slot:[`item.type_donor`]="{ item }">
            <span>{{ item.donor.type_donor | typeDonor }}</span>
          </template>

          <template v-slot:[`item.type`]="{ item }">
            <span>{{ item.products[0].product.type | productCategory }}</span>
          </template>

          <template v-slot:[`item.condition_product`]="{ item }">
            <span>{{ item.condition_product | conditionProduct }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              :color="isSelected(item) ? 'primary' : ''"
              @click="showDetails(item)"
            >
              mdi-eye
            </v-icon>

            <v-icon class="mr-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <ReceivedEdit
          v-model="editDialog"
          :id="updatedReceivedId"
          @save="saveUpdatedReceived"
        />

        <ReceivedDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do recebimento</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 20px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do recebimento:
              </span>
            </div>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedReceived"
                  :value="formatDate(selectedReceived.date)"
                  label="Data de recebimento"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedReceived && selectedReceived.user"
                  :value="selectedReceived.user.name"
                  label="Nome do responsável pela recepção"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedReceived"
                  :value="selectedReceived.condition_product | conditionProduct"
                  label="Condição do Produto"
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
                  v-if="selectedReceived"
                  v-model="selectedReceived.description"
                  label="Descrição"
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
            <div style="padding-bottom: 20px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações dos produtos doados:
              </span>
            </div>

            <div
              v-if="selectedReceived && selectedReceived.products.length > 0"
              class="d-flex flex-column"
              style="gap: 16px"
            >
              <v-list-item-group
                v-for="(item, index) in selectedReceived.products"
                :key="index"
                class="d-flex flex-column"
                style="gap: 16px"
              >
                <div
                  class="d-flex"
                  style="
                    padding: 6px;
                    border-radius: 2px;
                    border: 1px gray solid;
                  "
                >
                  <v-list-item-content style="gap: 6px">
                    <v-list-item-title>
                      <span style="font-weight: bold">Produto:</span>
                      {{ item.product.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <span style="font-weight: bold">Categoria:</span>
                      {{ item.product.type | productCategory }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <span style="font-weight: bold">Descrição:</span>
                      {{ item.product.description }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <span style="font-weight: bold">Quantidade estoque:</span>
                      {{ item.amount }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </div>
              </v-list-item-group>
            </div>

            <v-alert v-else type="info">Nenhum produto encontrado.</v-alert>
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 20px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do doador:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedReceived && selectedReceived.donor"
                  v-model="selectedReceived.donor.name"
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
                  v-if="selectedReceived && selectedReceived.donor"
                  :value="selectedReceived.donor.identifier | cpf"
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
                  v-if="selectedReceived && selectedReceived.donor"
                  :value="selectedReceived.donor.telephone | phone"
                  label="Contato"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedReceived && selectedReceived.donor"
                  :value="selectedReceived.donor.type_donor | typeDonor"
                  label="Tipo"
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
                  v-if="selectedReceived && selectedReceived.donor"
                  v-model="selectedReceived.donor.email"
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
    <ReceivedCreate
      :value="createDialog"
      @close="createDialog = false"
      @save="createdReceived"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/filters";
import ReceivedCreate from "./ReceivedCreate.vue";
import ReceivedEdit from "./ReceivedEdit.vue";
import ReceivedDelete from "./ReceivedDelete.vue";
import ReceivedSearch from "./ReceivedSearch.vue";
import ReceivedRefresh from "./ReceivedRefresh.vue";

export default {
  name: "index",
  components: {
    ReceivedCreate,
    ReceivedEdit,
    ReceivedDelete,
    ReceivedSearch,
    ReceivedRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedReceived: null,
      createDialog: false,
      editDialog: false,
      updatedReceivedId: null,
      deleteDialog: false,
      itemToDelete: null,
      headers: [
        { text: "Data criação", value: "created_at" },
        { text: "Nome doador", value: "name" },
        { text: "Contato doador", value: "telephone" },
        { text: "Tipo doador", value: "type_donor" },
        { text: "Tipo doação", value: "type" },
        { text: "Condição", value: "condition_product" },
        { text: "Ações", value: "actions" },
      ],
      formatDate,
    };
  },
  computed: {
    received() {
      return this.$store.state.received.received;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
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
      await this.$store.dispatch("received/findAll");
    },
    async handleSearch(search) {
      this.search = search;
    },
    showDetails(item) {
      this.selectedReceived = item;
      this.dialog = true;
    },
    editItem(item) {
      this.updatedReceivedId = item.id;
      this.editDialog = true;
    },

    async saveUpdatedReceived(updatedReceived) {
      try {
        const response = await this.$store.dispatch(
          "received/update",
          updatedReceived
        );
        this.loadData();
        this.editDialog = false;
        return response;
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        throw error;
      }
    },

    async createdReceived(newReceived) {
      try {
        await this.$store.dispatch("received/create", newReceived);
        this.$success("Registro criado!");
        this.loadData();
        this.createDialog = false;
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    isSelected(item) {
      return this.updatedReceivedId === item.id;
    },
    confirmDelete(item) {
      this.itemToDelete = item.id;
      this.deleteDialog = true;
    },
    handleDeleteClose() {
      this.deleteDialog = false;
      this.itemToDelete = null;
    },
  },
};
</script>
