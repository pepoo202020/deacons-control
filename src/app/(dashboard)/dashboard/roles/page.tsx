import BreadcrumpRoles from "@/ui/pages/roles/breadcrump-roles";
import { Role, UserRole } from "@prisma/client";
import Roles from "@/ui/pages/roles/roles";
import { Suspense } from "react";
import AddRoleSection from "@/ui/pages/roles/add-role-section";
import { getRoles } from "@/server/actions/roles/get-roles.actions";
import { getUsers } from "@/server/actions/users/get-users.action";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export interface RolesPerUsers extends Role {
  UserRole: UserRole[]
}

// Loading skeleton component with configurable count
function RoleCardSkeletons({ count = 6 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-blue-950 w-full rounded-lg animate-pulse
                     shadow-sm hover:shadow-md transition-all duration-200
                     relative overflow-hidden"
        >
          <div className="aspect-[4/3] flex flex-col items-center justify-center p-6 space-y-4">
            {/* Icon Skeleton */}
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/20 dark:to-gray-700/20" />
            </div>

            {/* Title Skeleton */}
            <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded-md" />

            {/* Description Skeleton */}
            <div className="space-y-2 w-full">
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Users Count Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/80 to-transparent dark:from-blue-950/80">
            <div className="flex items-center justify-center gap-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Error boundary component
function RolesErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="col-span-full p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <MdOutlineAdminPanelSettings className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Failed to load roles
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {error.message}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
                   text-white bg-red-600 rounded-md hover:bg-red-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                   transition-colors duration-200"
      >
        Try again
      </button>
    </div>
  );
}

export default async function RolesPage() {
  const [roles, users] = await Promise.all([
    getRoles(),
    getUsers()
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header Section */}
      <div className="flex-none bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-4 py-4">
          <BreadcrumpRoles />
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-0">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="w-full p-4 lg:p-6">
            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Roles Grid Section - Takes most space */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
                  <Suspense
                    fallback={
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
                        <RoleCardSkeletons count={8} />
                      </div>
                    }
                  >
                    <Roles roles={roles} availableUsers={users} />
                    <AddRoleSection />
                  </Suspense>
                </div>
              </div>



            </div>

            {/* Pagination Section - If needed */}
            <div className="mt-8 flex justify-center">
              {/* Pagination component will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}