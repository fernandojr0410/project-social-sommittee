<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="log"
          no-data-text="Nenhum log encontrado"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 50, 100, 200, 300, 400, 500],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.name`]="{ item }">
            <span>{{ item.user?.name }}</span>
          </template>

          <template v-slot:[`item.path`]="{ item }">
            <span>{{ item.path }}</span>
          </template>

          <template v-slot:[`item.method`]="{ item }">
            <span>{{ item.method }}</span>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <span>{{ item.status }}</span>
          </template>

          <template v-slot:[`item.avatar`]="{ item }">
            <v-avatar size="40">
              <v-img
                v-if="item.user?.avatar_url"
                :src="item.user.avatar_url"
                alt="Avatar"
              />

              <v-icon v-else size="40" color="orange"
                >mdi-account-circle</v-icon
              >
            </v-avatar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="showDetails(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="900px">
          <v-card>
            <v-card-title class="d-flex justify-space-between items-center">
              <span class="headline">Detalhes do Log</span>
              <v-btn icon @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text v-if="selectedLog">
              <v-card class="elevation-4" style="padding: 16px">
                <div style="padding-bottom: 16px">
                  <span
                    color="primary"
                    style="font-weight: bold; font-size: 16px"
                  >
                    Informações do Log:
                  </span>
                </div>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="selectedLog.path"
                      label="Rota"
                      readonly
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="selectedLog.method"
                      label="Método"
                      readonly
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="selectedLog.status"
                      label="Status"
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
                      v-model="selectedLog.payload.action"
                      label="Ação"
                      readonly
                      outlined
                      dense
                      hide-details
                    /> </v-col
                ></v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      v-model="formattedPayload"
                      label="Payload"
                      outlined
                      readonly
                      dense
                      hide-details
                      rows="6"
                      style="white-space: pre-wrap"
                    />
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                class="elvation-4"
                style="margin-top: 30px; padding: 16px"
              >
                <div style="padding-bottom: 16px">
                  <span
                    class="primary"
                    style="font-weight: bold; font-size: 16px"
                    >Informações do usuário:</span
                  >
                </div>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="selectedLog.user.name"
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
                      :value="selectedLog.user.identifier | cpf"
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
                      v-model="selectedLog.user.email"
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
                      :value="selectedLog.user.telephone | phone"
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
                      :value="selectedLog.user.role | roleUser"
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      loading: false,
      dialog: false,
      selectedLog: null,
      headers: [
        { text: "Nome completo", value: "name" },
        { text: "Rota", value: "path" },
        { text: "Método", value: "method" },
        { text: "Status", value: "status" },
        { text: "Foto", value: "avatar" },
        { text: "Detalhar", value: "actions" },
      ],
    };
  },

  computed: {
    log() {
      return this.$store.state.log.log;
    },
    formattedPayload() {
      return JSON.stringify(this.selectedLog.payload.personData, null, 2);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
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
      return await this.$store.dispatch("log/findAll");
    },
    showDetails(item) {
      this.selectedLog = item;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
