<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar informações</span>
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
          <v-col>
            <v-text-field
              v-model="updatedProduct.name"
              label="Produto"
              class="mr-3"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updatedProduct.type"
              label="Categoria"
              class="mr-3"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="updatedProduct.description"
              label="Descrição"
              class="mr-3"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
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
              @change="onDonorChange"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="updatedProduct.donor.name"
              label="Nome completo"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="updatedProduct.donor.cpf"
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
              v-model="updatedProduct.donor.email"
              label="E-mail"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="updatedProduct.donor.contact"
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
              v-model="updatedProduct.donor.type_donor"
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
  name: 'ProductEdit',
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
      updatedProduct: this.getProduct(),
      selectedDonor: null,
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
          this.updatedProduct = await this.$store.dispatch(
            'product/findById',
            id
          )
          this.selectedDonor = this.updatedProduct.donor || null
        }
      },
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
    closeDialog() {
      this.$emit('close')
    },
    async fetchDonor(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search)
        this.donorList = response.filter((donor) =>
          donor.name.toLowerCase().includes(search.toLowerCase())
        )
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
    async saveChanges() {
      try {
        const productId = this.id
        const updateData = {
          id: productId,
          payload: {
            name: this.updatedProduct.name,
            type: this.updatedProduct.type,
            description: this.updatedProduct.description,
            donor_id: this.selectedDonor ? this.selectedDonor.id : null,
          },
        }
        const response = await this.$store.dispatch(
          'product/update',
          updateData
        )
        this.$success('Registro atualizado!')
        this.updatedProduct = this.getProduct()
        this.selectedDonor = null
        this.closeDialog()
        return response
      } catch (error) {
        throw error
      }
    },
    onDonorChange(donor) {
      this.selectedDonor = donor
      this.updatedProduct.donor = donor || {
        name: '',
        cpf: '',
        email: '',
        contact: '',
        type_donor: '',
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
