<template>
  <v-card flat>
    <v-form>
      <v-row class="pa-15">
        <v-col cols="12" sm="6">
          <v-text-field label="Nome" filled v-model="form.name" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Sobrenome" filled v-model="form.surname" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Telefone" filled v-model="form.telephone" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="E-mail" filled v-model="form.email" disabled />
        </v-col>
      </v-row>

      <v-card-actions class="mr-13">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="updateProfile"
          :disabled="!isFormChanged"
        >
          ALTERAR DADOS
        </v-btn>
      </v-card-actions>
    </v-form>
    <Modal
      :value="showModal"
      @input="showModal = $event"
      :title="modalTitle"
      :text="modalText"
      :button="modalButton"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '../../components/modal/Modal.vue'

export default {
  components: { Modal },
  name: 'FormMyInfo',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        telephone: '',
        email: '',
      },
      originalForm: {
        name: '',
        surname: '',
        telephone: '',
        email: '',
      },
      isFormChanged: false,
      modalTitle: '',
      modalText: '',
      modalButton: false,
      showModal: false,
    }
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
  watch: {
    user: {
      immediate: true,
      handler: function (user) {
        if (user) {
          this.form = JSON.parse(
            JSON.stringify({
              name: user.name,
              surname: user.surname,
              telephone: user.telephone,
              email: user.email,
            })
          )
          this.originalForm = { ...this.form }
        }
      },
    },
    form: {
      deep: true,
      handler: function () {
        this.isFormChanged = this.checkFormChanges()
      },
    },
  },
  methods: {
    checkFormChanges() {
      return (
        this.form.name !== this.originalForm.name ||
        this.form.surname !== this.originalForm.surname ||
        this.form.telephone !== this.originalForm.telephone
      )
    },
    async updateProfile() {
      const response = await this.$store.dispatch(
        'auth/updateProfile',
        this.form
      )
      this.openModal(
        'Dados atualizados com sucesso!',
        'Seus dados foram atualizados com sucesso!',
        'OK'
      )
      return response
    },
    openModal(title, text) {
      ;(this.modalTitle = title),
        (this.modalText = text),
        (this.showModal = true)
    },
  },
}
</script>
