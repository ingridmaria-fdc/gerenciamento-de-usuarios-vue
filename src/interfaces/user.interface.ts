import { UserType } from "@/interfaces/user.auth.interface";

export interface UserInterface {
  id: string;
  name: string;
  registration: number;
  age: number;
  job: string;
  type: UserType;
}
