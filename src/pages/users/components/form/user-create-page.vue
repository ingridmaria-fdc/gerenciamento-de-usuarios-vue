<template>
  <HeaderPage />
  <v-container>
    <v-card
      width="900"
      height="600"
      class="ma-auto py-5 px-13 rounded-lg"
      outlined
    >
      <v-card-title class="justify-center py-5" color="primary">
        Cadastro de usuário
      </v-card-title>

      <v-form v-model="form" @submit.prevent="createUser">
        <v-text-field
          v-model="name"
          label="Nome"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
          :readonly="loading"
          :rules="[required]"
        />

        <v-text-field
          v-model="registration"
          label="Matrícula"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-numeric"
          :readonly="loading"
          :rules="[required, uniqueRegistration]"
        />

        <v-text-field
          v-model="age"
          label="Idade"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-numeric"
          :readonly="loading"
          :rules="[required, betweenAge]"
        />

        <v-select
          v-model="job"
          :items="['Analista', 'Gerente', 'Desenvolvedor']"
          label="Cargo"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-account-tie-outline"
          placeholder="Cargo"
          :readonly="loading"
          :rules="[required]"
        />

        <v-select
          v-model="type"
          :items="userTypes"
          item-title="type"
          item-value="value"
          label="Tipo de Usuário"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-account-key-outline"
          placeholder="Tipo de usuário"
          :readonly="loading"
          :rules="[required]"
        />

        <div class="text-center">
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="green"
            type="submit"
            variant="elevated"
            block
          >
            Salvar
          </v-btn>

          <v-btn
            :loading="loading"
            color="red"
            type="submit"
            variant="elevated"
            class="my-5"
            block
            to="/users/user-page"
          >
            Cancelar
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>

  <v-snackbar v-model="showSuccess" timeout="3000" color="success">
    {{ successMessage }}
  </v-snackbar>

  <v-snackbar v-model="showError" timeout="3000" color="error">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Service } from "@/services/service";
import { User } from "@/models/user";
import { useRouter } from "vue-router";
import { UserType } from "@/interfaces/user.auth.interface";
import HeaderPage from "@/pages/users/header-page.vue";

const userTypes = ref([
  { type: "Admin", value: UserType.Admin },
  { type: "Comum", value: UserType.Comum },
]);

const loading = ref(false);
const router = useRouter();
const form = ref(false);

const successMessage = ref("");
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref("");

const id = ref();
const name = ref("");
const registration = ref();
const age = ref();
const job = ref();
const type = ref();

const required = (value: string) => !!value || "Campo obrigatório";
const uniqueRegistration = async (value: number) => {
  const users = await Service.getUsers();
  return (
    !users.some((user: any) => user.registration === value) ||
    "Matrícula deve ser única"
  );
};
const betweenAge = (value: number) =>
  (value >= 18 && value <= 60) || "Idade deve ser entre 18 e 60";

const createUser = async () => {
  loading.value = true;
  try {
    const user = new User(
      id.value,
      name.value,
      registration.value,
      age.value,
      job.value,
      type.value
    );
    await Service.createUser(user);
    successMessage.value = "Usuário criado com sucesso!";
    showSuccess.value = true;
    router.push("/users/user-page");
  } catch {
    errorMessage.value =
      "Erro ao tentar criar o usuário. Verifique os campos e tente novamente.";
    showError.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
