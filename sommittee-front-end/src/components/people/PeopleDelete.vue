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
  name: 'PeopleDelete',
  components: { Modal },
  props: {
    dialog: Boolean,
    id: String,
  },
  data() {
    return {
      modalTitle: 'Confirmar Exclusão',
      modalText: 'Tem certeza de que deseja excluir esta pessoa?',
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
        const response = await this.$store.dispatch('people/delete', this.id)
        console.log('response', response)
        this.$success('Register deleted!')
        this.$emit('close')
        return response
      } catch (error) {
        this.$error('Unable to delete!')
      } finally {
        this.showModal = false
      }
    },
    handleCancel() {
      this.showModal = false
    },
  },
}
</script>
