import { Role, User, UserRole } from "@prisma/client";

export interface ResponseIF {
  success: boolean;
  title: string;
  message: string;
  data?: any;
  error?: any;
}

export interface UserRoleWithUser extends UserRole {
  user: User;
}

export interface RoleWithUserRole extends Role {
  UserRole: UserRoleWithUser[];
}

export interface UserRoleWithRole extends UserRole {
  role: Role;
}

export interface UserWithUserRole extends User {
  userRoles: UserRoleWithRole[];
}
