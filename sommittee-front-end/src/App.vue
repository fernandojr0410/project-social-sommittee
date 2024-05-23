<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import LoginCollaborator from "./views/LoginCollaborator.vue";

export default {
  name: "App",
  components: {
    Home,
    LoginCollaborator
  },
  data() {
    return {
      imageSrc: require('@/assets/img/logo.png'),
      alt: "Imagem Principal"
    };
  }
};
</script>

<style>
html,
body {
  font-family: Helvetica;
  margin: 0;
  padding: 0;
}
</style>
