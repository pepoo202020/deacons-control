import Breadcrumbs from "@/ui/components/shared/breadcrumps";
import FilterRoles from "@/ui/pages/roles/filter-roles";

export default function BreadcrumpRoles() {
  return (
    <div className="flex items-center justify-between w-full bg-white dark:bg-blue-950 p-4 rounded-lg">
      {/* BREADCRUMBS COMPONENT */}
      <Breadcrumbs />
      {/* FILTERS FOR ROLES COMPONENT */}
      <FilterRoles />
    </div>
  )
}
