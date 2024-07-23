<template>
  <v-container fluid color="">
    <v-card>
      <v-card-text>
        <AddressSearch @search="handleSearch" />
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="filteredAddress"
          :items-per-page="10"
          no-data-text="Nenhum endereço encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
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
            <v-icon color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <AddressEdit
          :dialog="editDialog"
          :id="updatedAddressId"
          @close="editDialog = false"
          @save="saveUpdatedAddress"
        />
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do endereço</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group v-if="selectedAddress">
              <v-list-item
                v-for="(value, key) in filteredSelectedAddress"
                :key="key"
              >
                <v-list-item-content>
                  <v-list-item-title style="font-weight: bold">
                    {{ translateKey(key) }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="font-size: 16px" color="primary">
                    {{
                      key === 'created_at' || key === 'updated_at'
                        ? formatDate(value)
                        : value
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <AddressCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdAddress"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/filters'
import AddressEdit from './AddressEdit.vue'
import AddressCreate from './AddressCreate.vue'
import AddressSearch from './AddressSearch.vue'

export default {
  name: 'index',
  components: { AddressEdit, AddressCreate, AddressSearch },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedAddress: null,
      createDialog: false,
      editDialog: false,
      updatedAddressId: null,
      search: '',
      headers: [
        { text: 'CEP', value: 'zip_code' },
        { text: 'Rua', value: 'street' },
        { text: 'Número', value: 'number' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'Cidade', value: 'city' },
        { text: 'Estado', value: 'state' },
        { text: 'Ações', value: 'actions' },
      ],
    }
  },
  computed: {
    address() {
      return this.$store.state.address.address
    },
    filteredAddress() {
      return this.$store.getters['address/filteredAddress'] || []
    },
    filteredSelectedAddress() {
      if (!this.selectedAddress) return {}
      const { id, user_id, user, ...rest } = this.selectedAddress
      return {
        ...rest,
        user_name: user ? user.name : 'Não disponível',
        user_surname: user ? user.surname : 'Não disponível',
        user_email: user ? user.email : 'Não disponível',
      }
    },
  },

  created() {
    this.loadData()
  },
  methods: {
    formatDate,
    async loadData() {
      this.loading = true
      try {
        await this.findAll()
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        this.loading = false
      }
    },
    async findAll() {
      await this.$store.dispatch('address/findAll')
    },
    async fetchAddresses() {
      this.loading = true
      try {
        await this.$store.dispatch('address/filter', {
          category: this.$store.state.address.searchCategory,
          search: this.$store.state.address.searchTerm,
        })
      } catch (error) {
        console.error('Erro ao buscar endereços:', error)
      } finally {
        this.loading = false
      }
    },
    async handleSearch(search) {
      this.search = search
    },
    showDetails(item) {
      this.selectedAddress = item
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.selectedAddress = null
    },
    editItem(item) {
      this.updatedAddressId = item.id
      this.editDialog = true
    },
    ...mapActions('address', ['update', 'create']),
    async saveUpdatedAddress(updatedAddress) {
      await this.update(updatedAddress)
      await this.fetchAddresses()
    },
    async createdAddress(createAddress) {
      await this.$store.dispatch('address/create', createAddress)
      await this.loadData()
      await this.fetchAddresses()
      this.createDialog = false
    },
    translateKey(key) {
      const translations = {
        zip_code: 'CEP',
        street: 'Rua',
        number: 'Número',
        neighborhood: 'Bairro',
        complement: 'Complemento',
        city: 'Cidade',
        state: 'Estado',
        created_at: 'Data de criação',
        updated_at: 'Data de atualização',
        user_id: 'usuario',
        user_name: 'Nome colaborador(a)',
        user_surname: 'Sobrenome colaborador(a)',
        user_email: 'E-mail colaborador(a)',
      }
      return translations[key] || key
    },
    isSelected(item) {
      return this.selectedAddress === item
    },
  },
}
</script>
