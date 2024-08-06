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
        <v-card-title>Criar família</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="selectedPeople"
                  :items="peopleList"
                  item-text="name"
                  item-value="id"
                  label="Buscar pessoa..."
                  :loading="loading"
                  :rules="[rules.required]"
                  return-object
                  @update:search-input="searchPeople"
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-if="selectedPeople"
                  v-model="selectedFunction"
                  label="Função - Mãe, Pai, Filho(a), Vó..."
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações da pessoa:
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedPeople.name"
                  label="Nome completo"
                  class="mr-3"
                  disabled
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedPeople.cpf"
                  label="CPF"
                  class="mr-3"
                  v-mask="'###.###.###-##'"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedPeople.birth_date"
                  type="date"
                  label="Data de nascimento"
                  class="mr-3"
                  disabled
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedPeople.email"
                  label="E-mail"
                  class="mr-3"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedPeople.telephone"
                  label="Telefone"
                  class="mr-3"
                  v-mask="'(##) #####-####'"
                  disabled
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="selectedPeople.gender"
                  :items="[
                    { text: 'Masculino', value: 'MALE' },
                    { text: 'Feminino', value: 'FEMALE' },
                  ]"
                  item-value="value"
                  item-text="text"
                  class="mr-3"
                  label="Sexo"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="selectedPeople.work"
                  :items="[
                    { text: 'Sim', value: true },
                    { text: 'Não', value: false },
                  ]"
                  item-value="value"
                  item-text="text"
                  class="mr-3"
                  label="Trabalha?"
                  disabled
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="selectedPeople.education"
                  label="Educação"
                  class="mr-3"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <span
                  color="primary"
                  style="font-weight: bold; font-size: 16px"
                >
                  Informações do endereço:
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.zip_code"
                  class="mr-3"
                  label="CEP"
                  v-mask="'#####-###'"
                  disabled
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.street"
                  label="Rua"
                  class="mr-3"
                  disabled
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.number"
                  label="Número"
                  class="mr-3"
                  disabled
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.complement"
                  label="Complemento"
                  class="mr-3"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.neighborhood"
                  label="Bairro"
                  class="mr-3"
                  disabled
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.city"
                  label="Cidade"
                  class="mr-3"
                  disabled
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-if="selectedPeople && selectedPeople.address"
                  v-model="selectedPeople.address.state"
                  :items="states"
                  item-value="acronym"
                  item-text="name"
                  class="mr-3"
                  label="Estado"
                  disabled
                />
              </v-col>
            </v-row>
          </v-form>
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
            @click="createFamily"
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
import { states } from '@/assets/state'

export default {
  name: 'FamilyCreate',
  data() {
    return {
      dialog: false,
      selectedPeople: this.getPeople(),
      selectedFunction: '',
      peopleList: [],
      loading: false,
      valid: false,
      rules: {
        required: (value) => !!value || 'Obrigatório.',
      },
      states,
    }
  },
  methods: {
    getPeople() {
      return {
        name: '',
        cpf: '',
        birth_date: '',
        email: '',
        telephone: '',
        gender: '',
        work: '',
        education: '',
        address: {
          zip_code: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
        people_family: {
          function: '',
        },
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async fetchPeople(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search)

        this.peopleList = response
      } catch (error) {
        this.$error('Erro ao carregar dados')
        throw error
      } finally {
        this.loading = false
      }
    },
    async findAll(search) {
      const response = await this.$store.dispatch('people/findAll', { search })
      return response
    },

    async createFamily() {
      if (this.$refs.form && this.$refs.form.validate()) {
        const familyData = {
          address_id: this.selectedPeople?.address_id,
          people_id: this.selectedPeople?.id,
        }

        const familyResponse = await this.$store.dispatch(
          'family/create',
          familyData
        )

        try {
          familyResponse && familyResponse.id

          const peopleFamilyData = {
            function: this.selectedFunction?.trim(),
            people_id: this.selectedPeople.id,
            family_id: familyResponse.id,
          }

          await this.$store.dispatch('peopleFamily/create', peopleFamilyData)
          this.$success('Registro criado!')
          this.selectedFunction = ''
          this.closeDialog()
          this.selectedPeople = this.getPeople()
        } catch (error) {
          this.$error('Erro ao criar registro!')
          throw error
        }
      }
    },

    searchPeople(search) {
      if (search && search.length > 2) {
        this.fetchPeople(search)
      } else {
        this.peopleList = []
      }
    },
  },
}
</script>
