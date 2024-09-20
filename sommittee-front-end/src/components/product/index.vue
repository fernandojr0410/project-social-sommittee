<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <ProductSearch @search="handleSearch" />
          <ProductRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="product"
          :items-per-page="10"
          no-data-text="Nenhum produto encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.description`]="{ item }">
            <span>{{ item.description }}</span>
          </template>

          <template v-slot:[`item.type`]="{ item }">
            <span>{{ item.type | productCategory }}</span>
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
        <ProductEdit
          v-model="editDialog"
          :id="updatedProductId"
          @save="saveUpdatedProduct"
        />

        <ProductDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do registro</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto:
              </span>
            </div>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedProduct"
                  v-model="selectedProduct.name"
                  label="Produto"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedProduct"
                  v-model="selectedProduct.description"
                  label="Descrição"
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
                  v-if="selectedProduct"
                  v-model="selectedProduct.type"
                  label="Categoria"
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
    <ProductCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdProduct"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/filters";
import ProductEdit from "./ProductEdit.vue";
import ProductCreate from "./ProductCreate.vue";
import ProductDelete from "./ProductDelete.vue";
import ProductSearch from "./ProductSearch.vue";
import ProductRefresh from "./ProductRefresh.vue";

export default {
  name: "index",
  components: {
    ProductEdit,
    ProductCreate,
    ProductDelete,
    ProductSearch,
    ProductRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedProduct: null,
      editDialog: false,
      updatedProductId: null,
      createDialog: false,
      deleteDialog: false,
      itemToDelete: null,
      headers: [
        { text: "Data criação", value: "created_at" },
        { text: "Produto", value: "name" },
        { text: "Descrição", value: "description" },
        { text: "Categoria", value: "type" },
        { text: "Ações", value: "actions" },
      ],
      formatDate,
    };
  },
  computed: {
    product() {
      return this.$store.state.product.product;
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
      await this.$store.dispatch("product/findAll");
    },
    async handleSearch(search) {
      this.search = search;
    },
    showDetails(item) {
      this.selectedProduct = item;
      this.dialog = true;
    },
    editItem(item) {
      this.updatedProductId = item.id;
      this.editDialog = true;
    },
    async saveUpdatedProduct(updatedProduct) {
      try {
        const response = await this.$store.dispatch(
          "product/update",
          updatedProduct
        );
        this.loadData();
        this.editDialog = false;
        return response;
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        throw error;
      }
    },
    async createdProduct(newProduct) {
      try {
        await this.$store.dispatch("product/create", newProduct);
        this.$success("Registro criado!");
        this.loadData();
        this.createDialog = false;
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },
    isSelected(item) {
      return this.updatedProductId === item.id;
    },
    closeDialog() {
      this.dialog = false;
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
