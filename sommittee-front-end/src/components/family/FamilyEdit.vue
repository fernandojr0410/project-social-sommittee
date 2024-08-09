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
          <v-col>
            <v-autocomplete
              v-model="updatedFamily"
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
              v-if="updatedFamily"
              v-model="selectedFunction"
              label="Função - Mãe, Pai, Filho(a), Vó..."
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações da pessoa:
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="updatedFamily.name"
              label="Nome completo"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="updatedFamily.cpf"
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
              v-model="updatedFamily.birth_date"
              type="date"
              label="Data de nascimento"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="updatedFamily.email"
              label="E-mail"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="updatedFamily.telephone"
              label="Telefone"
              class="mr-3"
              v-mask="'(##) #####-####'"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="updatedFamily.gender"
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
              v-model="updatedFamily.work"
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
              v-model="updatedFamily.education"
              label="Educação"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do endereço:
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.zip_code"
              class="mr-3"
              label="CEP"
              v-mask="'#####-###'"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.street"
              label="Rua"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.number"
              label="Número"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.complement"
              label="Complemento"
              class="mr-3"
              disabled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.neighborhood"
              label="Bairro"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.city"
              label="Cidade"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-if="updatedFamily && updatedFamily.address"
              v-model="updatedFamily.address.state"
              :items="states"
              item-value="acronym"
              item-text="name"
              class="mr-3"
              label="Estado"
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
import { states } from '@/assets/state'

export default {
  name: 'FamilyEdit',
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
      updatedFamily: this.getPeople(),
      peopleList: [],
      selectedFunction: '',
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
      states,
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedFamily = await this.$store.dispatch('family/findById', id)
        }
      },
    },
  },
  methods: {
    getPeople() {
      return {
        id: '',
        name: '',
        cpf: '',
        email: '',
        birth_date: '',
        gender: '',
        telephone: '',
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
        people_family: [],
      }
    },
    closeDialog() {
      this.$emit('close')
    },
    async fetchPeople(search = '') {
      this.loading = true
      try {
        const response = await this.findAll(search)
        this.peopleList = response
      } catch (error) {
        this.$error('Erro ao carregar dados:', error)
      } finally {
        this.loading = false
      }
    },
    async findAll(search) {
      const response = await this.$store.dispatch('people/findAll', { search })
      return response
    },

    // async saveChanges() {
    //   console.log('people_id:', this.updatedFamily.id)
    //   console.log('address_id:', this.updatedFamily.address_id)
    //   console.log('selectedFunction:', this.selectedFunction)

    //   try {
    //     // Certifique-se de que o ID da família está correto
    //     const familyId = this.id // Usando a prop id para obter o ID da família

    //     const updateData = {
    //       // O ID da família deve ser passado na URL do endpoint
    //       id: familyId,
    //       payload: {
    //         // Usar o ID da pessoa se necessário, mas confirmar se é o campo certo
    //         people_id: this.updatedFamily.people_id, // Verifique se está corretamente atribuído
    //         address_id: this.updatedFamily.address_id,
    //         people_family: {
    //           function: this.selectedFunction, // Verifique se esta função é parte do payload esperado
    //         },
    //       },
    //     }

    //     console.log('updateData', updateData)

    //     // Dispatch action to Vuex store to perform the update
    //     await this.$store.dispatch('family/update', updateData)
    //     this.$success('Dados atualizados com sucesso!')
    //     this.closeDialog()
    //   } catch (error) {
    //     console.error('Erro ao atualizar família', error)
    //     this.$error('Erro ao salvar dados.')
    //   }
    // },
    async saveChanges() {
      console.log('people_id:', this.updatedFamily.id)
      console.log('address_id:', this.updatedFamily.address_id)
      console.log('selectedFunction:', this.selectedFunction)
      try {
        const familyId = this.id
        const updateData = {
          id: familyId,
          payload: {
            people_id: this.updatedFamily.id,
            address_id: this.updatedFamily.address_id,
            function: this.selectedFunction,
          },
        }

        console.log('updateData', updateData)
        const responseStore = await this.$store.dispatch(
          'family/update',
          updateData
        )
        console.log('responseStore', responseStore)
        this.$success('Dados atualizados com sucesso!')
        this.closeDialog()
      } catch (error) {
        console.error('Erro ao atualizar família:', error)
        this.$error('Erro ao salvar dados.')
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
