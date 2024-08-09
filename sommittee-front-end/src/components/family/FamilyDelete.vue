<template>
  <Modal
    :value="shwoModal"
    @input="shwoModal = $event"
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
      shwoModal: false,
    }
  },
  watch: {
    dialog(val) {
      this.shwoModal = val
    },
  },
  methods: {
    async deleteData() {
      try {
        const response = await this.$store.dispatch('family/delete', this.id)
        console.log('response deleteData', response)
        this.$success('Registro deletado!')
        this.$emit('close')
        return response
      } catch (error) {
        this.$error('Erro ao deletar registro!')
        throw error
      } finally {
        this.shwoModal = false
      }
    },
    handleCancel() {
      this.shwoModal = false
      this.$emit('close')
    },
  },
}
</script>
