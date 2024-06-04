<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex items-center justify-between bg-gray-primary p-2">
      <div class="flex pl-10">
        <img :src="imgSoon" :alt="altSoon" class="h-24">
        <img :src="imgWritingLogo" :alt="altWritingLogo" class="h-20">
      </div>

      <div>
        <Router-link to="/LoginCollaborator" class="flex gap-1 items-center pr-10" @click="login()">
          <div>
            <v-icon size="50">mdi-account-circle</v-icon>
          </div>
          <div>
            <span class="text-2xl text-gray-secundary">Entrar</span>
          </div>
        </Router-link>
      </div>
    </div>
    <div class="relative min-h-screen">
      <img src="../assets/img/backgroundTeam.png" alt="" class="w-full ">
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="flex flex-col text-6xl text-white gap-2">
          <span class="font-bold">Seja a mudança</span>
          <span>Que você quer</span>
          <span>ver no mundo.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      imgSoon: require("../assets/img/soon.png"),
      altSoon: "Imagem Logo",
      imgWritingLogo: require("../assets/img/writingLogo.png"),
      altWritingLogo: "Escrita Imagem Logo"
    }
  },
  login() {
    this.$router.push('/LoginCollaborator')
  }
}
</script>

<style scoped>
.min-h-screen {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.relative::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgba(253, 197, 58, 0.6), rgba(253, 117, 48, 0.6));
}
</style>
