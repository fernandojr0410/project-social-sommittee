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
        <v-card-title>
          <span class="headline">Cadastrar registro</span>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações da pessoa:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="createdPeople.name"
                  label="Nome completo"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="createdPeople.identifier"
                  label="CPF"
                  class="mr-3"
                  v-mask="'###.###.###-##'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="createdPeople.birth_date"
                      label="Data de nascimento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="secondary"
                    v-model="createdPeople.birth_date"
                    locale="pt"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="createdPeople.email"
                  label="E-mail"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="createdPeople.telephone"
                  label="Telefone"
                  v-mask="'(##) #####-####'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  v-model="createdPeople.gender"
                  :items="[
                    { text: 'Masculino', value: 'MALE' },
                    { text: 'Feminino', value: 'FEMALE' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Sexo"
                  outlined
                  dense
                  hide-details
                  style="width: 96.6%"
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="createdPeople.work"
                  :items="[
                    { text: 'Sim', value: true },
                    { text: 'Não', value: false },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Trabalha?"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="createdPeople.education"
                  label="Educação"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do endereço:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.zip_code"
                  label="CEP"
                  class="mr-3"
                  @blur="fetchAddress"
                  v-mask="'#####-###'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.street"
                  label="Rua"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.number"
                  label="Número"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.neighborhood"
                  label="Bairro"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.complement"
                  label="Complemento"
                  class="mr-3"
                  outlined
                  dense
                  hide-details
                  style="width: 100%"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.city"
                  label="Cidade"
                  outlined
                  dense
                  hide-details
                  style="width: 95.5%"
                />
              </v-col>

              <v-col>
                <v-select
                  v-if="createdPeople && createdPeople.address"
                  v-model="createdPeople.address.state"
                  :items="states"
                  item-value="acronym"
                  item-text="name"
                  label="Selecione o estado"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: end">
          <v-btn
            color="primary"
            style="font-weight: bold; margin-right: 12px"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            @click="saveData"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            Criar
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
      menu2: false,
    }
  },
  methods: {
    getInitialPeople() {
      return {
        name: '',
        gender: '',
        work: '',
        identifier: '',
        email: '',
        birth_date: new Date().toISOString().substr(0, 10),
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
        const newAddress = {
          name: this.createdPeople.name,
          identifier: this.createdPeople.identifier.replace(/\D/g, ''),
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
