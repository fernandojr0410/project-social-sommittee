<template>
  <v-snackbar
    v-if="visible && status === 'error'"
    left
    bottom
    :value="true"
    :timeout="15000"
  >
    <div class="d-flex align-center caption">
      <v-icon color="red">mdi-close-circle</v-icon>
      <div class="pl-3">
        <div class="font-weight-bold">Oops!</div>
        <div class="font-weight-medium">{{ text }}</div>
      </div>
    </div>
  </v-snackbar>
  <v-snackbar
    v-else-if="visible && status === 'loading'"
    left
    bottom
    :value="true"
    :timeout="15000"
  >
    <div class="d-flex align-center caption">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <div class="pl-3">
        <div class="font-weight-medium">{{ text }}</div>
      </div>
    </div>
  </v-snackbar>
  <v-snackbar
    v-else-if="visible && status === 'success'"
    left
    bottom
    :value="true"
    :timeout="15000"
  >
    <div class="d-flex align-center caption">
      <v-icon color="green">mdi-check-circle</v-icon>
      <div class="pl-3">
        <div class="font-weight-bold">{{ text }}</div>
      </div>
    </div>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      visible: false,
      text: '',
      status: '',
    }
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  watch: {
    snackbar: {
      deep: true,
      handler: function (snackbar) {
        this.visible = true
        this.status = snackbar.status
        this.text = snackbar.text

        clearTimeout(this.timeout)

        if (snackbar.status === 'success') {
          this.timeout = setTimeout(() => (this.visible = false), 3000)
        } else if (snackbar.status === 'error') {
          this.timeout = setTimeout(() => (this.visible = false), 5000)
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
