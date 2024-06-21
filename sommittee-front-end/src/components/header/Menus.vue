<!-- Menus.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    mini-variant.sync="mini"
    expand-on-hover
    ref="drawer"
    dark
    class="drawer-hover"
  >
    <v-list class="list">
      <v-list-item @click="handleMenuItemClick({ to: '/' })" link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        :value="true"
        prepend-icon="mdi-cart"
        color="#FFF"
        class="icon-list-group"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Doações</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-group sub-group color="#FFF">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Visualizar Estoque</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item @click="handleMenuItemClick({ to: '#' })" link>
            <v-list-item-title>Cadastrar Roupas</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-tshirt-crew-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="handleMenuItemClick({ to: '#' })" link>
            <v-list-item-title>Cadastrar Alimentos</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-food</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="handleMenuItemClick({ to: '#' })" link>
            <v-list-item-title>Registrar Entrega</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-truck-delivery-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Menus',
}
</script>
