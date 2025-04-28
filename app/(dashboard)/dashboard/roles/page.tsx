import Loader from "@/components/Loader";
import { getAllRoles } from "@/servers/dashboard/roles/get-all";
import RolesBreadcrumb from "@/ui/dashboard/roles/breadcrumb-roles";
import NewRoleButton from "@/ui/dashboard/roles/new-role-btn";
import RolesContent from "@/ui/dashboard/roles/roles-content";
import { Suspense } from "react";

export default async function RolesPage() {
  const roles = await getAllRoles();
  return (
    <div className="flex flex-col h-full relative">
      {/* breadcrumb */}
      <div className="flex-none">
        <div className="w-full px-4 py-4">
          <RolesBreadcrumb />
        </div>
      </div>
      {/* Roles Cards */}
      <div className="flex-1 min-w-0">
        <Suspense fallback={<Loader />}>
          <RolesContent roles={roles} />
        </Suspense>
      </div>
      {/* Pagination */}
      {/* new button action */}
      <NewRoleButton />
    </div>
  );
}
