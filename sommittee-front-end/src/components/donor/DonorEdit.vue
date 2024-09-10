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
          <v-col cols="6">
            <v-text-field
              v-if="updatedDonor"
              v-model="updatedDonor.name"
              label="Nome completo"
              class="mr-3"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-if="updatedDonor"
              v-model="updatedDonor.identifier"
              label="CPF"
              class="mr-3"
              v-mask="'###.###.###.##'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="updatedDonor"
              v-model="updatedDonor.email"
              label="E-mail"
              class="mr-3"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-if="updatedDonor"
              v-model="updatedDonor.telephone"
              label="Contato"
              class="mr-3"
              v-mask="'(##) #####-####'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-if="updatedDonor"
              v-model="updatedDonor.type_donor"
              :items="[
                { text: 'Interno', value: 'INTERNAL' },
                { text: 'Externo', value: 'EXTERNAL' },
              ]"
              item-value="value"
              item-text="text"
              label="Tipo"
              class="mr-3"
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
export default {
  name: 'DonorEdit',
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
      updatedDonor: this.getDonor(),
      loading: false,
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedDonor = await this.$store.dispatch('donor/findById', id)
        }
      },
    },
  },
  methods: {
    getDonor() {
      return {
        name: '',
        identifier: '',
        email: '',
        telephone: '',
        type_donor: '',
      }
    },
    closeDialog() {
      this.$emit('close')
    },
    async saveChanges() {
      try {
        const donorId = this.id
        const updateData = {
          id: donorId,
          payload: {
            name: this.updatedDonor.name,
            identifier: this.updatedDonor.identifier.replace(/\D/g, ''),
            email: this.updatedDonor.email,
            telephone: this.updatedDonor.telephone.replace(/\D/g, ''),
            type_donor: this.updatedDonor.type_donor,
          },
        }
        await this.$store.dispatch('donor/update', updateData)
        this.$success('Registro atualizado!')
        this.updatedDonor = this.getDonor()
        this.closeDialog()
      } catch (error) {
        this.$error('Erro ao atualizar!')
        throw error
      }
    },
  },
}
</script>
