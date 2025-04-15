'use client'

import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page";
import { translateRolesName } from "@/app/utils/translate-roles-name";
import { X } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

interface RoleProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RolesPerUsers;
}

const texts = {
  roleProfile: { EN: "Role Profile", AR: "ملف الصلاحية" },
  description: { EN: "Description", AR: "الوصف" },
  assignedUsers: { EN: "Assigned Users", AR: "المستخدمين المعينين" },
  noDescription: { EN: "No description available", AR: "لا يوجد وصف متاح" },
  noUsers: { EN: "No users assigned", AR: "لا يوجد مستخدمين معينين" },
  close: { EN: "Close", AR: "إغلاق" }
} as const;

export default function RoleProfileModal({
  isOpen,
  onClose,
  role
}: RoleProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2
            id="profile-modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3"
          >
            <MdOutlineAdminPanelSettings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {texts.roleProfile.AR}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Role Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translateRolesName(role.name, "AR")}
            </h3>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {texts.description.AR}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {role.description || texts.noDescription.AR}
            </p>
          </div>

          {/* Assigned Users */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {texts.assignedUsers.AR} ({role.UserRole.length})
              </h4>
            </div>
            {role.UserRole.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                {texts.noUsers.AR}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.UserRole.map((userRole) => (
                  <div
                    key={userRole.userId}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {userRole.userId[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userRole.userId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                     border border-gray-300 rounded-md hover:bg-gray-50 
                     dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 
                     dark:hover:bg-gray-700 transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
          >
            {texts.close.AR}
          </button>
        </div>
      </div>
    </div>
  );
}