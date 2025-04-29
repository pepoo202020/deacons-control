import Loader from "@/components/Loader";
import UsersBreadcrumb from "@/ui/dashboard/users/breadcrumb-users";
import NewUserBtn from "@/ui/dashboard/users/new-user-btn";
import { Suspense } from "react";

export default async function UsersPage() {
  return (
    <div className="flex flex-col h-full relative">
      {/* breadcrumb */}
      <div className="flex-none">
        <div className="w-full px-4 py-4">
          <UsersBreadcrumb />
        </div>
      </div>
      {/* Roles Cards */}
      <div className="flex-1 min-w-0">
        <Suspense fallback={<Loader />}>
          <div>users</div>
        </Suspense>
      </div>
      {/* Pagination */}
      {/* new button action */}
      <NewUserBtn />
    </div>
  );
}
