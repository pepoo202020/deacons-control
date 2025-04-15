import { addNewRole } from "@/server/actions/roles/add-new-role.action";
import Breadcrumbs from "@/ui/components/shared/breadcrumps";
import NewRoleForm from "@/ui/pages/roles/new/new-role-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'إضافة صلاحية جديدة | لوحة التحكم',
  description: 'صفحة إضافة صلاحية جديدة للمستخدمين',
};

export default async function NewRolePage() {
  return (
    <div className="p-5 space-y-5 w-full h-[100vh-30rem] overflow-y-auto">
      {/* BREADCRUMBS COMPONENT */}
      <div className="breadcrumbs">
        <Breadcrumbs />
      </div>
      {/* Form Section */}
      <div className="max-w-4xl mx-auto">
        <NewRoleForm createRoleAction={addNewRole} />
      </div>
    </div>
  )
} 
