'use client'

import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page";
import { translateRolesName } from "@/app/utils/translate-roles-name";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useState } from "react";
interface DeleteRoleAlertProps {
  isOpen: boolean;
  onClose: () => void;
  role: RolesPerUsers;
  onDelete: (roleId: string) => Promise<void>;
}

const texts = {
  deleteRole: { EN: "Delete Role", AR: "حذف الصلاحية" },
  confirmDelete: {
    EN: "Are you sure you want to delete this role?",
    AR: "هل أنت متأكد من حذف هذه الصلاحية؟"
  },
  warning: {
    EN: "This action cannot be undone.",
    AR: "لا يمكن التراجع عن هذا الإجراء."
  },
  assignedUsers: {
    EN: "This role has {count} assigned users",
    AR: "هذه الصلاحية لديها {count} مستخدمين"
  },
  cancel: { EN: "Cancel", AR: "إلغاء" },
  delete: { EN: "Delete", AR: "حذف" },
  deleting: { EN: "Deleting...", AR: "جاري الحذف..." }
} as const;

export default function DeleteRoleAlert({
  isOpen,
  onClose,
  role,
  onDelete
}: DeleteRoleAlertProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");
      await onDelete(role.id);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  const userCount = role.UserRole.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby="alert-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Alert Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2
            id="alert-title"
            className="text-xl font-semibold text-red-600 dark:text-red-400 flex items-center gap-2"
          >
            <AlertTriangle className="w-6 h-6" />
            {texts.deleteRole.AR}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close alert"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/50 rounded-md">
              {error}
            </div>
          )}

          <div id="alert-description" className="space-y-3">
            <p className="text-gray-900 dark:text-white text-lg font-medium">
              {texts.confirmDelete.AR}
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {translateRolesName(role.name, "AR")}
              </p>
              {userCount > 0 && (
                <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">
                  {texts.assignedUsers.AR.replace('{count}', userCount.toString())}
                </p>
              )}
            </div>

            <p className="text-red-500 dark:text-red-400 text-sm">
              {texts.warning.AR}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                     border border-gray-300 rounded-md hover:bg-gray-50 
                     dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 
                     dark:hover:bg-gray-700 transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-gray-500"
            disabled={isDeleting}
          >
            {texts.cancel.AR}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                     rounded-md hover:bg-red-700 disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center gap-2
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-red-500"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{texts.deleting.AR}</span>
              </>
            ) : (
              texts.delete.AR
            )}
          </button>
        </div>
      </div>
    </div>
  );
}