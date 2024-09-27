import { Role } from "./Role";

export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  address!: string;
  phoneNumber!: string;
  status!: UserStatus;
  role!: Role;
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED'
}
