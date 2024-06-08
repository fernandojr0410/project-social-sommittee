<template>
  <v-app>
    <v-main>
      <div class="background-container">
        <div
          style="
            display: flex;
            padding: 10px;
            justify-content: space-between;
            width: 100%;
            padding-inline: 60px;
            align-items: center;
          "
        >
          <div>
            <img :src="imgSoon" :alt="altSoon" style="height: 100px" />
            <img
              :src="imgWritingLogo"
              :alt="altWritingLogo"
              style="height: 100px"
            />
          </div>

          <div
            v-if="isLoggedIn"
            style="display: flex; align-items: center; position: relative"
            @click="toggleMenu"
          >
            <v-icon size="50">mdi-account-circle</v-icon>
            <span style="font-size: 24px; font-weight: 500; cursor: pointer">
              Olá, {{ userName }}
            </span>
            <UserTransition
              :menuItems="menuItems"
              :showMenu="showMenu"
              class="relative"
            />
          </div>
          <div v-else style="display: flex; cursor: pointer">
            <div
              style="display: flex; align-items: center; gap: 2px"
              @click="login"
            >
              <v-icon size="50">mdi-account-circle</v-icon>
              <span style="font-size: 26px; font-weight: 500">Entrar</span>
            </div>
          </div>
        </div>
        <div class="background-image-container">
          <img
            src="../assets/img/backgroundTeam.png"
            alt=""
            class="background-image"
          />
          <div class="gradient-overlay"></div>
        </div>
        <div class="text-overlay">
          <span style="font-weight: bold">Seja a mudança</span>
          <span>que você quer</span>
          <span>ver no mundo.</span>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import UserTransition from '@/components/transitions/UserTransition.vue'
import API from '@/services/module/API'

export default {
  name: 'Home',
  components: {
    UserTransition,
  },
  data() {
    return {
      imgSoon: require('../assets/img/soon.png'),
      altSoon: 'Imagem Logo',
      imgWritingLogo: require('../assets/img/writingLogo.png'),
      altWritingLogo: 'Escrita Imagem Logo',
      isLoggedIn: false,
      userName: '',
      showMenu: false,
      menuItems: [
        { text: 'Minha Conta' },
        { text: 'Família' },
        { text: 'Doação' },
        { text: 'Financeiro' },
        { text: 'Sair', clickHandler: this.logout },
      ],
    }
  },
  methods: {
    async dataProfileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        const userDetails = await API.getUserProfile(token)

        this.userName = `${userDetails.name}`
        this.isLoggedIn = true
      } catch (error) {
        console.error('Erro ao obter detalhes do usuário:', error)
      }
    },
    login() {
      this.$router.push('/LoginCollaborator')
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    logout() {
      localStorage.removeItem('@sommittee.access_token')
      this.isLoggedIn = false
      this.$router.push('/Home')
    },
  },
  created() {
    const token = localStorage.getItem('@sommittee.access_token')
    if (token) {
      this.dataProfileUser()
    }
  },
}
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #fbbf24, #fb923c);
  opacity: 0.6;
}

.text-overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 50px;
}
</style>
