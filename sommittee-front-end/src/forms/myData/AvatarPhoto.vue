<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-dialog v-model="dialogUpdate" width="700">
      <v-card outline class="pa-6">
        <web-cam :selectFirstDevice="true" ref="webcam"></web-cam>
        <div class="d-flex flex-column">
          <v-btn
            depressed
            color=""
            class="d-flex align-center"
            @click="capture"
          >
            <v-icon size="16">mdi-camera</v-icon>
            <span class="ml-1">Tirar foto</span>
          </v-btn>
          <v-btn
            depressed
            color=""
            class="mt-3"
            @click="$refs.inputUpload.click()"
          >
            <v-icon size="16">mdi-cloud-upload</v-icon>
            <span class="ml-1">Procurar foto</span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-avatar
      :size="size || 200"
      color="graySecondary"
      class="pointer"
      style="position: relative"
      @mouseover="upHere = true"
      @mouseleave="upHere = false"
    >
      <v-img v-if="avatarUrl" :src="avatarUrl" alt="Foto" />
      <v-icon color="white" v-else size="60">mdi-account</v-icon>
      <input
        v-show="false"
        ref="inputUpload"
        accept="image/*"
        type="file"
        @change="onUpload"
      />
      <div
        v-if="upHere || uploading"
        style="
          position: absolute;
          background-color: #00000060;
          width: 100%;
          height: 100%;
        "
        @click="dialogUpdate = true"
      >
        <div
          style="
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <v-icon v-if="!uploading" color="white">mdi-camera</v-icon>
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
    </v-avatar>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import { mapState } from "vuex";

export default {
  name: "AvatarPhoto",
  props: ["size"],
  components: {
    WebCam,
  },
  data() {
    return {
      dialogUpdate: false,
      uploading: false,
      upHere: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    avatarUrl() {
      return this.user ? this.user.avatar_url : null;
    },
  },

  watch: {
    avatarUrl(newUrl) {
      if (newUrl) {
        this.$nextTick(() => {
          this.$emit("input", newUrl);
        });
      }
    },
  },
  methods: {
    async capture() {
      this.dialogUpdate = false;

      const base64Data = this.$refs.webcam.capture();
      const mimeType = "image/jpeg";

      const byteCharacters = atob(base64Data.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const imageFile = new File([blob], "image.jpg", { type: mimeType });

      this.uploading = true;

      try {
        const updatedUser = await this.$store.dispatch(
          "auth/uploadAvatar",
          imageFile
        );

        this.$emit("input", updatedUser.avatar_url);

        this.$nextTick(() => {
          this.$emit("save");
        });

        this.$refs.inputUpload.value = "";
      } catch (e) {
        console.error("Erro ao fazer upload da imagem:", e);
        alert(
          "Erro ao fazer upload da imagem. Certifique-se de que a imagem tem menos de 2MB."
        );
      } finally {
        this.uploading = false;
      }
    },

    async onUpload(e) {
      this.dialogUpdate = false;

      const files = e.target.files;

      if (files[0]) {
        const imageFile = files[0];
        this.uploading = true;

        try {
          const updatedUser = await this.$store.dispatch(
            "auth/uploadAvatar",
            imageFile
          );

          this.$nextTick(() => {
            this.$emit("input", updatedUser.avatar_url);
          });

          this.$refs.inputUpload.value = "";
        } catch (e) {
          console.error("Erro ao fazer upload da imagem:", e);
          alert(
            "Erro ao fazer upload da imagem. Certifique-se de que a imagem tem menos de 2MB."
          );
        } finally {
          this.uploading = false;
        }
      }
    },
  },
};
</script>
