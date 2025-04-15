import { getRoles } from "@/server/actions/roles/get-roles.actions";
import Breadcrumbs from "@/ui/components/shared/breadcrumps";
import UsersFiltersSection from "@/ui/pages/users/users-filters-section";

const header = {
  EN: "Users Management",
  AR: "إدارة المستخدمين",
} as const;

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
];

export default async function BreadcrumpUsers() {
  const [roles] = await Promise.all([
    getRoles(),
  ]);

  return (
    <div className="breadcrumbs">
      {/* BREADCRUMBS COMPONENT */}
      <Breadcrumbs />

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white hidden md:block">
        {header.AR}
      </h1>

      {/* FILTERS FOR USERS COMPONENT */}
      <UsersFiltersSection roles={roles} classes={classes} />


    </div>
  );
}