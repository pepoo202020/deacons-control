import { RoleWithUserRole } from "@/constants/types";
import React from "react";
import { RoleCard } from "./role-card";

export default function RolesContent({
  roles = [],
}: {
  roles?: RoleWithUserRole[];
}) {
  return (
    <div className="p-3 flex flex-col md:flex-row flex-wrap justify-around gap-3 w-full">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  );
}
