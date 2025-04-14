import BreadcrumpRoles from "@/ui/pages/roles/breadcrump-roles";
import RoleCard from "@/ui/pages/roles/role-card";
import AddNewRoleCard from "@/ui/pages/roles/add-new-role-card";
import { Role, UserRole } from "@prisma/client";
import { addNewRole } from "@/server/actions/roles/add-new-role.action";
import Roles from "@/ui/pages/roles/roles";
import { Suspense } from "react";
export interface RolesPerUsers extends Role {
  UserRole: UserRole[]
}


const roles: RolesPerUsers[] = [
  {
    id: "1",
    name: "Admin",
    description: "Admin",
    UserRole: [
      {
        id: "1",
        userId: "1",
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],

    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

// Loading skeleton component
function RoleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-blue-950 w-full max-w-[250px] h-[200px] rounded-lg animate-pulse">
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default async function RolesPage() {
  return (
    <div className="p-5 space-y-5 w-full h-[100vh-30rem] overflow-y-auto">
      {/* BREADCRUMBS COMPONENT */}
      <BreadcrumpRoles />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {/* ROLES CARDS COMPONENT */}
        <Suspense fallback={
          <>
            {[...Array(1)].map((_, i) => (
              <RoleCardSkeleton key={i} />
            ))}
          </>
        }>
          <Roles roles={roles} />
        </Suspense>
        {/* ADD NEW ROLE COMPONENT */}
        <AddNewRoleCard action={addNewRole} />
      </div>
      {/* PAGINATION COMPONENT */}
    </div>
  )
}
