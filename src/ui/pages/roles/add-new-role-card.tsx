'use client'
import { Plus } from "lucide-react";
import { useState } from "react";

const addNewRole = {
  title: {
    EN: "Add New Role",
    AR: "إضافة صلاحية جديدة",
  },
  description: {
    EN: "Create a new role to manage user permissions",
    AR: "إنشاء صلاحية جديدة لإدارة صلاحيات المستخدمين",
  }
};

interface AddNewRoleCardProps {
  action: () => Promise<void>;
  language?: 'EN' | 'AR';
  disabled?: boolean;
}

export default function AddNewRoleCard({
  action,
  language = 'AR',
  disabled = false
}: AddNewRoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`
        w-full max-w-[250px] 
        bg-white dark:bg-blue-950 
        flex flex-col items-center justify-center 
        rounded-lg p-6 
        transition-all duration-200
        ${disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-lg hover:scale-105 hover:border-blue-200 cursor-pointer'
        }
        border-2 border-dashed border-gray-200 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-blue-950
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={addNewRole.title[language]}
    >
      {/* ADD NEW ROLE ICON */}
      <div className={`
        p-3 rounded-full mb-3
        transition-all duration-200
        ${isHovered ? 'bg-blue-200 dark:bg-blue-800' : 'bg-blue-100 dark:bg-blue-900'}
      `}>
        <Plus
          className={`
            w-8 h-8 transition-transform duration-200
            text-blue-600 dark:text-blue-400
            ${isHovered ? 'rotate-90' : ''}
          `}
        />
      </div>

      {/* ADD NEW ROLE TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
        {addNewRole.title[language]}
      </h3>

      {/* ADD NEW ROLE DESCRIPTION */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {addNewRole.description[language]}
      </p>

      {/* VISUAL FEEDBACK FOR HOVER */}
      <div className={`
        mt-4 h-1 w-16 rounded-full 
        transition-all duration-200
        ${isHovered ? 'bg-blue-500 w-24' : 'bg-transparent'}
      `} />
    </button>
  );
}