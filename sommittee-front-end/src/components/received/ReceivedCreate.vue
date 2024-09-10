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
        <v-card-title>Criar recebimento</v-card-title>
        <v-card-text>
          <v-card style="padding: 16px">
            <v-row>
              <v-col>
                <span color="primary" style="font-weight: 500; font-size: 16px">
                  Recebimento
                </span>
              </v-col>
            </v-row>
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
                      v-model="date"
                      label="Data recebimento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="secondary"
                    v-model="date"
                    locale="pt"
                    @input="menu2 = false"
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
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-if="createdReceived"
                  v-model="createdReceived.description"
                  label="Descrição"
                  class="mr-3"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
          </v-card>

          <v-card style="padding: 14px; margin-top: 30px">
            <v-row>
              <v-col>
                <span color="primary" style="font-weight: 500; font-size: 16px">
                  Doador
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
                />
              </v-col>
            </v-row>
          </v-card>

          <v-card style="padding: 14px; margin-top: 30px">
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
                      Produto
                    </span>
                  </v-col>
                </v-row>
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(product, index) in products"
                      :key="product.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ product.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ product.description }} (Quantidade:
                          {{ product.amount }})
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
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeProductDialog"
            color="primary"
            style="color: white; font-weight: bold"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createReceived"
            style="color: white; font-weight: bold"
          >
            CRIAR
          </v-btn>

          <SelectedProduct
            :dialog.sync="productDialog"
            @add-product="addProductToList"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SelectedProduct from './SelectedProduct.vue'

export default {
  name: 'ReceivedCreate',
  props: ['value', 'label'],
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
      conditionOptions: [
        { text: 'Novo', value: 'NEW' },
        { text: 'Usado', value: 'USED' },
        { text: 'Danificado', value: 'DAMAGED' },
      ],
      donorList: [],
      search: '',
      items: [],
      id: null,
      loading: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  computed: {
    userListFormatted() {
      return this.userList.map((user) => ({
        ...user,
        name: `${user.name}`,
        identifier: user.identifier,
      }))
    },
  },

  watch: {
    search: function (search) {
      clearTimeout(this.debounce)
      if (search) {
        this.debounce = setTimeout(() => {
          this.doSearch()
        }, 500)
      } else {
        this.items = []
      }
    },
    value: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          if (id && typeof id === 'string') {
            const response = await this.$store.dispatch(
              'customers/findById',
              id
            )
            return (this.items = [response])
          }
        }
      },
    },
    selectedUser(newValue) {
      if (newValue) {
        this.createdReceived.user = { ...newValue }
      } else {
        this.createdReceived.user = this.getReceived().user
      }
    },
    selectedDonor(newValue) {
      if (newValue) {
        this.createdReceived.donor = { ...newValue }
      } else {
        this.createdReceived.donor = this.getReceived().donor
      }
    },
  },

  methods: {
    getReceived() {
      return {
        date: '',
        condition_product: '',
        description: '',
        products: [],
        user: {},
        stock: {
          amount: '',
        },
        donor: {
          name: '',
          identifier: '',
          email: '',
          telephone: '',
          type_donor: '',
        },
      }
    },
    openProductDialog() {
      this.productDialog = true
    },
    closeProductDialog() {
      this.dialog = false
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },

    formatCPF(identifier) {
      if (!identifier) return ''
      return identifier.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },

    addProductToList(product) {
      console.log('Product to add:', product)

      if (this.editingIndex !== null) {
        this.products.splice(this.editingIndex, 1, product)
        this.editingIndex = null
      } else {
        this.products.push(product)
      }
    },

    editProduct(index) {
      if (this.products && this.products[index]) {
        this.selectedProduct = this.products[index]
        this.productDialog = true
        this.editingIndex = index
      }
    },

    addProduct() {
      if (this.selectedProduct) {
        console.log('this.selectedProduct', this.selectedProduct)
        this.$emit('add-product', this.selectedProduct)
        this.selectedProduct = null
      }
      this.$emit('update:dialog', false)
    },

    removeProduct(index) {
      this.products.splice(index, 1)
      this.$success('Produto removido!')
    },

    async findAll(search, type) {
      if (type === 'donor') {
        const responseDonor = await this.$store.dispatch('donor/findAll', {
          search,
        })
        return responseDonor
      } else if (type === 'user') {
        const responseUser = await this.$store.dispatch('user/findAll', {
          search,
        })
        console.log('responseUser', responseUser)
        return responseUser
      }
    },

    async fetchUser(search = '') {
      this.userList = []
      try {
        const response = await this.findAll(search, 'user')
        if (
          response &&
          response.dataUsers &&
          Array.isArray(response.dataUsers)
        ) {
          this.userList = response.dataUsers
        }
      } catch (error) {
        this.error('Erro ao selecionar doador!')
        throw error
      }
    },

    async fetchDonor(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search, 'donor')
        this.donorList = response
      } catch (error) {
        this.$error('Erro ao carregar doador!')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createReceived() {
      const receivedData = {
        date: this.date,
        condition_product: this.createdReceived.condition_product,
        description: this.createdReceived.description,
        user_id: this.selectedUser?.id,
        donor_id: this.selectedDonor?.id,
        products: this.products.map((product) => ({
          product_id: product.id,
          type: product.type,
          amount: product.amount,
        })),
        donor: {
          name: this.createdReceived.donor.name,
          identifier: this.createdReceived.donor.identifier,
          email: this.createdReceived.donor.email,
          telephone: this.createdReceived.donor.telephone,
          type_donor: this.createdReceived.donor.type_donor,
        },
      }

      console.log('receivedData', receivedData)

      try {
        const response = await this.$store.dispatch(
          'received/create',
          receivedData
        )

        if (response) {
          this.$success('Registro criado!')
          this.selectedProduct = ''
          this.selectedDonor = ''
          this.closeDialog()
          this.createdReceived = this.getReceived()
        } else {
          this.$error('Erro ao criar recebimento!')
        }
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    async searchUser(search) {
      if (search && search.length > 2) {
        this.fetchUser(search)
      } else {
        this.userList = []
      }
    },

    async searchDonor(search) {
      if (search && search.length > 2) {
        this.fetchDonor(search)
      } else {
        this.donorList = []
      }
    },
  },
}
</script>
