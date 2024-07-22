<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar endereço</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <span color="primary" style="font-weight: bold; font-size: 16px">
              Colaborador:
            </span>
            <v-text-field
              v-if="updatedAddress && updatedAddress.user"
              v-model="updatedAddress.user.name"
              label="Nome"
              disabled
            />
            <v-text-field
              v-if="updatedAddress && updatedAddress.user"
              v-model="updatedAddress.user.surname"
              label="Sobrenome"
              disabled
            />
            <v-text-field
              v-if="updatedAddress && updatedAddress.user"
              v-model="updatedAddress.user.email"
              label="E-mail"
              disabled
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="formatDate(updatedAddress.created_at)"
              label="Data de criação"
              disabled
            />
            <v-text-field
              :value="formatDate(updatedAddress.updated_at)"
              label="Data de atualização"
              disabled
            />
            <v-text-field v-model="updatedAddress.zip_code" label="Cep" />
            <v-text-field v-model="updatedAddress.street" label="Rua" />
            <v-text-field v-model="updatedAddress.number" label="Número" />
            <v-text-field
              v-model="updatedAddress.complement"
              label="Complemento"
            />
            <v-text-field
              v-model="updatedAddress.neighborhood"
              label="Bairro"
            />
            <v-text-field v-model="updatedAddress.city" label="Cidade" />

            <v-select
              v-model="updatedAddress.state"
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
import { formatDate } from '@/filters'
import { states } from '@/assets/state/index'

export default {
  name: 'AddressEdit',
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
      updatedAddress: {
        id: '',
        zip_code: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        user: {},
      },
      states: states || [],
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedAddress = await this.$store.dispatch(
            'address/findById',
            id
          )
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
        id: this.updatedAddress.id,
        payload: {
          zip_code: this.updatedAddress.zip_code,
          street: this.updatedAddress.street,
          number: this.updatedAddress.number,
          complement: this.updatedAddress.complement,
          neighborhood: this.updatedAddress.neighborhood,
          city: this.updatedAddress.city,
          state: this.updatedAddress.state,
        },
      }
      this.$loading('Carregando...')
      try {
        await this.$store.dispatch('address/update', updateData)
        this.$success('Alterações salvas!')
        this.$emit('close')
        return updateData
      } catch (error) {
        this.$error('Erro ao atualizar!')
        throw error
      }
    },
    formatDate,
  },
}
</script>
