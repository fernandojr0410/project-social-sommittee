<template>
  <Modal
    :value="showModal"
    @input="showModal = false"
    :title="modalTitle"
    :text="modalText"
    :buttonText="modalButtonText"
    @confirm="deleteData"
    @cancel="handleCancel"
  />
</template>

<script>
import Modal from "../modal/Modal.vue";

export default {
  name: "UserDelete",
  components: { Modal },
  props: {
    dialog: Boolean,
    id: String,
  },
  data() {
    return {
      modalTitle: "Confirmar Exclusão",
      modalText: "Tem certeza que deseja excluir esse registro?",
      modalButtonText: "Confirmar",
      showModal: false,
    };
  },
  watch: {
    dialog(val) {
      this.showModal = val;
    },
  },
  methods: {
    async deleteData() {
      try {
        const response = await this.$store.dispatch(
          "userColaborator/delete",
          this.id
        );
        this.$success("Registro deletado!");
        this.$emit("close");
        return response;
      } catch (error) {
        this.$error("Erro ao deletar registro!");
        setTimeout(() => {
          this.$error(
            "Não foi possível deletar esse registro! O usuário está vinculado a doações ou possuí logs e não pode ser removido enquanto esses vínculos existirem."
          );
        }, 2000);
        throw error;
      }
    },
    handleCancel() {
      this.showModal = false;
      this.$emit("close");
    },
  },
};
</script>
