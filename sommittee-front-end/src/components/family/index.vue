<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div style="display: flex; align-items: center">
          <FamilySearch @search="handleSearch" />
          <FamilyRefresh />
        </div>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="family || []"
          :items-per-page="10"
          no-data-text="Nenhuma família encontrada"
          :footer-props="{
            'items-per-page-options': [10, 20, 30],
            'show-current-page': true,
          }"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ formatDate(item.created_at) }}</span>
          </template>

          <template v-slot:[`item.function`]="{ item }">
            {{
              item.people_family && item.people_family.length > 0
                ? $options.filters.functionFamily(
                    item.people_family[0].function
                  )
                : "N/A"
            }}
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <div v-if="item.people_family && item.people_family.length > 0">
              <div
                v-for="(familyMember, index) in item.people_family"
                :key="index"
              >
                <span>{{
                  familyMember.people?.name || "Nome não definido"
                }}</span>
              </div>
            </div>
            <span v-else>Sem membros cadastrados</span>
          </template>

          <template v-slot:[`item.zip_code`]="{ item }">
            <span>{{ item.address?.zip_code | cep }}</span>
          </template>

          <template v-slot:[`item.street`]="{ item }">
            <span>{{ item.address?.street }}</span>
          </template>

          <template v-slot:[`item.number`]="{ item }">
            <span>{{ item.address?.number }}</span>
          </template>

          <template v-slot:[`item.neighborhood`]="{ item }">
            <span>{{ item.address?.neighborhood }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              :color="isSelected(item) ? 'primary' : ''"
              @click="showDetails(item)"
            >
              mdi-eye
            </v-icon>

            <v-icon class="mr-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon class="mr-2" color="red" @click="confirmDelete(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <FamilyEdit
          v-model="editDialog"
          :id="updatedFamilyId"
          @save="saveUpdatedFamily"
        />

        <FamilyDelete
          :dialog="deleteDialog"
          :id="itemToDelete"
          @close="handleDeleteClose"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="flex justify-space-between items-center">
          <span class="headline">Detalhes do registro</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation" style="margin-top: 30px; padding: 16px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Pessoas adicionadas à família:
              </span>
            </div>

            <v-list v-if="familyMembers.length > 0">
              <v-list-item-group>
                <v-list-item
                  v-for="(person, index) in familyMembers"
                  :key="index"
                  class="elevation-2 mb-2"
                  style="border: 1px solid #ccc; padding: 10px"
                  :ripple="false"
                  dense
                  inactive
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>Nome:</strong> {{ person.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong>Função:</strong>
                      {{ person.function | functionFamily }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <div v-else>
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Nenhuma pessoa adicionada à família
              </span>
            </div>
          </v-card>

          <v-card class="elevation-4" style="padding: 16px; margin-top: 30px">
            <div style="padding-bottom: 16px">
              <span color="primary" style="font-weight: bold; font-size: 16px">
                Informações do endereço:
              </span>
            </div>

            <v-row>
              <v-col>
                <v-text-field
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="selectedPeopleFamily.address.zip_code"
                  class="mr-3"
                  label="CEP"
                  v-mask="'#####-###'"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="selectedPeopleFamily.address.street"
                  label="Rua"
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
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="selectedPeopleFamily.address.number"
                  label="Número"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="selectedPeopleFamily.address.neighborhood"
                  label="Bairro"
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
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="selectedPeopleFamily.address.complement"
                  label="Complemento"
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
                  v-if="selectedPeopleFamily && selectedPeopleFamily.address"
                  v-model="cityAndState"
                  label="Cidade"
                  class="mr-3"
                  readonly
                  outlined
                  dense
                  hide-details
                  style="width: 98.5%"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <FamilyCreate
      :dialog="createDialog"
      @close="createDialog = false"
      @save="createdFamily"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/filters";
import { states } from "@/assets/state";
import FamilyCreate from "./FamilyCreate.vue";
import FamilyEdit from "./FamilyEdit.vue";
import FamilyDelete from "./FamilyDelete.vue";
import FamilySearch from "./FamilySearch.vue";
import FamilyRefresh from "./FamilyRefresh.vue";

export default {
  name: "index",
  components: {
    FamilyCreate,
    FamilyEdit,
    FamilyDelete,
    FamilySearch,
    FamilyRefresh,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedPeopleFamily: null,
      createDialog: false,
      editDialog: false,
      updatedFamilyId: null,
      deleteDialog: false,
      itemToDelete: null,
      familyMembers: [],
      search: "",
      headers: [
        { text: "Data criação", value: "created_at" },
        { text: "Nome", value: "name" },
        { text: "Função", value: "function" },
        { text: "CEP", value: "zip_code" },
        { text: "Rua", value: "street" },
        { text: "Número", value: "number" },
        { text: "Bairro", value: "neighborhood" },
        { text: "Ações", value: "actions" },
      ],
      formatDate,
      menu2: false,
      selectedPeopleFamily: {
        people: {
          birth_date: new Date().toISOString().substr(0, 10),
        },
      },
      states,
    };
  },
  computed: {
    family() {
      return this.$store.state.family.family;
    },
    cityAndState() {
      const city = this.selectedPeopleFamily?.address.city || "";
      const state = this.selectedPeopleFamily?.address.state || "";
      return city && state ? `${city}, ${state}` : city || state;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    addPersonToFamily() {
      if (this.selectedPeople && this.selectedFunction) {
        this.familyMembers.push({
          id: this.selectedPeople.id,
          name: this.selectedPeople.name,
          function: this.selectedFunction,
          address: this.selectedPeople.address,
        });

        this.familyMembers = [...this.familyMembers];

        this.selectedFunction = null;
      }
    },

    async loadData() {
      this.loading = true;
      try {
        await this.findAll();
      } catch (error) {
        this.$error("Erro ao carregar dados!");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async findAll() {
      await this.$store.dispatch("family/findAll");
    },
    async handleSearch(search) {
      this.search = search;
    },

    showDetails(item) {
      this.selectedPeopleFamily = item;

      if (item.people_family && item.people_family.length > 0) {
        this.familyMembers = item.people_family.map((personFamily) => {
          return {
            name: personFamily.people?.name || "Nome não definido",
            function: personFamily.function || "Função não definida",
            address: item.address || {},
          };
        });
      } else {
        this.familyMembers = [];
      }

      this.dialog = true;
    },

    editItem(item) {
      if (item.people_family && item.people_family.length > 0) {
        this.familyMembers = item.people_family.map((personFamily) => {
          return {
            name: personFamily.people?.name || "Nome não definido",
            function: personFamily?.function || "Função não definida",
            address: item.address || {},
          };
        });
      } else {
        this.familyMembers = [];
      }

      this.selectedFunction = item.people_family?.[0]?.function || "";

      this.updatedFamilyId = item.id;
      this.updatedFamily = {
        ...item,
        address: { ...item.address },
      };

      this.editDialog = true;

      console.log("familyMembers:", this.familyMembers);
      console.log("updatedFamily:", this.updatedFamily);
      console.log("selectedFunction:", this.selectedFunction);
    },

    async saveUpdatedFamily(updatedFamily) {
      try {
        await this.$store.dispatch("family/update", updatedFamily);
        this.loadData();
        this.editDialog = false;
      } catch (error) {
        this.$error("Erro ao atualizar registro!");
        throw error;
      }
    },

    async createdFamily(newFamily) {
      try {
        await this.$store.dispatch("family/create", newFamily);
        this.$success("Registro criado!");
        this.loadData();
        this.createDialog = false;
      } catch (error) {
        this.$error("Erro ao criar registro!");
        throw error;
      }
    },
    isSelected(item) {
      return this.updatedFamilyId === item.id;
    },
    closeDialog() {
      this.dialog = false;
    },
    confirmDelete(item) {
      this.itemToDelete = item.id;
      this.deleteDialog = true;
    },
    handleDeleteClose() {
      this.deleteDialog = false;
      this.itemToDelete = null;
    },
  },
};
</script>
