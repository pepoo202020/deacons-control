"use client";
import { ActionButton } from "@/components/action-btn";
import { ROLE_CARD_DATA } from "@/constants/roles.data";
import { RoleWithUserRole } from "@/constants/types";
import { Edit2, Trash2, User, UserPlus } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const RoleCard = ({
  role,
  lang = "AR",
}: {
  role: RoleWithUserRole;
  lang?: "AR" | "EN";
}) => {
  return (
    <div className="group bg-white dark:bg-blue-950 w-full md:w-fit h-fit md:min-h-[300px] rounded-lg hover:shadow-lg transition-all duration-200 relative flex flex-col p-4 sm:p-6 border border-blue-950/20 mb-0">
      {/* Card Content Container */}
      <div className="flex md:flex-col items-center flex-grow gap-5 md:gap-0">
        {/* ROLE ICON */}
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full md:mb-1 transform group-hover:scale-110 transition-transform duration-200">
          <MdOutlineAdminPanelSettings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
        </div>

        {/* ROLE NAME */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center md:mb-2 line-clamp-2">
          {role.name}
        </h3>

        {/* ROLE DESCRIPTION */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center md:mb-3 line-clamp-2 flex-grow">
          {role.description}
        </p>

        {/* ROLE NUMBER OF USERS */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 md:mb-4 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
          <FaUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span dir="rtl">{role.UserRole.length} مستخدم</span>
        </div>
      </div>

      {/* ROLE ACTIONS */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <ActionButton
          onClick={() => {}}
          title={ROLE_CARD_DATA.actions.profile[lang]}
          className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/50"
        >
          <User />
        </ActionButton>
        <ActionButton
          onClick={() => {}}
          title={ROLE_CARD_DATA.actions.assignUsers[lang]}
          className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/50"
        >
          <UserPlus />
        </ActionButton>
        <ActionButton
          onClick={() => {}}
          title={ROLE_CARD_DATA.actions.edit[lang]}
          className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
        >
          <Edit2 />
        </ActionButton>
        <ActionButton
          onClick={() => {}}
          title={ROLE_CARD_DATA.actions.delete[lang]}
          className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
        >
          <Trash2 />
        </ActionButton>
      </div>
    </div>
  );
};
