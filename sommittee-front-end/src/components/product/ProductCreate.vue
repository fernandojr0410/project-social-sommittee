<template>
  <v-container>
    <v-fab-transition>
      <v-btn
        fixed
        fab
        right
        bottom
        @click="openDialog"
        color="green"
        x-large
        style="color: white"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>Cadastrar registro</v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do produto:
              </span>
            </div>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="createdProduct.name"
                  label="Produto"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="createdProduct.type"
                  label="Categoria"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                  :items="[
                    { text: 'Roupas', value: 'clothes' },
                    { text: 'Calçados', value: 'shoes' },
                    { text: 'Acessórios', value: 'accessories' },
                    { text: 'Beleza e Cuidados Pessoais', value: 'beauty' },
                    { text: 'Alimentos e Bebidas', value: 'food' },
                    { text: 'Eletrônicos', value: 'electronics' },
                    { text: 'Casa e Decoração', value: 'home' },
                    { text: 'Esportes e Lazer', value: 'sports' },
                    { text: 'Brinquedos e Jogos', value: 'toys' },
                    { text: 'Saúde e Bem-estar', value: 'health' },
                  ]"
                  item-value="value"
                  item-text="text"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="createdProduct.description"
                  label="Descrição"
                  class="mr-3"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="closeDialog"
            color="primary"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="green"
            @click="createProduct"
            style="color: white; font-weight: bold; margin-right: 12px"
          >
            CRIAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "ProductCreate",
  data() {
    return {
      dialog: false,
      createdProduct: this.getProduct(),
      loading: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  methods: {
    getProduct() {
      return {
        name: "",
        type: "",
        description: "",
      };
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },

    async createProduct() {
      const productData = {
        name: this.createdProduct.name,
        type: this.createdProduct.type,
        description: this.createdProduct.description,
      };
      console.log("Product Data:", productData);

      try {
        const response = await this.$store.dispatch(
          "product/create",
          productData
        );
        console.log("Response:", response);
        if (response) {
          this.$success("Registro criado!");
          this.$store.dispatch("product/findAll");
          this.createdProduct = "";
          this.closeDialog();
        } else {
          this.$error("Erro ao criar produto!");
        }
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },
  },
};
</script>
