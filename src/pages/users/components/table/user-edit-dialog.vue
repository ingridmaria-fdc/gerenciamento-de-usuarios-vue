<template>
  <v-dialog
    :model-value="show"
    @update:model-value="updateShow"
    max-width="500px"
  >
    <v-card
      width="600"
      height="600"
      class="ma-auto py-5 px-13 rounded-lg"
      outlined
    >
      <v-card-title class="justify-center py-5" color="primary">
        Editar usuário
      </v-card-title>

      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="localUser.name"
          label="Nome"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
        />

        <v-text-field
          v-model="localUser.registration"
          label="Matrícula"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-numeric"
        />

        <v-text-field
          v-model="localUser.age"
          label="Idade"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-numeric"
        />

        <v-select
          v-model="localUser.job"
          :items="['Analista', 'Gerente', 'Desenvolvedor']"
          label="Cargo"
          required
          clearable
          color="#01579B"
          variant="outlined"
          prepend-inner-icon="mdi-account-tie-outline"
          placeholder="Cargo"
        />

        <v-select
          v-model="localUser.type"
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
        />

        <div class="text-center">
          <v-btn
            color="green"
            type="submit"
            variant="elevated"
            block
            @click="save"
          >
            Salvar
          </v-btn>

          <v-btn
            color="red"
            variant="elevated"
            class="my-5"
            block
            @click="cancel"
          >
            Cancelar
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import type { UserInterface } from "@/interfaces/user.interface";
import { UserType } from "@/interfaces/user.auth.interface";

const userTypes = ref([
  { type: "Admin", value: UserType.Admin },
  { type: "Comum", value: UserType.Comum },
]);

const props = defineProps<{
  show: boolean;
  user: Partial<UserInterface>;
}>();
const emit = defineEmits(["update:show", "save"]);
const valid = ref(false);
const localUser = ref<Partial<UserInterface>>({ ...props.user });

watch(
  () => props.user,
  (user) => {
    localUser.value = { ...user };
  }
);

const updateShow = (value: boolean) => {
  emit("update:show", value);
};

const cancel = () => {
  emit("update:show", false);
};

const save = () => {
  if (valid.value) {
    emit("save", localUser.value);
    emit("update:show", false);
  }
};
</script>
