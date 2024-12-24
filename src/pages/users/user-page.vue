<template>
  <v-app class="background">
    <HeaderPage />
    <UsersTable />
  </v-app>
</template>
<script setup lang="ts">
import UsersTable from "@/pages/users/components/table/user-table.vue";
import HeaderPage from "@/pages/users/header-page.vue";
</script>
<style scoped>
.background {
  background-color: #e9e9e9 !important;
}
</style>
