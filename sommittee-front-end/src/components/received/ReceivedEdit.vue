<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="d-flex justify-space-between items-center">
        <span class="headline">Editar informações</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
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
            <v-text-field
              v-model="updatedReceived.date"
              type="date"
              label="Data de recebimento"
              class="mr-3"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updatedReceived.value"
              label="Valor total"
              class="mr-3"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="updatedReceived.description"
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

        <v-row>
          <v-col>
            <v-text-field
              v-model="updatedReceived.product.name"
              label="Produto"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updatedReceived.product.type"
              label="Categoria"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="updatedReceived.product.description"
              label="Descrição"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do Estoque:
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="updatedReceived.stock.amount"
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
              v-model="updatedReceived.donor.name"
              label="Nome completo"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updatedReceived.donor.identifier"
              label="CPF"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :value="updatedReceived.donor.telephone | phone"
              label="Contato"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col>
            <v-select
              v-model="updatedReceived.donor.type_donor"
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
              v-model="updatedReceived.donor.email"
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
          text
          @click="saveChanges"
          style="background-color: #007fff; color: white; font-weight: bold"
        >
          SALVAR ALTERAÇÕES
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReceivedEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      updatedReceived: this.getReceived(),
      selectedProduct: null,
      selectedDonor: null,
      productList: [],
      donorList: [],
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedReceived = await this.$store.dispatch(
            'received/findById',
            id
          )
        }
      },
    },
    selectedProduct(newValue) {
      if (newValue) {
        this.updatedReceived.product = { ...newValue }
      } else {
        this.updatedReceived.product = this.getReceived().product
      }
    },
    selectedDonor(newValue) {
      if (newValue) {
        this.updatedReceived.donor = { ...newValue }
      } else {
        this.updatedReceived.donor = this.getReceived().donor
      }
    },
  },
  methods: {
    getReceived() {
      return {
        date: '',
        value: '',
        description: '',
        product: {
          name: '',
          description: '',
          type: '',
        },
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
    closeDialog() {
      this.$emit('close')
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
      }
    },

    async fetchProduct(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search, 'product')
        this.productList = response
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
        console.log('data donor', response)
        this.donorList = response
      } catch (error) {
        this.$error('Erro ao carregar doador!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async saveChanges() {
      try {
        const receivedId = this.id
        const updateData = {
          id: receivedId,
          payload: {
            date: this.updatedReceived.date,
            value: this.updatedReceived.value,
            description: this.updatedReceived.description,
            product: {
              name: this.updatedReceived.product.name,
              description: this.updatedReceived.product.description,
              type: this.updatedReceived.product.type,
            },
            stock: {
              amount: Number(this.updatedReceived.stock.amount),
            },
            donor: {
              // id: this.updatedReceived.donor.id,
              name: this.updatedReceived.donor.name,
              identifier: this.updatedReceived.donor.identifier
                ? this.updatedReceived.donor.identifier.replace(/[^\d]/g, '')
                : '',

              email: this.updatedReceived.donor.email,
              telephone: this.updatedReceived.donor.telephone,
              type_donor: this.updatedReceived.donor.type_donor,
            },
          },
        }
        const response = await this.$store.dispatch(
          'received/update',
          updateData
        )
        console.log('registro atualizado!', response)
        if (response) {
          this.$success('Registro atualizado!')
          this.selectedProduct = null
          this.selectedDonor = null
          this.closeDialog()
          this.updatedReceived = this.getReceived()
          return response
        }
      } catch (error) {
        console.error('Erro saveChances', error)
        throw error
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
