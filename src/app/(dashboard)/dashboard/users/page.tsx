import BreadcrumpUsers from "@/ui/pages/users/breadcrump-users";
import { UsersTable } from "@/ui/pages/users/users-table";
import { getUsers } from "@/server/actions/users/get-users.action";
import { getRoles } from "@/server/actions/roles/get-roles.actions";
import { Suspense } from "react";
import { TableSkeleton } from "@/ui/components/shared/table-skeleton";
import { UserPlus } from "lucide-react";

export default async function UsersPage() {
  // Fetch data concurrently
  const [users, roles] = await Promise.all([
    getUsers(),
    getRoles(),
  ]);

  return (
    <div className="flex flex-col h-full ">
      {/* Fixed Header Section */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800 ">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <BreadcrumpUsers />

          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="w-full max-w-[2000px] mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="إجمالي المستخدمين"
              value={users.length}
              icon="users"
            />
            <StatsCard
              title="الصلاحيات"
              value={roles.length}
              icon="roles"
            />
            <StatsCard
              title="متوسط الصلاحيات لكل مستخدم"
              value={calculateAverageRolesPerUser(users)}
              icon="average"
            />
          </div>

          {/* Users Table Section */}
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <Suspense fallback={<TableSkeleton />}>
              <UsersTable
                users={users}
                roles={roles}
              />
            </Suspense>
          </div>
          {/* Add User Button */}
          <div className="flex justify-end">
            <button
              className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-700
                       text-white rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       dark:focus:ring-offset-gray-950 px-4 py-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>إضافة مستخدم</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate average roles per user
function calculateAverageRolesPerUser(users: any[]): number {
  if (users.length === 0) return 0;
  const totalRoles = users.reduce((sum, user) => sum + (user.userRoles?.length || 0), 0);
  return Math.round((totalRoles / users.length) * 10) / 10; // Round to 1 decimal place
}

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: number;
  icon: 'users' | 'roles' | 'average';
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return (
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'roles':
        return (
          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        );
      case 'average':
        return (
          <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
        {getIcon()}
      </div>
    </div>
  );
}
