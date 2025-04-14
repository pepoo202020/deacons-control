'use client'
import { cn } from "@/lib/utils";
import { MdChangeCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLES_CHANGER_TITLE } from "@/data/constants";
interface Role {
  id: string;
  name: {
    AR: string;
    EN: string;
  };
  permissions: string[];
}

interface RolesChangerProps {
  currentRole?: Role;
  roles?: Role[];
  onRoleChange?: (role: Role) => void;
  className?: string;
}

export default function RolesChanger({
  currentRole,
  roles = [],
  onRoleChange,
  className
}: RolesChangerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(currentRole);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".roles-changer")) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Handle role selection
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    onRoleChange?.(role);
    setIsOpen(false);
  };

  if (roles.length <= 1) return null;


  return (
    <div className={cn(
      "flex items-center justify-center",
      "text-blue-950 dark:text-white",
      "relative roles-changer",
      className
    )}>
      {/* ICON WITH TOOLTIP */}
      <div className="relative group">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdChangeCircle
            className="w-6 h-6 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(prev => !prev)}
          />
        </motion.div>
        {/* Tooltip */}
        <div className="absolute -top-full left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {ROLES_CHANGER_TITLE.value.AR}
        </div>
      </div>

      {
        roles.length > 1 && (
          <div>
            {/* ROLES DROPDOWN */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "model-container-position",
                    " w-full min-w-[200px] left-0",
                    "model-container-bg rounded-md shadow-lg",
                    "border border-gray-200 dark:border-gray-700",
                    "py-1 z-50"
                  )}
                >
                  {roles.map((role) => (
                    <motion.button
                      key={role.id}
                      onClick={() => handleRoleSelect(role)}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                      className={cn(
                        "w-full text-right px-4 py-2",
                        "flex items-center justify-between gap-2",
                        "transition-colors duration-200",
                        "hover:bg-gray-100 dark:hover:bg-gray-700",
                        selectedRole?.id === role.id && "bg-blue-50 dark:bg-blue-900/30"
                      )}
                    >
                      <span className="text-sm font-medium">{role.name.AR}</span>
                      {selectedRole?.id === role.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
    </div>
  );
}

