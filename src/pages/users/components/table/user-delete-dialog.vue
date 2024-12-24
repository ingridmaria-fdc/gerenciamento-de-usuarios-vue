<template>
  <v-dialog
    :model-value="show"
    @update:model-value="updateShow"
    max-width="500px"
  >
    <v-card class="py-10">
      <v-card-text>
        <div class="text-center">
          <v-icon color="red" icon="mdi-delete-circle" size="40px" />

          <p class="text-h4 font-weight-black">Excluir usuário</p>

          <p>Tem certeza que deseja excluir este usuário?</p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="elevated" @click="cancel">Cancelar</v-btn>
        <v-btn color="green" variant="elevated" @click="confirm">Excluir</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

defineProps<{ show: boolean; userId?: string }>();
const emit = defineEmits(["update:show", "confirm"]);

const cancel = () => {
  emit("update:show", false);
};

const updateShow = (value: boolean) => {
  emit("update:show", value);
};

const confirm = () => {
  emit("confirm");
  emit("update:show", false);
};
</script>
