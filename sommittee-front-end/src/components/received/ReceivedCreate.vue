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
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do recebimento:
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

          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto doado:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="selectedProduct"
                :items="productList"
                item-text="name"
                item-value="id"
                label="Buscar produto..."
                :loading="loading"
                :rules="[rules.required]"
                return-object
                @update:search-input="searchProduct"
              />
            </v-col>
          </v-row>

          <v-list>
            <v-list-item-group v-if="createdReceived.products.length > 0">
              <v-list-item
                v-for="(product, index) in createdReceived.products"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product.name }} - {{ product.type }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ product.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removeProduct(index)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-btn
            @click="addProduct"
            color="green"
            class="mt-4"
            style="color: white; font-weight: bold"
          >
            Adicionar Produto
          </v-btn>

          <v-row>
            <v-col style="padding-top: 50px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do Estoque:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="createdReceived"
                v-model="createdReceived.stock.amount"
                type="number"
                label="Quantidade"
                class="mr-3"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do Doador:
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
                disabled
              />
            </v-col>
            <v-col>
              <v-text-field
                v-if="createdReceived && createdReceived.donor"
                :value="createdReceived.donor.cpf | cpf"
                label="CPF"
                class="mr-3"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="createdReceived && createdReceived.donor"
                :value="createdReceived.donor.contact | phone"
                label="Contato"
                class="mr-3"
                disabled
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
                disabled
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
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ReceivedCreate',
  props: ['value', 'label'],
  data() {
    return {
      dialog: false,
      createdReceived: this.getReceived(),
      selectedProduct: null,
      selectedDonor: null,
      selectedUser: null,
      userList: [],
      productList: [],
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
    selectedProduct(newValue) {
      if (newValue) {
        this.createdReceived.product = { ...newValue }
      } else {
        this.createdReceived.product = this.getReceived().product
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
        value: '',
        description: '',
        products: [],
        user: {
          name: '',
        },
        stock: {
          amount: '',
        },
        donor: {
          name: '',
          cpf: '',
          email: '',
          contact: '',
          type_donor: '',
        },
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },

    formatCPF(cpf) {
      if (!cpf) return ''
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    addProduct() {
      if (this.selectedProduct) {
        this.createdReceived.products.push(this.selectedProduct)
        this.selectedProduct = null
      }
    },
    removeProduct(index) {
      this.createdReceived.products.splice(index, 1)
    },
    async findAll(search, type) {
      if (type === 'product') {
        const responseProduct = await this.$store.dispatch('product/findAll', {
          search,
        })
        return responseProduct
      } else if (type === 'donor') {
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
        this.$success('Usuário selecionado!')
      } catch (error) {
        this.error('Erro ao selecionar doador!')
        throw error
      }
    },

    async fetchProduct(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search, 'product')
        this.productList = response
        this.$success('Produto selecionado!')
      } catch (error) {
        this.$error('Erro ao carregar produto!')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchDonor(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search, 'donor')
        this.donorList = response
        this.$success('Doador selecionado!')
      } catch (error) {
        this.$error('Erro ao carregar doador!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async createReceived() {
      const receivedData = {
        date: this.createdReceived.date,
        condition_product: this.createdReceived.condition_product,
        description: this.createdReceived.description,
        user: {
          name: this.createdReceived.name,
        },
        product: {
          name: this.createdReceived.product.name,
          description: this.createdReceived.product.description,
          type: this.createdReceived.product.type,
        },
        stock: {
          amount: Number(this.createdReceived.stock.amount),
        },
        donor: {
          name: this.createdReceived.donor.name,
          cpf: this.createdReceived.donor.cpf.replace(/[^\d]/g, ''),
          email: this.createdReceived.donor.email,
          contact: this.createdReceived.donor.contact,
          type_donor: this.createdReceived.donor.type_donor,
        },
      }
      try {
        const response = await this.$store.dispatch(
          'received/create',
          receivedData
        )
        console.log('response criado', response)
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
    async searchProduct(search) {
      if (search && search.length > 2) {
        this.fetchProduct(search)
      } else {
        this.productList = []
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
