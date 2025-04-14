'use client'
import { NAV_ITEMS } from "@/data/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const currentRole = "admin"

  // Filter nav items based on role
  const filteredNavItems = NAV_ITEMS.filter(item =>
    item.forAllRoles ||
    (item.activeForRoles && item.activeForRoles.includes(currentRole || ''))
  );

  return (
    <div className={cn(
      "w-full bg-blue-950 text-white",
      "flex items-center justify-center",
      "overflow-x-auto overflow-y-hidden",
      "scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent",
    )}>
      <div className="flex items-center justify-center px-4 h-16 gap-2">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name.name}
              href={item.href}
              className="relative h-full"
            >
              <motion.div
                className={cn(
                  "h-full px-4 flex flex-col items-center justify-center",
                  "relative cursor-pointer group",
                  "transition-colors duration-200",
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon */}
                <item.icon className={cn(
                  "w-6 h-6 transition-transform duration-200",
                  "group-hover:scale-110",
                  isActive && "scale-110"
                )} />

                {/* Label */}
                <span className={cn(
                  "text-xs mt-1 transition-all duration-200",
                  "group-hover:font-medium",
                  isActive && "font-medium"
                )}>
                  {item.name.value.AR}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </motion.div>

              {/* Tooltip */}
              <div className={cn(
                "absolute -top-full mb-1 left-1/2 -translate-x-1/2",
                "bg-gray-800 text-white text-xs px-2 py-1 rounded",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "pointer-events-none whitespace-nowrap z-50"
              )}>
                {item.name.value.AR}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
