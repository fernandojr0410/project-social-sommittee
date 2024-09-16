<template>
  <v-card flat>
    <v-row class="justify-center pa-15">
      <v-form>
        <v-col>
          <v-otp-input length="6" type="number" />
        </v-col>
      </v-form>
    </v-row>
    <v-card-actions class="mr-13">
      <v-spacer></v-spacer>
      <v-btn color="primary">ENVIAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'FormAuthendicator',
}
</script>
