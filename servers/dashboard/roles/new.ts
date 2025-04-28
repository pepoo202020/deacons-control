"use server";

import { NEW_ROLE_SERVER_RESPONSE_DATA } from "@/constants/roles.data";
import db from "@/lib/prisma";
import { customResponse } from "@/utils/custom-response";
import { revalidatePath } from "next/cache";

export async function newRole(
  roleName: string,
  roleDescription: string,
  lang: "AR" | "EN"
) {
  try {
    const existingRole = await db.role.findUnique({
      where: { name: roleName },
    });
    if (existingRole) {
      return customResponse({
        success: false,
        title: NEW_ROLE_SERVER_RESPONSE_DATA.errors.existingRole.title[lang],
        message:
          NEW_ROLE_SERVER_RESPONSE_DATA.errors.existingRole.description[lang],
      });
    }
    await db.role.create({
      data: {
        name: roleName,
        description: roleDescription,
      },
    });
    revalidatePath("/roles");
    return customResponse({
      success: true,
      title: NEW_ROLE_SERVER_RESPONSE_DATA.success.title[lang],
      message: NEW_ROLE_SERVER_RESPONSE_DATA.success.description[lang],
      data: { roleName, roleDescription },
    });
  } catch (error) {
    return customResponse({
      success: false,
      title: NEW_ROLE_SERVER_RESPONSE_DATA.errors.unknown.title[lang],
      message: NEW_ROLE_SERVER_RESPONSE_DATA.errors.unknown.description[lang],
    });
  }
}
