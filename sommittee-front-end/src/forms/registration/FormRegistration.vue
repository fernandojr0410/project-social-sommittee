<template>
    <div class="container">
        <Images />
        <v-card class="cardWrapper" style="background: rgba(255, 255, 255, 0.7);">
            <div class="card mx-auto pa-12 pb-8">
                <div class="titleInfo">
                    <span>Cadastro</span>
                </div>

                <form @submit.prevent="submitForm">
                    <div class="dataCollaborator">
                        <div class="infoPersonnel">
                            <div class="nameCollaborator" :class="{ 'hasError': msg.name }">
                                <label :class="{ 'errorLabel': msg.name }">Nome:</label>
                                <input type="text" v-model="inputName" placeholder="Seu nome" required
                                    @blur="validateName(inputName)">
                                <span v-if="msg.name" class="msgError">{{ msg.name }}</span>
                            </div>

                            <div class="surnameCollaborator" :class="{ 'hasError': msg.surname }">
                                <label :class="{ 'errorLabel': msg.surname }">Sobrenome:</label>
                                <input type="text" v-model="inputSurname" placeholder="Seu sobrenome" required
                                    @blur="validateSurname(inputSurname)">
                                <span v-if="msg.surname" class="msgError">{{ msg.surname }}</span>
                            </div>
                        </div>

                        <div class="emailCollaborator" :class="{ 'hasError': msg.email }">
                            <label :class="{ 'errorLabel': msg.email }">E-mail:</label>
                            <input type="email" v-model="inputEmail" placeholder="E-mail@gmail.com" required
                                @blur="validateEmail">
                            <span v-if="msg.email" class="msgError">{{ msg.email }}</span>
                        </div>

                        <div class="telephoneCollaborator">
                            <label>Telefone:</label>
                            <input type="text" v-mask="maskTel()" v-model="inputTelephone" placeholder="(00) 00000-0000"
                                required>
                        </div>

                        <div class="passwordCollaborator" :class="{ 'hasError': msg.password }">
                            <label :class="{ 'errorLabel': msg.password }">Senha:</label>
                            <div class="passwordInputWrapper">
                                <input :type="showPassword ? 'text' : 'password'" v-model="inputPassword"
                                    placeholder="*************" required @blur="validatePassword">
                                <span v-if="msg.password" class="msgError">{{ msg.password }}</span>
                                <v-icon @click="passwordVisibility">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye'
                                    }}</v-icon>
                            </div>
                        </div>

                        <div class="passwordCollaborator" :class="{ 'hasError': msg.confirmPassword }">
                            <label :class="{ 'errorLabel': msg.confirmPassword }">Confirmar senha:</label>
                            <div class="passwordInputWrapper">
                                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="inputConfirmPassword"
                                    placeholder="*************" required @blur="validateConfirmPassword">
                                <span v-if="msg.confirmPassword" class="msgError">{{ msg.confirmPassword }}</span>
                                <v-icon @click="confirmPasswordVisibility">{{ showConfirmPassword ? 'mdi-eye-off' :
                                    'mdi-eye' }}</v-icon>
                            </div>
                        </div>
                    </div>

                    <div class="buttonWrapper">
                        <v-btn class="loginButton" type="submit">Cadastrar</v-btn>
                    </div>
                </form>

                <div class="line">
                    <span>ou</span>
                </div>

                <div class="registration">
                    <span>Já tem cadastro?</span>
                    <span @click="redirectLogin">Faça login</span>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import Images from '@/components/Images.vue';

export default {
    name: "FormRegistration",
    data() {
        return {
            inputName: "",
            inputSurname: "",
            inputEmail: "",
            inputTelephone: "",
            inputPassword: "",
            inputConfirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            mask: "(##) #####-####",
            msg: {
                name: "",
                surname: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        },
        confirmPasswordVisibility() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        redirectLogin() {
            this.$router.push('/LoginCollaborator');
        },
        submitForm() {
            const name = this.inputName;
            const surname = this.inputSurname;
            const email = this.inputEmail;
            const telephone = this.inputTelephone;
            const password = this.inputPassword;
            const confirmPassword = this.inputConfirmPassword;

            console.log("Nome inserido:", name);
            console.log("Sobrenome inserido:", surname);
            console.log("E-mail inserido:", email);
            console.log("Telefone inserido:", telephone);
            console.log("Senha inserido:", password);
            console.log("Confirmação de senha:", confirmPassword);
        },
        validateName(name) {
            if (/\d/.test(name)) {
                this.msg['name'] = 'O nome não pode conter números.';
            } else {
                this.msg['name'] = '';
            }
        },
        validateSurname(surname) {
            if (/\d/.test(surname)) {
                this.msg['surname'] = 'O sobrenome não pode conter números.';
            } else {
                this.msg['surname'] = '';
            }
        },
        validateEmail() {
            const formatoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.inputEmail);

            if (!formatoValido) {
                this.msg['email'] = 'E-mail inválido.';
            } else {
                this.msg['email'] = '';
            }
        },
        maskTel() {
            return this.inputTelephone && this.inputTelephone.length === 15 ? '(##) #####-####' : '(##) ####-#####';
        },
        validatePassword() {
            this.msg.password = this.inputPassword.length < 6 ? 'A senha deve conter no mínimo 6 caracteres.' : '';
        },
        validateConfirmPassword() {
            this.msg.confirmPassword = this.inputPassword !== this.inputConfirmPassword ? 'As senhas não correspondem.' : '';
        }
    },
    components: {
        Images,
    }
};
</script>

<style>
@import './StyleFormRegistration.css';
</style>
