import { defineStore } from "pinia";
import { UserType } from "@/interfaces/user.auth.interface";
import type { UserAuth } from "@/interfaces/user.auth.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: <UserAuth | null>null,
  }),
  actions: {
    setUser(user: UserAuth) {
      this.user = user;
    },
    isUserAdmin() {
      return this.user?.type === UserType.Admin;
    },
    isUserComum() {
      return this.user?.type === UserType.Comum;
    },
  },
  persist: true,
});
