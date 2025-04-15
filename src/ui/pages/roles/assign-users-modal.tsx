'use client'

import { translateRolesName } from "@/app/utils/translate-roles-name";
import { User } from "@prisma/client";
import { X, Search, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/app/hooks/use-debounce";

interface AssignUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (selectedUsers: string[]) => Promise<void>;
  availableUsers: User[];
  currentAssignedUsers: string[];
  roleName: string;
}

const texts = {
  assigUsers: { EN: "Assign Users to ", AR: "تعيين المستخدمين لـ" },
  search: { EN: "Search users...", AR: "البحث عن مستخدمين..." },
  noUsers: { EN: "No users found", AR: "لا يوجد مستخدمين متاحين" },
  cancel: { EN: "Cancel", AR: "إلغاء" },
  save: { EN: "Save", AR: "حفظ" },
  saving: { EN: "Saving...", AR: "جاري الحفظ..." },
  saveChanges: { EN: "Save Changes", AR: "حفظ التغييرات" },
  searchPlaceholder: { EN: "Search by name or email", AR: "البحث بالاسم أو البريد الإلكتروني" }
} as const;

export default function AssignUsersModal({
  isOpen,
  onClose,
  onAssign,
  availableUsers = [],
  currentAssignedUsers = [],
  roleName
}: AssignUsersModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(currentAssignedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Reset selected users when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedUsers(currentAssignedUsers);
      setSearchQuery(""); // Reset search when modal opens
    }
  }, [isOpen, currentAssignedUsers]);

  // Memoize filtered users to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    const searchTerm = debouncedSearch.toLowerCase();
    if (!searchTerm) return availableUsers;
    return availableUsers.filter(user =>
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm)
    )
  }, [availableUsers, debouncedSearch])

  // Handle user selection
  const handleUserSelection = useCallback((userId: string, isChecked: boolean) => {
    setSelectedUsers(prev =>
      isChecked
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onAssign(selectedUsers);
      onClose();
    } catch (error) {
      console.error('Error assigning users:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {texts.assigUsers.AR} {translateRolesName(roleName, "AR")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              aria-hidden="true" />
            <input
              type="search"
              placeholder={texts.searchPlaceholder.AR}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-label={texts.search.AR}
            />
          </div>
        </div>

        {/* Users List */}
        <div className="p-4 overflow-y-auto max-h-[50vh] scroll-smooth"
          role="listbox"
          aria-label="Available users">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {texts.noUsers.AR}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 
                         rounded-md cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 ml-3
                             focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-label={`Select ${user.name}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-3">
          <button
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                     rounded-md hover:bg-blue-700 disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center gap-2
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                {texts.saving.AR}
              </>
            ) : (
              texts.saveChanges.AR
            )}
          </button>
        </div>
      </div>
    </div>
  );
}