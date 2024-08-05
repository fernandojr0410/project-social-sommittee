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
          <v-col cols="16" md="10">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações da pessoa:
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="updatedPeople.name"
              label="Nome completo"
              class="mr-3"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.cpf"
              label="CPF"
              class="mr-3"
              disabled
              v-mask="'###.###.###-##'"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.birth_date"
              type="date"
              label="Data de nascimento"
              :max="today"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.email"
              label="E-mail"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.telephone"
              label="Telefone"
              v-mask="'(##) #####-####'"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="updatedPeople.gender"
              :items="[
                { text: 'Masculino', value: 'MALE' },
                { text: 'Feminino', value: 'FEMALE' },
              ]"
              item-value="value"
              item-text="text"
              label="Sexo"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="updatedPeople.work"
              :items="[
                { text: 'Sim', value: true },
                { text: 'Não', value: false },
              ]"
              item-value="value"
              item-text="text"
              label="Trabalha?"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="updatedPeople.education"
              label="Educação"
              class="mr-3"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="16" md="10">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do endereço:
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.zip_code"
              label="CEP"
              class="mr-3"
              @blur="fetchAddress"
              v-mask="'#####-###'"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.street"
              label="Rua"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.number"
              label="Número"
              class="mr-3"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.neighborhood"
              label="Bairro"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.complement"
              label="Complemento"
              class="mr-3"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.city"
              label="Cidade"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.state"
              :items="states"
              item-value="acronym"
              item-text="name"
              label="Selecione o estado"
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
import API from '@/services/module/API'
import { states } from '@/assets/state'

export default {
  name: 'PeopleEdit',
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
      updatedPeople: {
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
      },
      states,
      today: new Date().toISOString().substr(0, 10),
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedPeople = await this.$store.dispatch('people/findById', id)
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    async fetchAddress() {
      try {
        const address = await API.cep.getAddressByZipcode(
          this.updatedPeople.address.zip_code
        )

        console.log('Endereço recebido:', address)
        if (address) {
          this.updatedPeople.address = {
            ...this.updatedPeople.address,
            ...address,
          }
        } else {
          console.error('Endereço não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar endereço pelo CEP:', error)
      }
    },
    async saveChanges() {
      const updateData = {
        id: this.updatedPeople.id,
        payload: {
          name: this.updatedPeople.name,
          birth_date: this.updatedPeople.birth_date,
          gender: this.updatedPeople.gender,
          telephone: this.updatedPeople.telephone.replace(/[^0-9]/g, ''),
          work: this.updatedPeople.work,
          education: this.updatedPeople.education,
          address: {
            zip_code: this.updatedPeople.address.zip_code.replace(/[ˆ0-9]/g),
            street: this.updatedPeople.address.street,
            number: this.updatedPeople.address.number,
            complement: this.updatedPeople.address.complement,
            neighborhood: this.updatedPeople.address.neighborhood,
            city: this.updatedPeople.address.city,
            state: this.updatedPeople.address.state,
          },
        },
      }

      console.log('UpdateData', updateData)
      console.log('Gender antes de salvar:', this.updatedPeople.gender)
      this.$loading('Carregando...')
      try {
        console.log('antes', updateData)
        await this.$store.dispatch('people/update', updateData)
        console.log('depois', updateData)
        this.$success('Alterações salvas!')
        this.$emit('close')
        return updateData
      } catch (error) {
        this.$error('Erro ao atualizar!')
        throw error
      }
    },
  },
}
</script>
