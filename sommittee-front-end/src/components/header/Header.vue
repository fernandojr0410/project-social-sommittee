<template>
  <div>
    <v-app-bar dark clipped-left app>
      <v-app-bar-nav-icon @click="toggleDrawer">
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

      <v-menu
        offset-y
        v-model="expand"
        :close-on-content-click="false"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon size="45" class="mr-10" v-bind="attrs" v-on="on">
            mdi-account-circle
          </v-icon>
        </template>
        <v-card class="user-card" style="width: 250px">
          <div class="d-flex align-center">
            <v-icon size="45" class="pl-2" color="#ffa500">
              mdi-account-circle
            </v-icon>
            <div class="d-flex flex-column pr-10">
              <v-card-title>{{ name }} {{ surname }}</v-card-title>
              <v-card-subtitle class="email-title">
                {{ email }}
              </v-card-subtitle>
            </div>
          </div>
          <v-divider></v-divider>
          <v-list>
            <v-list-item link @click="viewProfile">
              <v-list-item-icon>
                <v-icon size="25" color="#ffa500">mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Meus dados</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-icon>
                <v-icon size="25" color="#ffa500">mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

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
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from '@/config/EventBus'
import API from '@/services/module/API'

export default {
  name: 'Header',
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
  created() {
    EventBus.$on('userLoggedIn', this.profileUser)
    this.profileUser()
  },
  profileUser() {
    this.isLoggedIn = true
    this.fetchUserInfo()
  },
  methods: {
    async profileUser() {
      try {
        const token = localStorage.getItem('@sommittee.access_token')
        if (token) {
          const userProfile = await API.getUserProfile(token)
          this.name = userProfile.name
          this.surname = userProfile.surname
          this.email = userProfile.email
          this.isLoggedIn = true
        }
      } catch (error) {
        throw error
      }
    },

    login() {
      this.$router.push('/login-collaborator')
    },
    viewProfile() {
      if (this.$route.path !== '/my-data') {
        this.$router.push('/my-data')
      }
    },
    logout() {
      localStorage.removeItem('@sommittee.access_token')
      this.isLoggedIn = false
      this.$router.push('/login-collaborator')
    },
    beforeDestroy() {
      EventBus.$off('userLoggedIn', this.handleUserLoggedIn)
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
  // created() {
  //   this.dataProfileUser()
  // },
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
.v-list-item--active .v-list-item__title {
  color: #fff !important;
}

.v-list-item--active {
  background-color: #f2522e !important;
}
</style>
