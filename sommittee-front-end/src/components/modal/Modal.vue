<template>
  <div v-if="value" class="modal">
    <div class="modal-content">
      <span>{{ message }}</span>
      <button @click="$emit('input', false)">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    message: String,
    value: Boolean,
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>