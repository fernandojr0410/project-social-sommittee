<template>
  <div class="background-container">
    <img src="@/assets/img/imgFundo.png" alt="" class="background-image">
    <div class="gradient-overlay"></div>

    <v-card class="bg-black">
      <v-card-title class="custom-card-title">Login</v-card-title>
      <v-text-field outlined :append-icon="'mdi-email'" v-model="inputEmail" label="Email" />

      <v-text-field outlined :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" v-model="inputPassword" placeholder="**********"
        label="Senha" @click:append="togglePasswordVisibility" />
      <v-btn @click="fetchData" color="primary" block dark>
        Entrar
      </v-btn>
      <Modal v-model="showModal" title="Error" text="Conta não encontrada" buttoncloseModal="OK" />
    </v-card>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue"
import API from "@/services/module/API";

export default {
  name: "FormLogin",
  components: {
    Modal
  },
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      showPassword: false,
      visible: false,
      msg: {
        email: "",
        password: "",
      },
      showModal: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async fetchData() {
      console.log("entrou no fetch");
      const requestBody = {
        email: this.inputEmail,
        password: this.inputPassword,
      };
      try {
        await API.user.login(requestBody);
      } catch (error) {
        console.log("error", error)
        this.showModal = true;
      }
    }
  },
}
</script>

<style scoped>
.background-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #fbbf24, #fb923c);
  opacity: 0.6;
}

/* .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 6px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-card-title {
  font-size: 30px;
  font-weight: bold;
  position: relative;
  margin-bottom: 40px;
}

.custom-card-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  border-bottom: 2px solid #222;
}


 */


/* .v-btn {
  display: flex;
  justify-content: center;
  background-color: #222 !important;
  color: white;
  font-weight: bold;
  width: 40%;
  margin-bottom: 20px;
} */
</style>
