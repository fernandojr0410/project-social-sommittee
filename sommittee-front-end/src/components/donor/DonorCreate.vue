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
        <v-card-title>Cadastrar registro</v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonor"
                  v-model="createdDonor.name"
                  label="Nome completo"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="createdDonor"
                  v-model="createdDonor.identifier"
                  label="CPF"
                  class="mr-3"
                  v-mask="'###.###.###.##'"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-if="createdDonor"
                  v-model="createdDonor.email"
                  label="E-mail"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="createdDonor"
                  v-model="createdDonor.telephone"
                  label="Contato"
                  class="mr-3"
                  v-mask="'(##) #####-####'"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-if="createdDonor"
                  v-model="createdDonor.type_donor"
                  :items="[
                    { text: 'Interno', value: 'INTERNAL' },
                    { text: 'Externo', value: 'EXTERNAL' },
                  ]"
                  item-value="value"
                  item-text="text"
                  label="Tipo"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
            color="primary"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createDonor"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CRIAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'DonorCreate',
  data() {
    return {
      dialog: false,
      createdDonor: this.getDonor(),
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  methods: {
    getDonor() {
      return {
        name: '',
        cpidentifierf: '',
        email: '',
        telephone: '',
        type_donor: '',
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async createDonor() {
      try {
        const donorData = {
          name: this.createdDonor.name,
          identifier: this.createdDonor.identifier.replace(/\D/g, ''),
          email: this.createdDonor.email,
          telephone: this.createdDonor.telephone.replace(/\D/g, ''),
          type_donor: this.createdDonor.type_donor,
        }
        await this.$store.dispatch('donor/create', donorData)
        this.$success('Registro criado!')
        this.closeDialog()
        this.$emit('close')
        this.createdDonor = this.getDonor()
        return donorData
      } catch (error) {
        this.$error('Erro ao criar registro!')
        throw error
      }
    },
  },
}
</script>
