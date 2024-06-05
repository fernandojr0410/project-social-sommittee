<template>
  <div class="modal" v-if="value">
    <div class="modal-content">
      <button class="close" @click="closeModal">&times;</button>
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    text: {
      type: String
    }
  },
  methods: {
    closeModal() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
