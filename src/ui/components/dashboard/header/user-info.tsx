'use client'

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react";
import { USER_INFO_MENU_ITEMS } from "@/data/constants";
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserInfoProps {
  userData?: UserData;
  onLogout?: () => void;
  className?: string;
  onSettings?: () => void;
  onProfile?: () => void;
}

export default function UserInfo({
  userData = {
    id: '1',
    name: 'محمد أحمد',
    email: 'mohammed@example.com',
  },
  onLogout,
  className,
  onSettings, onProfile
}: UserInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.user-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn(
      "relative user-menu",
      className
    )}>
      {/* USER INFO BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-3 md:px-3 md:py-2 rounded-lg",
          "md:hover:bg-white/10 transition-colors duration-200",
          "focus:outline-none focus:ring-2 cursor-pointer focus:ring-white/20"
        )}
      >
        {/* User Avatar */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            {
              userData.avatar ? (
                <Image src={userData.avatar} alt={userData.name} width={32} height={32} className="object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <span className="text-sm">{userData.name.charAt(0)}</span>
                </div>
              )
            }
          </div>
        </div>
        {/* User Name & Role */}
        <div className="text-right hidden md:block">
          <p className="text-[15px] font-medium leading-none">{userData.name}</p>
          <p className="text-[10px] text-gray-300 mt-1">{userData.email}</p>
        </div>
        {/* Dropdown Icon */}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200 hidden md:block",
            isOpen && "transform rotate-180"
          )}
        />

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "model-container-position",
                "w-64 model-container-bg",
                "rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
                "overflow-hidden z-50"
              )}
            >
              {/* User Details Section */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-white">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {userData.email}
                </p>
              </div>

              {/* Menu Items */}
              <div >

                {/* Settings */}
                <div className="menu-items">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">{USER_INFO_MENU_ITEMS.find(item => item.name === "USER_SETTINGS")?.value.AR}</span>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="menu-items"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {theme === 'dark' ? USER_INFO_MENU_ITEMS.find(item => item.name === "THEME_SWITCHER_LIGHT")?.value.AR : USER_INFO_MENU_ITEMS.find(item => item.name === "THEME_SWITCHER_DARK")?.value.AR}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="menu-items text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{USER_INFO_MENU_ITEMS.find(item => item.name === "USER_LOGOUT")?.value.AR}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
