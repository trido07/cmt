import { SetMetadata } from "@nestjs/common";

export enum Role {
  MANAGER = "ma",
  DRIVER = "dr",
  CUSTOMER = "cu",
  MASTER = "mas",
}

export const ROLES_KEY = "roles";
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);
