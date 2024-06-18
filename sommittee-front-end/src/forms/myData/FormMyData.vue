<template>
  <v-container class="d-flex justify-center mt-10">
    <v-card style="width: 100%; max-width: 700px" class="pb-10">
      <v-tabs
        v-model="tab"
        background-color="#f2522e"
        centered
        dark
        icons-and-text
        class="pt-20"
        grow
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Informações
          <v-icon>mdi-information-outline</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          Autenticação
          <v-icon>mdi-two-factor-authentication</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Senha
          <v-icon>mdi-lock-outline</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <FormMyInfo />
        </v-tab-item>

        <v-tab-item value="tab-2">
          <FormAuthendicator />
        </v-tab-item>

        <v-tab-item value="tab-3">
          <FormPassword />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import FormMyInfo from './FormMyInfo.vue'
import FormAuthendicator from './FormAuthendicator.vue'
import FormPassword from './FormPassword.vue'

export default {
  name: 'FormMyData',
  components: {
    FormMyInfo,
    FormAuthendicator,
    FormPassword,
  },
  data() {
    return {
      tab: ['tab-1', 'tab-2', 'tab-3'],
    }
  },
}
</script>