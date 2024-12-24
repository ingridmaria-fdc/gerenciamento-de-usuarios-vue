<template>
  <v-app class="background px-5">
    <v-card
      width="500"
      height="400"
      class="ma-auto py-5 px-13 rounded-lg"
      outlined
    >
      <v-card-title class="justify-center py-5 project-name">
        Gerenciamento de usuários
      </v-card-title>

      <v-form v-model="form" @submit.prevent="onSubmit" class="py-5">
        <v-row>
          <v-text-field
            v-model="user"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Usuário"
            clearable
            color="#01579B"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
          />
        </v-row>

        <v-row>
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            label="Senha"
            clearable
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
          />
        </v-row>

        <v-row class="py-6">
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="primary"
            type="submit"
            variant="elevated"
            block
          >
            Login
          </v-btn>
        </v-row>
      </v-form>

      <v-snackbar v-model="showError" timeout="3000" color="error">
        {{ errorMessage }}
      </v-snackbar>
    </v-card>

    <footer class="login-footer">
      &copy; 2024 - Desenvolvido por Ingrid Ferreira :)
    </footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const required = (value: string) => {
  return !!value || "Campo obrigatório";
};

const router = useRouter();
const store = useAuthStore();
const form = ref(false);
const loading = ref(false);

const showError = ref(false);
const errorMessage = ref("");

const user = ref("");
const password = ref("");

const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `http://localhost:3001/login?user=${user.value}&password=${password.value}`
    );
    const data = await response.json();

    if (data.length > 0) {
      store.setUser(data[0]);
      router.push("/users/user-page");
    }
  } catch (error) {
    errorMessage.value =
      "Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.";
    showError.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.project-name {
  font-size: 1.2rem;
  color: #172b4d;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  margin-left: 3rem;
}

.background {
  background-color: #172b4d !important;
}

.login-footer {
  position: absolute;
  bottom: 10px;
  font-size: 16px;
  width: 100%;
  text-align: center;
  color: white;
}
</style>
