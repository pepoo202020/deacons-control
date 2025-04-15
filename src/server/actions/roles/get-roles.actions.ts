'use server'

import { prisma } from "@/lib/prisma";
import { Role, UserRole } from "@prisma/client";

export interface RoleWithUsers extends Role {
  UserRole: UserRole[];
}

export const getRoles = async () => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        UserRole: true,
      },
    });
    return roles as RoleWithUsers[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
