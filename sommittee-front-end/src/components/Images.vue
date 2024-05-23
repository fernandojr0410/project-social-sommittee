<template>
    <div class="container">
        <div class="logo" @click="redirectHome">
            <img :src="require('@/assets/img/logo.png')" alt="Logo">
            <div class="title">
                <div class="bold">Juntos,</div>
                <div>Fazemos a</div>
                <div>Diferença!</div>
            </div>
        </div>
        <div class="imgFundo"></div>
    </div>
</template>

<script>
export default {
    name: 'Images',
    methods: {
        redirectHome() {
            this.$router.push("/Home")
        }
    }
};
</script>

<style>
.container {
    position: relative;
}

.logo {
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 1;
    cursor: pointer;
}

.logo img {
    width: 100%;
    max-width: 300px;
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
    display: flex;
    text-align: left;
}

.title .bold {
    font-weight: bold;
}

.imgFundo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(253, 197, 58, 0.6), rgba(253, 117, 48, 0.6)), url('../assets/img/imgFundo.png');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>