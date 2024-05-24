<template>
    <div class="container">
        <Images />
        <v-card class="cardWrapper" style="background: rgba(255, 255, 255, 0.7);">
            <div class="card mx-auto pa-12 pb-8">
                <div class="titleInfo">
                    <span>Login</span>
                </div>

                <form>
                    <div class="dataCollaborator">
                        <div class="emailCollaborator">
                            <label>E-mail:</label>
                            <input type="text" v-model="inputEmail" placeholder="e-mail@gmail.com">
                        </div>

                        <div class="passwordCollaborator">
                            <label>Senha:</label>
                            <div class="passwordInputWrapper">
                                <input :type="showPassword ? 'text' : 'password'" v-model="inputPassword"
                                    placeholder="*************">
                                <v-icon @click="passwordVisibility">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye'
                                    }}</v-icon>
                            </div>
                        </div>
                        <div class="forgotPassword">
                            <a class="text-caption text-decoration-none text-blue" rel="noopener noreferrer"
                                target="_blank" @click="redirectRecoverPassword">
                                Esqueci minha senha
                            </a>
                        </div>
                    </div>
                </form>

                <div class="buttonWrapper">
                    <v-btn class="loginButton">
                        Entrar
                    </v-btn>
                </div>
                <div class="line">
                    <span>ou</span>
                </div>

                <div class="registration">
                    <span>Não tem cadastro?</span>
                    <span @click="redirectRegistration">Cadastre-se</span>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import Images from '@/components/Images.vue';

export default {
    name: "LoginCollaborator",
    components: {
        Images
    },
    data: () => ({
        inputEmail: "",
        inputPassword: "",
        showPassword: false
    }),
    methods: {
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        },
        redirectRegistration() {
            this.$router.push('/RegistrationCollaborator')
        },
        redirectRecoverPassword() {
            this.$router.push('./RecoverPassword')
        },
        getFindById() {

        },
    }
}
</script>

<style>
@import './StyleFormLogin.css'
</style>