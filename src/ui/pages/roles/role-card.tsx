'use client'
import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page";
import { Edit2, User, UserPlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

interface RoleCardProps {
  role: RolesPerUsers;
  onEdit?: (role: RolesPerUsers) => void;
  onDelete?: (role: RolesPerUsers) => void;
  onShowProfile?: (role: RolesPerUsers) => void;
  onAssignUsers?: (role: RolesPerUsers) => void;
}

export default function RoleCard({ role, onEdit, onDelete, onShowProfile, onAssignUsers }: RoleCardProps) {
  return (
    <div className="bg-white dark:bg-blue-950 w-full max-w-[250px] flex flex-col items-center justify-center rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      {/* ROLE ICON */}
      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-1">
        <MdOutlineAdminPanelSettings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      {/* ROLE NAME */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-1">
        {role.name}
      </h3>
      {/* ROLE DESCRIPTION */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-1 line-clamp-2">
        {role.description || 'No description available'}
      </p>
      {/* ROLE NUMBER OF USERS */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
        <FaUsers className="w-4 h-4" />
        <span>{role.UserRole.length} Users</span>
      </div>
      {/* ROLE ACTIONS */}
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => onShowProfile?.(role)}
          className="p-2 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-full transition-colors"
          title="Show Role Profile"
        >
          <User className="w-4 h-4" />
        </button>

        <button
          onClick={() => onAssignUsers?.(role)}
          className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/50 rounded-full transition-colors"
          title="Assign Users"
        >
          <UserPlus className="w-4 h-4" />
        </button>

        <button
          onClick={() => onEdit?.(role)}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-full transition-colors"
          title="Edit Role"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete?.(role)}
          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-full transition-colors"
          title="Delete Role"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
} 
