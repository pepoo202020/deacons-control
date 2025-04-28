"use server";

import db from "@/lib/prisma";

export default async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error while getting all users:", error);
  }
}
