<template>
  <div>
    <v-app-bar dark clipped-left app>
      <v-app-bar-nav-icon @click="toggleDrawer()">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <div>
        <v-img
          :src="imgSoon"
          :alt="altSoon"
          class="mr-6 ml-6"
          style="width: 60px"
        />
      </div>
      <v-toolbar-title>
        <strong>{{ pageName }}</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-icon size="45" @click="expand = !expand" class="mr-10">
          mdi-account-circle
        </v-icon>
      </div>
    </v-app-bar>

    <v-expand-transition>
      <v-card v-show="expand" class="user-card" max-width="230">
        <div class="d-flex align-center pl-6">
          <v-icon size="45">mdi-account-circle</v-icon>
          <div>
            <v-card-title>{{ name }} {{ surname }}</v-card-title>
            <v-card-subtitle class="email-title">
              {{ email }}
            </v-card-subtitle>
          </div>
        </div>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click="viewProfile">
            <router-link
              to="/my-data"
              class="list-item-title text-decoration-none"
            >
              <v-icon size="25" color="#ffa500">mdi-cog</v-icon>
              Meus Dados
            </router-link>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon size="25" color="#ffa500">mdi-exit-to-app</v-icon>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      mini-variant
      expand-on-hover
      ref="drawer"
      dark
      class="drawer-hover"
    >
      <v-list>
        <v-list-item-group
          v-model="path"
          active-class="primary--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="handleMenuItemClick(item)"
            link
            class="menu-item"
          >
            <v-list-item-icon>
              <v-icon class="mr-40">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </div>
</template>

<script>
import API from '@/services/module/API'

export default {
  name: 'Home',
  data() {
    return {
      path: '',
      pageName: 'Dashboard',
      imgSoon: require('../../assets/img/soon.png'),
      altSoon: 'Imagem Logo',
      isLoggedIn: false,
      name: '',
      surname: '',
      email: '',
      drawer: true,
      expand: false,
      menuItems: [
        { text: 'Home', icon: 'mdi-home', to: '/home' },
        { text: 'Doações', icon: 'mdi-cart', to: '/Donations' },
        { text: 'Famílias', icon: 'mdi-account-group', to: '/Families' },
        { text: 'Financeiro', icon: 'mdi-currency-usd', to: '/Financial' },
      ],
    }
  },
  methods: {
    async dataProfileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        if (token) {
          const userDetails = await API.getUserProfile(token)
          this.name = userDetails.name
          this.surname = userDetails.surname
          this.email = userDetails.email
          this.isLoggedIn = true
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do usuário:', error)
      }
    },
    login() {
      this.$router.push('/LoginCollaborator')
    },
    viewProfile() {
      if (this.$route.path !== '/my-data') {
      }
    },
    logout() {
      localStorage.removeItem('@sommittee.access_token')
      this.isLoggedIn = false
      this.$router.push('/home')
    },
    handleMenuItemClick(item) {
      this.$router.push(item.to)
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function (path) {
        switch (path) {
          case '/home':
            document.title = `Sommittee | Dashboard`
            this.pageName = 'Dashboard'
            break
          case '/my-data':
            document.title = `Sommittee | Meu perfil`
            this.pageName = 'Meu perfil'
            break
        }
      },
    },
    $route(to, from) {
      if (to.query.noRedirect) {
        this.$router.push(from.path)
      }
    },
  },
  created() {
    this.dataProfileUser()
  },
}
</script>

<style scoped>
.drawer-hover:hover .v-navigation-drawer__content {
  background-color: #fff !important;
}

.menu-item:hover {
  background-color: #f2522e !important;
  color: #fff !important;
}

.menu-item:hover .v-icon {
  color: #fff !important;
}

.user-card {
  position: absolute;
  right: 30px;
  top: 70px;
  z-index: 10;
  background-color: white;
  color: black;
}

/* .email-title {
  max-width: calc(100% - 120px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>
