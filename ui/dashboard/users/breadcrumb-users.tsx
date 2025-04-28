import Breadcrumbs from "@/components/breadcrumb";
import { ROLES_BREADCRUMB_HEADER } from "@/constants/roles.data";
import React from "react";
import UsersActions from "./users-actions";
import { USERS_BREADCRUMB_HEADER } from "@/constants/users.data";

export default function UsersBreadcrumb({
  lang = "AR",
}: {
  lang?: "AR" | "EN";
}) {
  return (
    <div className="breadcrumbs">
      <Breadcrumbs lang={lang} />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">
        {USERS_BREADCRUMB_HEADER[lang]}
      </h1>
      <UsersActions />
    </div>
  );
}
