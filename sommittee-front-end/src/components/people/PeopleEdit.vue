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
              Informações da pessoa:
            </span>
            <v-row>
              <v-text-field
                v-model="updatedPeople.name"
                label="Nome"
                class="mb-4"
              />
              <v-text-field v-model="updatedPeople.surname" label="Sobrenome" />
            </v-row>
          </v-col>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="updatedPeople.cpf" label="CPF" disabled />
              <v-text-field v-model="updatedPeople.email" label="E-mail" />
            </v-col>
          </v-row>

          <v-text-field
            v-model="updatedPeople.birth_date"
            label="Data de nascimento"
          />
          <v-text-field v-model="updatedPeople.gender" label="Genêro" />

          <v-text-field v-model="updatedPeople.telephone" label="Telefone" />
          <v-text-field v-model="updatedPeople.work" label="Trabalha?" />

          <v-text-field v-model="updatedPeople.education" label="Educação" />
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Informações do endereço:
            </span>
          </v-col>
          <v-row>
            <v-text-field v-model="updatedPeople.zip_code" label="Cep" />
            <v-text-field v-model="updatedPeople.street" label="Rua" />
            <v-text-field v-model="updatedPeople.number" label="Número" />
            <v-text-field
              v-model="updatedPeople.complement"
              label="Complemento"
            />
            <v-text-field v-model="updatedPeople.neighborhood" label="Bairro" />
            <v-text-field v-model="updatedPeople.city" label="Cidade" />

            <v-select
              v-model="updatedPeople.state"
              :items="states"
              item-value="acronym"
              item-text="name"
              label="Selecione o estado"
            />
          </v-row>
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
  },
  id: {
    type: String,
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
        address: {},
      },
      states: states || [],
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
    async saveChanges() {
      updateData = {
        id: this.updatedPeople.id,
        payload: {
          name: this.updatedPeople.name,
          surname: this.updatedPeople.surname,
          cpf: this.updatedPeople.cpf,
          email: this.updatedPeople.email,
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
      this.$loading('Carregando...')
      try {
        this.$sucess('Alterações salvas!')
        this.$emit('close')
      } catch (error) {
        this.$error('Erro ao atualizar!')
        throw error
      }
    },
  },
}
</script>
