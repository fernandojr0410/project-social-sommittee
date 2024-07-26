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
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.name"
              label="Nome"
              class="mr-3"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="updatedPeople.surname" label="Sobrenome" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.cpf"
              label="CPF"
              class="mr-3"
              disabled
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="updatedPeople.birth_date"
              type="date"
              label="Data de nascimento"
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
            <v-text-field v-model="updatedPeople.telephone" label="Telefone" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="updatedPeople.gender"
              :items="genderItems"
              item-value="value"
              item-text="text"
              label="Sexo"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="updatedPeople.work"
              :items="workItems"
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
          <v-col cols="12" md="4">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.complement"
              label="Complemento"
              class="mr-3"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-if="updatedPeople && updatedPeople.address"
              v-model="updatedPeople.address.city"
              label="Cidade"
            />
          </v-col>

          <v-col cols="12" md="4">
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
        surname: '',
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
      genderItems: [
        { value: 'MALE', text: 'Masculino' },
        { value: 'FEMALE', text: 'Feminino' },
      ],
      workItems: [
        { value: true, text: 'Sim' },
        { value: false, text: 'Não' },
      ],
    }
  },
  computed: {
    genderOptions() {
      return this.genderItems
    },
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          console.log('Buscando dados para id:', id)
          this.updatedPeople = await this.$store.dispatch('people/findById', id)
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    async saveChanges() {
      const updateData = {
        id: this.updatedPeople.id,
        payload: {
          name: this.updatedPeople.name,
          surname: this.updatedPeople.surname,
          //  cpf: this.updatedPeople.cpf,
          // email: this.updatedPeople.email,
          birth_date: this.updatedPeople.birth_date,
          gender: this.updatedPeople.gender,
          telephone: this.updatedPeople.telephone,
          work: this.updatedPeople.work,
          education: this.updatedPeople.education,
          address: {
            zip_code: this.updatedPeople.address.zip_code,
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
