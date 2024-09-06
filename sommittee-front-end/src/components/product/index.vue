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
            <span>{{ item.type }}</span>
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
          :dialog="editDialog"
          :id="updatedProductId"
          @close="editDialog = false"
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
          <span class="headline">Detalhes do produto</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn> 
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct"
                v-model="selectedProduct.name"
                label="Produto"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct"
                v-model="selectedProduct.description"
                label="Descrição"
                class="mr-3"
                disabled
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
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="16">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do doador:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct && selectedProduct.donor"
                v-model="selectedProduct.donor.name"
                label="Nome completo"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct && selectedProduct.donor"
                v-model="selectedProduct.donor.cpf"
                label="CPF"
                v-mask="'###-###-###-##'"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct && selectedProduct.donor"
                v-model="selectedProduct.donor.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="selectedProduct && selectedProduct.donor"
                v-model="selectedProduct.donor.contact"
                label="Contato"
                v-mask="'(##) #####-####'"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-if="selectedProduct && selectedProduct.donor"
                v-model="selectedProduct.donor.type_donor"
                :items="[
                  { value: 'INTERNAL', text: 'Interno' },
                  { value: 'EXTERNAL', text: 'Externo' },
                ]"
                item-value="value"
                item-text="text"
                label="Tipo"
                disabled
              />
            </v-col>
          </v-row>
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
import { formatDate } from '@/filters'
import ProductEdit from './ProductEdit.vue'
import ProductCreate from './ProductCreate.vue'
import ProductDelete from './ProductDelete.vue'
import ProductSearch from './ProductSearch.vue'
import ProductRefresh from './ProductRefresh.vue'

export default {
  name: 'index',
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
        { text: 'Data criação', value: 'created_at' },
        { text: 'Produto', value: 'name' },
        { text: 'Descrição', value: 'description' },
        { text: 'Categoria', value: 'type' },
        { text: 'Ações', value: 'actions' },
      ],
      formatDate,
    }
  },
  computed: {
    product() {
      return this.$store.state.product.product
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        await this.findAll()
      } catch (error) {
        this.$error('Erro ao carregar dados!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      await this.$store.dispatch('product/findAll')
    },
    async handleSearch(search) {
      this.search = search
    },
    showDetails(item) {
      this.selectedProduct = item
      this.dialog = true
    },
    editItem(item) {
      this.updatedProductId = item.id
      this.editDialog = true
    },
    async saveUpdatedProduct(updatedProduct) {
      try {
        const response = await this.$store.dispatch(
          'product/update',
          updatedProduct
        )
        this.loadData()
        this.editDialog = false
        return response
      } catch (error) {
        this.$error('Erro ao atualizar registro!')
        throw error
      }
    },
    async createdProduct(newProduct) {
      try {
        await this.$store.dispatch('product/create', newProduct)
        this.$success('Registro criado!')
        this.loadData()
        this.createDialog = false
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    isSelected(item) {
      return this.updatedProductId === item.id
    },
    closeDialog() {
      this.dialog = false
    },
    confirmDelete(item) {
      this.itemToDelete = item.id
      this.deleteDialog = true
    },
    handleDeleteClose() {
      this.deleteDialog = false
      this.itemToDelete = null
    },
  },
}
</script>
