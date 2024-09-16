<template>
  <Modal
    :value="showModal"
    @input="showModal = $event"
    :title="modalTitle"
    :text="modalText"
    :buttonText="modalButtonText"
    @confirm="deleteData"
    @cancel="handleCancel"
  />
</template>

<script>
import Modal from '../modal/Modal.vue'

export default {
  name: 'FamilyDelete',
  components: { Modal },
  props: {
    dialog: Boolean,
    id: String,
  },
  data() {
    return {
      modalTitle: 'Confirmar Exclusão',
      modalText: 'Tem certeza que deseja excluir esse registro?',
      modalButtonText: 'Confirmar',
      showModal: false,
    }
  },
  watch: {
    dialog(val) {
      this.showModal = val
    },
  },
  methods: {
    async deleteData() {
      try {
        const response = await this.$store.dispatch('family/delete', this.id)
        this.$success('Registro deletado!')
        this.$emit('close')
        return response
      } catch (error) {
        this.$error('Erro ao deletar registro!')
        throw error
      } finally {
        this.showModal = false
      }
    },
    handleCancel() {
      this.showModal = false
      this.$emit('close')
    },
  },
}
</script>
