<template>
  <v-card flat>
    <v-form>
      <v-row class="d-flex justify-center">
        <v-col cols="12" class="d-flex justify-center">
          <v-avatar size="120" class="avatar-display" @click="triggerFileInput">
            <img :src="avatarUrl" v-if="avatarUrl" />
            <input
              ref="fileInput"
              type="file"
              class="d-none"
              accept="image/*"
              @change="handleFileChange"
            />
            <v-icon class="avatar-icon" dark>mdi-camera</v-icon>
          </v-avatar>
        </v-col>
      </v-row>

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
import { mapGetters, mapActions } from 'vuex'
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
      avatarPreview: '',
      defaultAvatar: '',
      isFormChanged: false,
      modalTitle: '',
      modalText: '',
      modalButton: false,
      showModal: false,
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['avatarUrl']),
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user) {
          this.form = { ...user }
          this.originalForm = { ...this.form }

          this.avatarPreview = user.avatarUrl
            ? user.avatarUrl
            : this.defaultAvatar
        }
      },
    },
    form: {
      deep: true,
      handler() {
        this.isFormChanged = this.checkFormChanges()
      },
    },
  },
  methods: {
    checkFormChanges() {
      return (
        this.form.name !== this.originalForm.name ||
        this.form.surname !== this.originalForm.surname ||
        this.form.telephone !== this.originalForm.telephone ||
        this.form.email !== this.originalForm.email
      )
    },
    async updateProfile() {
      try {
        await this.$store.dispatch('auth/updateProfile', this.form)
        this.openModal(
          'Dados atualizados com sucesso!',
          'Seus dados foram atualizados com sucesso!',
          'OK'
        )
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
      }
    },
    openModal(title, text) {
      this.modalTitle = title
      this.modalText = text
      this.showModal = true
    },
    ...mapActions('auth', ['uploadAvatar']),
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadAvatar(file)
      }
    },

    async uploadAvatar(file) {
      const formData = new FormData()
      formData.append('file', file)

      await this.$store.dispatch('auth/uploadAvatar', formData)
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },
  },
}
</script>

<style scoped>
.avatar-display {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.avatar-icon {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 100%;
  color: white;
}
</style>
