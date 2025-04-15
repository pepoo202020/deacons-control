import { prisma } from "@/lib/prisma";
import { Role, UserRole } from "@prisma/client";
import { cache } from "react";

export interface RoleWithUsers extends Role {
  UserRole: UserRole[];
}


export const getRoleByNameError = {
  NOT_FOUND: {EN: "Role not found", AR: "لم يتم العثور على الصلاحية"},
  INVALID_NAME: {EN: "Invalid role name provided", AR: "اسم الصلاحية غير صالح"},
  DATABASE_ERROR: {EN: "Database error occurred while fetching role", AR: "حدث خطأ في البيانات الخاصة بالصلاحية"},
} as const;

/**
 * Get a role by its name with associated users
 * @param name - The name of the role to fetch
 * @returns Promise containing the role with its users or null
 * @throws Error if database operation fails
 */
export const getRoleByName = cache(async (name : string) : Promise<RoleWithUsers | null> => {
  // validate name
  if (!name) throw new Error(getRoleByNameError.INVALID_NAME.EN)
  try {
    const role = await prisma.role.findUnique({
      where: {
        name: name.trim(),
      },
      include: {
        UserRole: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        }
      }
    });
    if (!role) return null;
    return role as RoleWithUsers;
  } catch (error) {
    console.error(error)
    throw new Error(getRoleByNameError.DATABASE_ERROR.EN)
  }
})