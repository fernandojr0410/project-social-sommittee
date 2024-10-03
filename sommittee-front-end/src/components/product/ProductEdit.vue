<template>
  <v-dialog
    :value="value"
    @input="(value) => $emit('input', value)"
    max-width="900px"
  >
    <v-card>
      <v-card-title class="flex justify-space-between items-center">
        <span class="headline">Editar registro</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
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
                v-model="updatedProduct.name"
                label="Produto"
                class="mr-3"
                outlined
                dense
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-model="updatedProduct.type"
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
                v-model="updatedProduct.description"
                label="Descrição"
                class="mr-3"
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
          text
          @click="saveChanges"
          style="
            background-color: #007fff;
            color: white;
            font-weight: bold;
            margin-right: 12px;
          "
        >
          SALVAR ALTERAÇÕES
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ProductEdit",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      updatedProduct: this.getProduct(),
      loading: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  watch: {
    id: {
      immediate: true,
      handler: async function (id) {
        if (id) {
          this.updatedProduct = await this.$store.dispatch(
            "product/findById",
            id
          );
        }
      },
    },
  },
  methods: {
    getProduct() {
      return {
        name: "",
        type: "",
        description: "",
      };
    },
    closeDialog() {
      this.$emit("input", false);
    },
    async saveChanges() {
      try {
        const productId = this.id;
        const updateData = {
          id: productId,
          payload: {
            name: this.updatedProduct.name,
            type: this.updatedProduct.type,
            description: this.updatedProduct.description,
          },
        };
        const response = await this.$store.dispatch(
          "product/update",
          updateData
        );
        this.$success("Registro atualizado!");
        this.closeDialog();
        return response;
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        throw error;
      }
    },
  },
};
</script>
