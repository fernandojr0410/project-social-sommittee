<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card style="display: flex; flex-direction: column; gap: 20px">
        <v-card-title
          class="text-h5 grey lighten-2"
          style="display: flex; justify-content: center; font-weight: bold"
        >
          {{ title }}
        </v-card-title>

        <v-card-text style="font-size: 18px; font-weight: bold">
          {{ text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="handleCancel" class="buttonModal">Cancelar</v-btn>
          <v-btn text @click="handleConfirm" class="buttonModal">
            {{ buttonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'OK',
    },
  },
  data() {
    return {
      dialog: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.dialog = newValue
    },
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.dialog = false
      this.$emit('input', false)
    },
    handleCancel() {
      this.$emit('cancel')
      this.dialog = false
      this.$emit('input', false)
    },
  },
}
</script>

<style scoped>
.buttonModal {
  background-color: black;
  color: white;
  font-weight: bold;
}
</style>
