<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col class="shrink">
          <v-btn class="ma-2" color="primary" @click="expand = !expand">
            Expand Transition
          </v-btn>

          <v-expand-transition>
            <v-card
              v-show="expand"
              height="100"
              width="100"
              class="mx-auto secondary"
            ></v-card>
          </v-expand-transition>
        </v-col>

        <div class="mx-4 hidden-sm-and-down"></div>
      </v-container>
    </v-main>
  </v-app>
</template>
