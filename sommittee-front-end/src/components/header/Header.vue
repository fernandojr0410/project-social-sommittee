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
          <v-avatar v-bind="attrs" v-on="on" size="56">
            <v-img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar" />
            <v-icon v-else size="56" color="white">mdi-account-circle</v-icon>
          </v-avatar>
        </template>

        <v-card class="user-card" style="width: 300px">
          <div class="d-flex align-center justify-center">
            <v-avatar size="56">
              <v-img
                v-if="user.avatar_url"
                :src="user.avatar_url"
                alt="Avatar"
              />
              <v-icon v-else size="56" color="orange"
                >mdi-account-circle</v-icon
              >
            </v-avatar>
            <div class="d-flex flex-column pr-10">
              <v-card-title>{{ user.name }}</v-card-title>
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

        <v-list-item :to="{ path: '/donor' }">
          <v-list-item-icon>
            <v-icon>mdi-gift</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Doadores</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/product' }">
          <v-list-item-icon>
            <v-icon>mdi-package</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/received' }">
          <v-list-item-icon>
            <v-icon>mdi-hand-coin</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Recebimento</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/donation' }">
          <v-list-item-icon>
            <v-icon>mdi-truck-delivery-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Entregas</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Financeiro</v-list-item-title>
        </v-list-item>

        <!-- <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shopping</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Compras</v-list-item-title>
        </v-list-item> -->

        <v-list-group
          v-if="user.role === 'ADMIN' || user.role === 'MANAGER'"
          no-action
          prepend-icon="mdi-cog-outline"
          color="#FFF"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="{ path: '/users' }"
            v-if="user.role === 'ADMIN' || user.role === 'MANAGER'"
          >
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="user.role === 'ADMIN'">
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
import { mapState } from "vuex";

export default {
  name: "Header",
  components: {},
  data() {
    return {
      path: "",
      pageName: "Dashboard",
      imgSoon: require("../../assets/img/soon.png"),
      altSoon: "Imagem Logo",
      name: "",
      identifier: "",
      email: "",
      drawer: true,
      mini: true,
      expand: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler: function (path) {
        switch (path) {
          case "/":
            document.title = `Sommittee | Dashboard`;
            this.pageName = "Dashboard";
            break;
          case "/my-data":
            document.title = `Sommittee | Meu perfil`;
            this.pageName = "Meu perfil";
            break;
          case "/received":
            document.title = `Sommittee | Recebimento`;
            this.pageName = "Recebimentos";
            break;
          case "/people":
            document.title = `Sommittee | Pessoas`;
            this.pageName = "Pessoas";
            break;
          case "/family":
            document.title = `Sommittee | Famílias`;
            this.pageName = "Famílias";
            break;
          case "/donor":
            document.title = `Sommittee | Doadores`;
            this.pageName = "Doadores";
            break;
          case "/donation":
            document.title = `Sommittee | Entregas`;
            this.pageName = "Entregas";
            break;
          case "/product":
            document.title = `Sommittee | Produtos`;
            this.pageName = "Produtos";
            break;
          case "/users":
            document.title = `Sommittee | Usuários`;
            this.pageName = "Usuários";
            break;
        }
      },
    },
    $route(to, from) {
      if (to.query.noRedirect) {
        this.$router.push(from.path);
      }
    },
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");

        this.$router.replace("/login");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    },

    async login() {
      try {
        await this.$store.dispatch("auth/login", this.credentials);

        this.$router.push("/home");
      } catch (error) {
        this.$error("Erro ao realizar login.");
      }
    },
    viewProfile() {
      if (this.$route.path !== "/my-data") {
        this.$router.push("/my-data");
      }
    },

    handleMenuItemClick(item) {
      if (this.$route.path === item.to) {
        return false;
      }
      this.$router.push(item.to);
    },
    toggleDrawer() {
      (this.drawer = !this.drawer), (this.mini = !this.mini);
    },
  },
};
</script>
