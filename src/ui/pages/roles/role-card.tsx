'use client'
import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page";
import { Edit2, User, UserPlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { translateRolesName } from "@/app/utils/translate-roles-name";

interface RoleCardProps {
  role: RolesPerUsers;
  onEdit?: (role: RolesPerUsers) => void;
  onDelete?: (role: RolesPerUsers) => void;
  onShowProfile?: (role: RolesPerUsers) => void;
  onAssignUsers?: (role: RolesPerUsers) => void;
}

const buttonsTitle = [
  {
    title: { EN: "Show Role Profile", AR: "عرض الصلاحية" },
  },
  {
    title: { EN: "Assign Users", AR: "تعيين المستخدمين" },
  },
  {
    title: { EN: "Edit Role", AR: "تعديل الصلاحية" },
  },
  {
    title: { EN: "Delete Role", AR: "حذف الصلاحية" },
  }
] as const;

export default function RoleCard({ role, onEdit, onDelete, onShowProfile, onAssignUsers }: RoleCardProps) {
  return (
    <div className="group bg-white dark:bg-blue-950 w-full h-full rounded-lg 
                    hover:shadow-lg transition-all duration-200 relative
                    flex flex-col p-4 sm:p-6">
      {/* Card Content Container */}
      <div className="flex flex-col items-center flex-grow">
        {/* ROLE ICON */}
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-3
                      transform group-hover:scale-110 transition-transform duration-200">
          <MdOutlineAdminPanelSettings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
        </div>

        {/* ROLE NAME */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white 
                     text-center mb-2 line-clamp-2">
          {translateRolesName(role.name, "AR")}
        </h3>

        {/* ROLE DESCRIPTION */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 
                     text-center mb-3 line-clamp-2 flex-grow">
          {role.description || 'No description available'}
        </p>

        {/* ROLE NUMBER OF USERS */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 
                      dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800/50
                      px-3 py-1.5 rounded-full">
          <FaUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span dir="rtl">{role.UserRole.length} مستخدم</span>
        </div>
      </div>

      {/* ROLE ACTIONS */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 
                    pt-3 border-t border-gray-100 dark:border-gray-800">
        <ActionButton
          onClick={() => onShowProfile?.(role)}
          title={buttonsTitle[0].title.AR}
          className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 
                    dark:hover:bg-purple-900/50"
        >
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </ActionButton>

        <ActionButton
          onClick={() => onAssignUsers?.(role)}
          title={buttonsTitle[1].title.AR}
          className="text-green-600 hover:bg-green-50 dark:text-green-400 
                    dark:hover:bg-green-900/50"
        >
          <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </ActionButton>

        <ActionButton
          onClick={() => onEdit?.(role)}
          title={buttonsTitle[2].title.AR}
          className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 
                    dark:hover:bg-blue-900/50"
        >
          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </ActionButton>

        <ActionButton
          onClick={() => onDelete?.(role)}
          title={buttonsTitle[3].title.AR}
          className="text-red-600 hover:bg-red-50 dark:text-red-400 
                    dark:hover:bg-red-900/50"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </ActionButton>
      </div>
    </div>
  );
}

// Extracted Action Button Component for better reusability
interface ActionButtonProps {
  onClick?: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}

function ActionButton({ onClick, title, className, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-200
                hover:scale-110 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-current
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}`}
      title={title}
    >
      {children}
    </button>
  );
}