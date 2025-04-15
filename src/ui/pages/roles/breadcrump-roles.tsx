import Breadcrumbs from "@/ui/components/shared/breadcrumps";
import FilterRoles from "@/ui/pages/roles/filter-roles";

const header = {
  EN: "Roles Management",
  AR: "إدارة الصلاحيات",
}

export default function BreadcrumpRoles() {
  return (
    <div className="breadcrumbs">
      {/* BREADCRUMBS COMPONENT */}
      <Breadcrumbs />
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white hidden md:block">
        {header.AR}
      </h1>
      {/* FILTERS FOR ROLES COMPONENT */}
      <FilterRoles />
    </div>
  )
}
