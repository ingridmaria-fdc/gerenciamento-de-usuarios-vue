export interface UserAuth {
  id: number;
  user: string;
  password: string;
  type: UserType;
}

export enum UserType {
  Admin = 1,
  Comum = 2,
}
