<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="user"
          no-data-text="Nenhum usuário encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.identifier`]="{ item }">
            <span>{{ item.identifier | cpf }}</span>
          </template>

          <template v-slot:[`item.telephone`]="{ item }">
            <span>{{ item.telephone | phone }}</span>
          </template>

          <template v-slot:[`item.role`]="{ item }">
            <span>{{ item.role | roleUser }}</span>
          </template>

          <!-- :color="isSelected(item) ? 'primary' : ''" -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="showDetails(item)">mdi-eye</v-icon>

            <v-icon class="mr-2" color="blue" @click="editItem(item)"
              >mdi-pencil</v-icon
            >

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="d-flex justify-space-between items-center">
          <span class="headline">Detalhes do usuário</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px"
                >Informações do usuário:</span
              >
            </div>

            <v-row justify="center" align="center">
              <v-col
                cols="auto"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <v-avatar size="120">
                  <v-img
                    v-if="selectedUser && selectedUser.avatar_url"
                    :src="selectedUser.avatar_url"
                    alt="Avatar"
                  />
                  <v-icon v-else size="120" color="orange"
                    >mdi-account-circle</v-icon
                  >
                </v-avatar>
                <span
                  style="font-weight: 400; margin-top: 8px; font-size: 16px"
                  color="primary"
                  >Foto perfil</span
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedUser"
                  v-model="selectedUser.name"
                  label="Nome completo"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-if="selectedUser"
                  :value="selectedUser.identifier | cpf"
                  label="CPF"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedUser"
                  v-model="selectedUser.email"
                  label="E-mail"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedUser"
                  :value="selectedUser.telephone | phone"
                  label="Telefone"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedUser"
                  :value="selectedUser.role | roleUser"
                  label="Tipo acesso"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <UserCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdUser"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/filters";
import UserCreate from "./userCreate.vue";

export default {
  name: "index",
  components: { UserCreate },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedUser: null,
      createDialog: false,
      headers: [
        { text: "Data criação", value: "created_at" },
        { text: "Nome completo", value: "name" },
        { text: "CPF", value: "identifier" },
        { text: "Telefone", value: "telephone" },
        { text: "Tipo acesso", value: "role" },
        { text: "Ações", value: "actions" },
      ],
      formatDate,
    };
  },
  computed: {
    user() {
      return this.$store.state.userColaborator.user;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        this.findAll();
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async findAll() {
      return await this.$store.dispatch("userColaborator/findAll");
    },
    showDetails(item) {
      this.selectedUser = item;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },

    async createdUser(newUser) {
      try {
        await this.$store.dispatch("userColaborator/create", newUser);
        this.success("Registro criado!");
        this.loadData();
        this.createDialog = false;
      } catch (error) {
        this.error("Erro ao criar registro!");
        throw error;
      }
    },
  },
};
</script>
