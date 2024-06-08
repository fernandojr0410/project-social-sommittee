<template>
  <v-row justify="center" style="min-height: 160px">
    <v-col class="shrink">
      <v-expand-transition>
        <v-card v-show="showMenu" class="mx-auto secondary menu">
          <div v-show="showMenu">
            <div
              v-for="(menuItem, index) in menuItems"
              :key="index"
              @click="handleMenuItem(menuItem)"
            >
              <v-row style="display: flex; align-items: center">
                <v-icon size="25">mdi-account-circle</v-icon>
                <p>{{ menuItem.text }}</p>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserTransition',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    methods: {
      handleMenuItem(menuItem) {
        if (menuItem.clickHandle) {
          menuItem.clickHandle()
        }
      },
    },
  },
}
</script>

<style scoped>
.menu {
  padding-top: 8%;
  padding-left: 8%;
  position: absolute;
  top: 70%;
  width: 70%;
  align-items: start;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
