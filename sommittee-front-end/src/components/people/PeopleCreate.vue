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
          <span class="headline">Erros de Validação</span>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(message, field) in errors" :key="field">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ field }}: {{ message }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
                label="Nome"
                class="mr-3"
                :error-messages="errors.name ? [errors.name] : []"
                @input="clearError('name')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.surname"
                label="Sobrenome"
                :error-messages="errors.surname ? [errors.surname] : []"
                @input="clearError('surname')"
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
                :error-messages="errors.cpf ? [errors.cpf] : []"
                @input="clearError('cpf')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.birth_date"
                type="date"
                label="Data de nascimento"
                :error-messages="errors.birth_date ? [errors.birth_date] : []"
                @input="clearError('birth_date')"
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
                :error-messages="errors.email ? [errors.email] : []"
                @input="clearError('email')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="createdPeople.telephone"
                label="Telefone"
                v-mask="'(##) #####-####'"
                :error-messages="errors.telephone ? [errors.telephone] : []"
                @input="clearError('telephone')"
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
                :error-messages="errors.gender ? [errors.gender] : []"
                @input="clearError('gender')"
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
                :error-messages="errors.work ? [errors.work] : []"
                @input="clearError('work')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="createdPeople.education"
                label="Educação"
                class="mr-3"
                :error-messages="errors.education ? [errors.education] : []"
                @input="clearError('education')"
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
                :error-messages="
                  errors.address?.zip_code ? [errors.address.zip_code] : []
                "
                @input="clearError('address.zip_code')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.street"
                label="Rua"
                :error-messages="
                  errors.address?.street ? [errors.address.street] : []
                "
                @input="clearError('address.street')"
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
                :error-messages="
                  errors.address?.number ? [errors.address.number] : []
                "
                @input="clearError('address.number')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="createdPeople && createdPeople.address"
                v-model="createdPeople.address.neighborhood"
                label="Bairro"
                :error-messages="
                  errors.address?.neighborhood
                    ? [errors.address.neighborhood]
                    : []
                "
                @input="clearError('address.neighborhood')"
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
                :error-messages="
                  errors.address?.city ? [errors.address.city] : []
                "
                @input="clearError('address.city')"
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
                :error-messages="
                  errors.address?.state ? [errors.address.state] : []
                "
                @input="clearError('address.state')"
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
import { validationSchema } from '@/assets/config'

export default {
  name: 'PeopleCreate',
  data() {
    return {
      dialog: false,
      createdPeople: {
        name: '',
        surname: '',
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
      },
      states,
      today: new Date().toISOString().substr(0, 10),
      errors: {},
    }
  },
  methods: {
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
          this.errors.address = {}
        } else {
          this.errors.address = { zip_code: 'CEP não encontrado' }
        }
      } catch (error) {
        this.errors.address = { zip_code: 'Erro ao buscar endereço pelo CEP' }
        console.error('Erro ao buscar endereço pelo CEP:', error)
      }
    },
    clearError(field) {
      this.$set(this.errors, field, '')
    },
    async saveData() {
      this.errors = {}
      try {
        console.log('Dados a serem enviados:', this.createdPeople)
        const newAddress = {
          name: this.createdPeople.name,
          surname: this.createdPeople.surname,
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
        await validationSchema.validate(newAddress, { abortEarly: false })
        await this.$store.dispatch('people/create', newAddress)
        this.$success('Registro criado!')
        this.closeDialog()
        this.$emit('close')
        this.createdPeople = ''
        return newAddress
      } catch (error) {
        if (error.name === 'ValidationError') {
          this.errors = {}
          error.inner.forEach((err) => {
            const field = err.path.split('.')
            if (field.length > 1) {
              if (!this.errors[field[0]]) this.errors[field[0]] = {}
              this.errors[field[0]][field[1]] = err.message
            } else {
              this.$set(this.errors, err.path, err.message)
            }
          })
        } else {
          this.$error('Erro ao criar a pessoa!')
          console.error('Erro ao criar endereço', error)
          throw error
        }
      }
    },
  },
}
</script>
