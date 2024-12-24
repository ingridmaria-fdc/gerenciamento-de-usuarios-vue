<template>
  <v-app-bar>
    <v-avatar color="primary" class="ml-5">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>

    <v-app-bar-title>Gerenciamento de usuários</v-app-bar-title>

    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down" variant="outlined">
          {{ authStore.user?.user }}
        </v-btn>
      </template>
      <v-card min-width="100px">
        <v-list :lines="false" density="compact" nav>
          <v-list-item>
            <v-list-item-title>
              <v-btn class="ma-2" flat to="/auth/login-page">
                <v-icon icon="mdi-arrow-left" start></v-icon>
                Sair
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
</script>
