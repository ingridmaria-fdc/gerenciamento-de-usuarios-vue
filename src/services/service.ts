import { User } from "@/models/user";
import type { UserInterface } from "@/interfaces/user.interface";

export class Service {
  static async getUsers() {
    const response = await fetch("http://localhost:3001/users");
    return await response.json();
  }

  static async createUser(user: User) {
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  static async updateUser(id: string, dados: Partial<UserInterface>) {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
  }

  static async deleteUser(id: string) {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
  }
}
