<template>
    <div class="container">
        <Images />
        <v-card class="cardWrapper" style="background: rgba(255, 255, 255, 0.7);">
            <div class="card mx-auto pa-12 pb-8">
                <div class="titleInfo">
                    <span>Recuperar senha</span>
                </div>
                <div class="textLinkRecover">
                    <div class="linkRecover">
                        <span>Preencha seu e-mail para</span>
                        <span>receber um link de redefinição.</span>
                    </div>
                </div>
                <form>
                    <div class="dataCollaborator">
                        <div class="emailCollaborator">
                            <label>E-mail:</label>
                            <input type="text" v-model="inputEmail" placeholder="e-mail@gmail.com">
                        </div>
                    </div>
                </form>

                <div class="buttonWrapper">
                    <v-btn class="loginButton">
                        Enviar
                    </v-btn>
                </div>

                <div class="line">
                    <span>ou</span>
                </div>

                <div class="registration">
                    <span>Sabe a senha?</span>
                    <span @click="redirectLoginCollaborator">Fazer login</span>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import Images from '@/components/Images.vue';

export default {
    name: "RecoverPasswordCollaborator",
    components: {
        Images
    },
    data: () => ({
        inputEmail: "",
        inputPassword: "",
        showPassword: false
    }),
    methods: {
        redirectLoginCollaborator() {
            this.$router.push('/LoginCollaborator')
        }
    },
}
</script>

<style>
@import './StyleRecoverPassword.css'
</style>