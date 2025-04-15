'use client'
import { useRouter } from "next/navigation";
import AddNewRoleCard from "@/ui/pages/roles/add-new-role-card";

export default function AddRoleSection() {
  const router = useRouter();

  return (
    <AddNewRoleCard
      action={async () => {
        router.push('/dashboard/roles/new');
      }}
    />
  );
}