<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <img src="@/assets/img/imgFundo.png" alt="" class="absolute inset-0 w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-b from-yellow-300 to-orange-400 opacity-60"></div>
    <v-card class="z-10 w-[30%] rounded-lg bg-white bg-opacity-70">
      <div class="flex flex-col justify-center items-center p-8 gap-2">
        <span class="text-2xl font-bold text-gray-secundary">Login</span>
        <div class="w-[50%] h-0.5 bg-gray-800"></div>
      </div>

      <div>
        <div class="flex flex-col gap-6 pl-6">
          <div class="flex flex-col" :class="{ 'hasError': msg.email }">
            <label class="text-gray-secundary font-bold text-lg" :class="{ 'errorLabel': msg.email }">E-mail:</label>
            <input type="text" v-model="inputEmail" placeholder="e-mail@email.com" required @blur="validateEmail">
            <span v-if="msg.email" class="msgError">{{ msg.email }}</span>
          </div>


          <div class="flex flex-col" :class="{ 'hasError': msg.password }">
            <label class="text-gray-secundary font-bold text-lg" :class="{ 'errorLabel': msg.password }">Senha:</label>
            <div>
              <input :type="showPassword ? 'text' : 'password'" v-model="inputPassword" placeholder="**********"
                required class="pr-12" @blur="validatePassword">
              <span v-if="msg.password" class="msgError">{{ msg.password }}</span>
              <v-icon @click="togglePasswordVisibility"
                class="absolute top-2 right-10 transform -translate-y-1/2 cursor-pointer">
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </div>
          </div>
        </div>
        <div class="flex justify-end pr-12 p-4">
          <Router-link to="/" class="font-bold text-gray-secundary">Esqueci minha senha</Router-link>
        </div>
        <div class="flex justify-center pb-10">
          <button class="w-32 px-4 py-2 bg-gray-secundary font-bold text-white rounded-md"
            @click="fetchData">Entrar</button>
        </div>

        <Modal v-model="showModal" message="Conta não encontrada" button="OK" />
      </div>
    </v-card>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue"

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
    //   const email = this.inputEmail
    //   const password = this.inputPassword

    //   console.log("Email:", email)
    //   console.log("Senha", password)
    // },
    validatePassword() {
      this.msg.password = this.inputPassword.length < 6 ? 'A senha deve conter no mínimo 6 caracteres.' : '';
    },
    validateEmail() {
      const formatoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.inputEmail);

      if (!formatoValido) {
        this.msg['email'] = 'E-mail inválido.';
      } else {
        this.msg['email'] = '';
      }
    },
    fetchData() {
      const requestBody = {
        email: this.inputEmail,
        password: this.inputPassword,
      };
      fetch('http://localhost:3001/users/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + this.token,
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            this.showModal = true
          } else {
            return response.json()
          }
        })
        .then((data) => {
          if (data) {
            this.inputEmail = data.email;
            this.inputPassword = data.password;
            console.log("Dados recebidos:", data)
          }
        })
        .catch(error => console.error(error))
    },
  }
}
</script>

<style scoped>
/* #relative::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgba(253, 197, 58, 0.6), rgba(253, 117, 48, 0.6));
} */

input {
  border-radius: 5px;
  padding-left: 2;
  width: 90%;
  padding: 6px;
  border: 1px solid rgb(198, 195, 195);
  cursor: pointer;
}

.hasError input {
  border: 1px solid red !important;
}

.errorLabel {
  color: red;
}

.msgError {
  color: red;
}
</style>
