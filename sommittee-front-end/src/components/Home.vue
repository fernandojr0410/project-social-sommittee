<template>
    <div class="container">
        <div class="logo">
            <img :src="require('@/assets/img/logo.png')" alt="Logo">
        </div>
        <div class="imgFundo">
            <div class="title">
                <div class="bold">Juntos,</div>
                <div>Fazemos a</div>
                <div>Diferença!</div>
            </div>
        </div>
        <div class="buttonsHome">
            <div class="buttonIconHome">
                <v-btn class="loginBtn" @click="redirectToLogin">
                    Login
                    <v-icon left class="loginIcon">mdi-exit-to-app</v-icon>
                </v-btn>
                <v-btn class="signupBtn" @click="redirectRegistration">
                    Cadastrar-se
                    <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import Images from './Images.vue';

export default {
    name: 'Home',
    methods: {
        redirectToLogin() {
            this.$router.push('LoginCollaborator');
        },
        redirectRegistration() {
            this.$router.push('/RegistrationCollaborator')
        }
    },
    components: {
        Images,
    }
};
</script>

<style>
.container {
    width: 100%;
    height: 100vh;
    position: relative;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #FFF;
    font-size: 5vw;
    margin-top: 10vh;
}

.title .bold {
    font-weight: bold;
}

.buttonsHome {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 1;
}

.buttonIconHome {
    display: flex;
    gap: 16px;
}

.loginIcon {
    margin-left: 8px;
}

.v-btn.loginBtn,
.v-btn.signupBtn {
    font-weight: bold;
}

.v-btn.loginBtn:hover,
.v-btn.signupBtn:hover {
    background-color: #222 !important;
    color: #FCBa03 !important;
}

@media screen and (max-width: 500px) {
    .buttonsHome {
        position: static;
        width: 100%;
        text-align: center;
    }
}
</style>
