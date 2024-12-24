<template>
  <v-container style="margin-top: 70px">
    <v-data-table :headers="headers" :items="users" class="border mb-4">
      <template v-slot:top>
        <v-toolbar flat color="primary">
          <v-toolbar-title>
            Usuários
            <v-btn
              :disabled="!isUserAdmin"
              append-icon="mdi-plus"
              class="md ml-5"
              variant="outlined"
              dark
              to="/users/components/form/user-create-page"
            >
              Novo
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.type="{ item }">
        <span>{{ item.type === UserType.Admin ? "Admin" : "Comum" }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          :disabled="!isUserAdmin"
          color="primary"
          class="me-2"
          size="small"
          @click="editUser(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red"
          size="small"
          @click="deleteUser(item)"
          :disabled="!isUserAdmin"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <p>Nenhum usuário encontrado</p>
      </template>
    </v-data-table>

    <DeleteDialog
      :show="dialogDelete"
      :userId="editedUser.id"
      @update:show="dialogDelete = $event"
      @confirm="deleteUserConfirm"
    />
    <EditDialog
      :show="dialogEdit"
      :user="editedUser"
      @update:show="dialogEdit = $event"
      @save="editUserConfirm"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { User } from "@/models/user";
import { Service } from "@/services/service";
import { useAuthStore } from "@/stores/auth.store";
import { UserType } from "@/interfaces/user.auth.interface";
import type { UserInterface } from "@/interfaces/user.interface";
import DeleteDialog from "@/pages/users/components/table/user-delete-dialog.vue";
import EditDialog from "@/pages/users/components/table/user-edit-dialog.vue";

const users = ref<UserInterface[]>([]);
const editedUser = ref<Partial<UserInterface>>({});
const dialogDelete = ref(false);
const dialogEdit = ref(false);

const headers = [
  { title: "Nome", sortable: true, key: "name" },
  { title: "Matrícula", sortable: true, key: "registration" },
  { title: "Idade", sortable: true, key: "age" },
  { title: "Cargo", sortable: true, key: "job" },
  { title: "Tipo", sortable: true, key: "type" },
  { title: "Ações", sortable: false, key: "actions" },
];

const authStore = useAuthStore();
const isUserAdmin = computed(() => authStore.isUserAdmin());

const deleteUserConfirm = async () => {
  if (editedUser.value && editedUser.value.id) {
    await Service.deleteUser(editedUser.value.id);
    users.value = users.value.filter((u) => u.id !== editedUser.value!.id);
  }
};

const editUserConfirm = async (updatedUser: Partial<UserInterface>) => {
  if (updatedUser.id) {
    await Service.updateUser(updatedUser.id, updatedUser);
    users.value = users.value.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
  }
};

const deleteUser = (user: UserInterface) => {
  editedUser.value = { ...user };
  dialogDelete.value = true;
};

const editUser = (user: UserInterface) => {
  editedUser.value = { ...user };
  dialogEdit.value = true;
};

onMounted(async () => {
  const fetchedUsers = await Service.getUsers();
  users.value = fetchedUsers.map(
    (user: UserInterface) =>
      new User(
        user.id,
        user.name,
        user.registration,
        user.age,
        user.job,
        user.type
      )
  );
});
</script>
