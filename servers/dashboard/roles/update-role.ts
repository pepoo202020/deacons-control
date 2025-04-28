"use server";
import { ROLE_EDIT_DIALOG_DATA } from "@/constants/roles.data";
import db from "@/lib/prisma";
import { customResponse } from "@/utils/custom-response";
import { revalidatePath } from "next/cache";

export default async function updateRole(
  roleId: string,
  roleName: string,
  roleDescription: string,
  lang: "AR" | "EN"
) {
  try {
    const role = await db.role.findUnique({ where: { id: roleId } });
    if (!role) {
      return customResponse({
        success: false,
        title:
          ROLE_EDIT_DIALOG_DATA.responses.errors.notExistingRole.title[lang],
        message:
          ROLE_EDIT_DIALOG_DATA.responses.errors.notExistingRole.description[
            lang
          ],
      });
    }
    await db.role.update({
      where: { id: roleId },
      data: { name: roleName, description: roleDescription },
    });
    revalidatePath("/roles");
    return customResponse({
      success: true,
      title: ROLE_EDIT_DIALOG_DATA.responses.success.title[lang],
      message: ROLE_EDIT_DIALOG_DATA.responses.success.description[lang],
    });
  } catch (error) {
    console.error("Error in updating role:", error);
    return customResponse({
      success: false,
      title: ROLE_EDIT_DIALOG_DATA.responses.errors.unknown.title[lang],
      message: ROLE_EDIT_DIALOG_DATA.responses.errors.unknown.description[lang],
    });
  }
}
