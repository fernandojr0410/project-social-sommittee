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

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar nova pessoa</span>
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
                v-model="createdPeople.name"
                label="Nome completo"
                class="mr-3"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.cpf"
                label="CPF"
                class="mr-3"
                v-mask="'###.###.###-##'"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.birth_date"
                type="date"
                label="Data de nascimento"
                :max="today"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.email"
                label="E-mail"
                class="mr-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.telephone"
                label="Telefone"
                v-mask="'(##) #####-####'"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="createdPeople.gender"
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
                v-model="createdPeople.work"
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
                v-model="createdPeople.education"
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
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.zip_code"
                label="CEP"
                class="mr-3"
                @blur="fetchAddress"
                v-mask="'#####-###'"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.street"
                label="Rua"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.number"
                label="Número"
                class="mr-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.neighborhood"
                label="Bairro"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.complement"
                label="Complemento"
                class="mr-3"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.city"
                label="Cidade"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.state"
                :items="states"
                item-value="acronym"
                item-text="name"
                label="Selecione o estado"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green" @click="saveData" style="color: white">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import API from '@/services/module/API'
import { states } from '@/assets/state'

export default {
  name: 'PeopleCreate',
  data() {
    return {
      dialog: false,
      createdPeople: this.getInitialPeople(),
      states,
      today: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    getInitialPeople() {
      return {
        name: '',
        gender: '',
        work: '',
        cpf: '',
        email: '',
        birth_date: '',
        telephone: '',
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
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$emit('close')
    },
    async fetchAddress() {
      try {
        const address = await API.cep.getAddressByZipcode(
          this.createdPeople.address.zip_code
        )
        console.log('Endereço recebido:', address)
        if (address && address.street) {
          this.createdPeople.address = {
            ...this.createdPeople.address,
            ...address,
          }
        }
      } catch (error) {
        this.$error('Erro ao buscar endereço pelo CEP:')
        throw error
      }
    },
    async saveData() {
      try {
        console.log('Dados a serem enviados:', this.createdPeople)
        const newAddress = {
          name: this.createdPeople.name,
          cpf: this.createdPeople.cpf.replace(/\D/g, ''),
          birth_date: this.createdPeople.birth_date,
          email: this.createdPeople.email,
          gender: this.createdPeople.gender,
          telephone: this.createdPeople.telephone.replace(/[^0-9]/g, ''),
          work: this.createdPeople.work,
          education: this.createdPeople.education,
          address: {
            zip_code: this.createdPeople.address.zip_code.replace(
              /[^0-9]/g,
              ''
            ),
            street: this.createdPeople.address.street,
            number: this.createdPeople.address.number,
            complement: this.createdPeople.address.complement,
            neighborhood: this.createdPeople.address.neighborhood,
            city: this.createdPeople.address.city,
            state: this.createdPeople.address.state,
          },
        }
        console.log('Dados antes de salvar:', newAddress)
        await this.$store.dispatch('people/create', newAddress)
        this.$success('Registro criado!')
        this.closeDialog()
        this.$emit('close')
        this.createdPeople = this.getInitialPeople()
        return newAddress
      } catch (error) {
        this.$error('Erro ao criar a pessoa!')
        this.$error('Erro ao criar endereço!')
        throw error
      }
    },
  },
}
</script>
