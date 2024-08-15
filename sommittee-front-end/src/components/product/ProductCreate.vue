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
        <v-card-title>Criar produto</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto:
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="createdProduct.name"
                label="Produto"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="createdProduct.type"
                label="Categoria"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="createdProduct.description"
                label="Descrição"
                class="mr-3"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span color="primary" style="font-weight: bold; font-size: 16px">
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
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-if="createdProduct"
                v-model="createdProduct.donor.name"
                label="Nome completo"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="createdProduct"
                v-model="createdProduct.donor.cpf"
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
                v-model="createdProduct.donor.email"
                label="E-mail"
                class="mr-3"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="createdProduct.donor.contact"
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
                v-model="createdProduct.donor.type_donor"
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
            @click="createProduct"
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
  name: 'ProductCreate',
  data() {
    return {
      dialog: false,
      createdProduct: this.getProduct(),
      selectedDonor: null,
      donorList: [],
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  watch: {
    selectedDonor(newValue) {
      if (newValue) {
        this.createdProduct.donor = { ...newValue }
      } else {
        this.createdProduct.donor = this.getProduct().donor
      }
    },
  },
  methods: {
    getProduct() {
      return {
        name: '',
        type: '',
        description: '',
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
    async fetchDonor(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search)
        this.donorList = response
      } catch (error) {
        this.$error('Erro ao carregar dados!')
        throw error
      } finally {
        this.loading = false
      }
    },
    async findAll(search) {
      return await this.$store.dispatch('donor/findAll', { search })
    },
    async createProduct() {
      const productData = {
        name: this.createdProduct.name,
        type: this.createdProduct.type,
        description: this.createdProduct.description,
        donor: {
          name: this.createdProduct.donor.name,
          cpf: this.createdProduct.donor.cpf.replace(/[^\d]/g, ''),
          email: this.createdProduct.donor.email,
          contact: this.createdProduct.donor.contact,
          type_donor: this.createdProduct.donor.type_donor,
        },
      }
      console.log('Product Data:', productData)

      try {
        const response = await this.$store.dispatch(
          'product/create',
          productData
        )
        console.log('Response:', response)
        if (response) {
          this.$success('Registro criado!')
          this.$store.dispatch('product/findAll')
          this.selectedDonor = ''
          this.closeDialog()
          this.selectedDonor = this.getProduct()
        } else {
          this.$error('Erro ao criar produto!')
        }
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
    searchDonor(search) {
      if (search && search.length > 2) {
        this.fetchDonor(search)
      } else {
        this.donorList = []
      }
    },
  },
}
</script>
