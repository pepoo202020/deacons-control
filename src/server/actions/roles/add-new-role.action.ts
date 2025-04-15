'use server'
import { getRoleByName } from "@/server/db/get-role-by-name.db"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const NewRolesResponses = [
  {
    success: true,
    title: {EN: "Success", AR: "تم إنشاء الصلاحية بنجاح"},
    message: {EN: "Role created successfully", AR: "تم إنشاء الصلاحية بنجاح"},
  },
  {
    success: false,
    title: {EN: "Error", AR: "خطأ"},
    message: {EN: "Role already exists", AR: "الصلاحية موجودة بالفعل"},

  }
]

export const addNewRole = async (formData: FormData) => {
  // get form data
  const name = formData.get('name')
  const description = formData.get('description')
  try {
    // check if role already exists
  const existingRole = await getRoleByName(name as string)
  if (existingRole) {
    return {
      success: false,
      title: NewRolesResponses[1].title.AR,
      message: NewRolesResponses[1].message.AR
    }
  }
  // create new role
  const newRole = await prisma.role.create({
    data: {
      name: name as string,
      description: description as string,
    }
  })
  return {
    success: true,
    title: NewRolesResponses[0].title.AR,
    message: NewRolesResponses[0].message.AR
    }

    revalidatePath('/dashboard/roles');
  } catch (error) {
    console.error(error)
    return {
      success: false,
      title: NewRolesResponses[1].title.AR,
      message: NewRolesResponses[1].message.AR
    }
  }
}