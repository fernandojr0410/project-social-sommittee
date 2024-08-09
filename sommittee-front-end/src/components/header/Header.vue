<template>
  <div v-if="user">
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
              <v-card-title>{{ user.name }} {{ user.surname }}</v-card-title>
              <v-card-subtitle class="email-title">
                {{ user.email }}
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
      dark
    >
      <v-list>
        <v-list-item :to="{ path: '/home' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/people' }">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Pessoas</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/family' }">
          <v-list-item-icon>
            <v-icon>mdi-human-male-male-child</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Famílias</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/address' }">
          <v-list-item-icon>
            <v-icon>mdi-truck-delivery-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Entregas</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/received' }">
          <v-list-item-icon>
            <v-icon>mdi-hand-coin</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Recebidos</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Financeiro</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shopping</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Compras</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-package</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>

        <v-list-group no-action prepend-icon="mdi-cog-outline" color="#FFF">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Logs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      path: '',
      pageName: 'Dashboard',
      imgSoon: require('../../assets/img/soon.png'),
      altSoon: 'Imagem Logo',
      name: '',
      surname: '',
      email: '',
      drawer: true,
      mini: true,
      expand: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function (path) {
        switch (path) {
          case '/':
            document.title = `Sommittee | Dashboard`
            this.pageName = 'Dashboard'
            break
          case '/my-data':
            document.title = `Sommittee | Meu perfil`
            this.pageName = 'Meu perfil'
            break
          case '/received':
            document.title = `Sommittee | Recebidos`
            this.pageName = 'Recebidos'
            break
          case '/address':
            document.title = `Sommittee | Entregas`
            this.pageName = 'Entregas'
            break
          case '/people':
            document.title = `Sommittee | Pessoas`
            this.pageName = 'Pessoas'
            break
          case '/family':
            document.title = `Sommittee | Famílias`
            this.pageName = 'Famílias'
        }
      },
    },
    $route(to, from) {
      if (to.query.noRedirect) {
        this.$router.push(from.path)
      }
    },
  },
  methods: {
    login() {
      this.$router.push('/login-collaborator')
    },
    viewProfile() {
      if (this.$route.path !== '/my-data') {
        this.$router.push('/my-data')
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
    handleMenuItemClick(item) {
      if (this.$route.path === item.to) {
        return false
      }
      this.$router.push(item.to)
    },
    toggleDrawer() {
      ;(this.drawer = !this.drawer), (this.mini = !this.mini)
    },
  },
}
</script>
