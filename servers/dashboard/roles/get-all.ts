import db from "@/lib/prisma";

export async function getAllRoles() {
  try {
    const roles = await db.role.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        UserRole: {
          include: {
            user: true,
          },
        },
      },
    });
    return roles;
  } catch (error) {
    console.error("Error in getting all roles: ", error);
  }
}
