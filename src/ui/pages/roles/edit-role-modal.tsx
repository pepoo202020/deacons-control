'use client'

import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page";
import { translateRolesName } from "@/app/utils/translate-roles-name";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RolesPerUsers;
  onEdit: (roleId: string, name: string, description: string) => Promise<void>;
}

const texts = {
  editRole: { EN: "Edit Role", AR: "تعديل الصلاحية" },
  name: { EN: "Role Name", AR: "اسم الصلاحية" },
  description: { EN: "Description", AR: "الوصف" },
  cancel: { EN: "Cancel", AR: "إلغاء" },
  save: { EN: "Save Changes", AR: "حفظ التغييرات" },
  saving: { EN: "Saving...", AR: "جاري الحفظ..." },
  nameRequired: { EN: "Role name is required", AR: "اسم الصلاحية مطلوب" },
  descriptionPlaceholder: {
    EN: "Enter role description...",
    AR: "أدخل وصف الصلاحية..."
  }
} as const;

export default function EditRoleModal({
  isOpen,
  onClose,
  role,
  onEdit
}: EditRoleModalProps) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError(texts.nameRequired.AR);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await onEdit(role.id, name.trim(), description.trim());
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2
              id="edit-modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {texts.editRole.AR}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/50 rounded-md">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="role-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {texts.name.AR}
              </label>
              <input
                id="role-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         dark:border-gray-600 dark:bg-gray-700 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
                disabled={isSubmitting}
                dir="rtl"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label
                htmlFor="role-description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {texts.description.AR}
              </label>
              <textarea
                id="role-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={texts.descriptionPlaceholder.AR}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         dark:border-gray-600 dark:bg-gray-700 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors resize-none"
                disabled={isSubmitting}
                dir="rtl"
              />
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
                       focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {texts.cancel.AR}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                       rounded-md hover:bg-blue-700 disabled:opacity-50 
                       disabled:cursor-not-allowed flex items-center gap-2
                       transition-colors focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{texts.saving.AR}</span>
                </>
              ) : (
                texts.save.AR
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}