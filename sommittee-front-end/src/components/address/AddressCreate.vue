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
          <span class="headline">Cadastrar novo endereço</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-mask="'##-###-###'"
                v-model="createdAddress.zip_code"
                label="Cep"
                :rules="[(value) => /^\d{5}-\d{3}$/.test(value) || '']"
              />
              <v-text-field v-model="createdAddress.street" label="Rua" />
              <v-text-field v-model="createdAddress.number" label="Número" />
              <v-text-field
                v-model="createdAddress.complement"
                label="Complemento"
              />
              <v-text-field
                v-model="createdAddress.neighborhood"
                label="Bairro"
              />
              <v-text-field v-model="createdAddress.city" label="Cidade" />

              <v-select
                v-model="createdAddress.state"
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
import { states } from '@/assets/state/index'

export default {
  name: 'AddressCreate',
  data() {
    return {
      dialog: false,
      createdAddress: {
        id: '',
        zip_code: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      states: states || [],
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
    async saveData() {
      try {
        const user = this.$store.state.auth.user

        const newAddress = {
          zip_code: this.createdAddress.zip_code,
          street: this.createdAddress.street,
          number: this.createdAddress.number,
          complement: this.createdAddress.complement,
          neighborhood: this.createdAddress.neighborhood,
          city: this.createdAddress.city,
          state: this.createdAddress.state,
          user_id: user.id,
        }

        await this.$store.dispatch('address/create', newAddress)
        await this.$success('Endereço criado!')
        this.closeDialog()
        this.createdAddress = ''
      } catch (error) {
        this.$error('Erro ao criar endereço!')
        console.error('Erro ao criar endereço:', error)
      }
    },
  },
}
</script>
