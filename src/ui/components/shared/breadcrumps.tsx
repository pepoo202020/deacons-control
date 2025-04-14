'use client'
import { NAV_ITEMS } from "@/data/constants";
import { HomeIcon, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(Boolean).filter(name => name !== 'dashboard');

  const getBreadcrumbNames = (path: string) => {
    const navItem = NAV_ITEMS.find(link => link.href === path)
    return navItem?.name.value.AR || path;
  }
  return (
    <div aria-label="Breadcrumb" className="flex items-center gap-2">
      {/* HOME ICON LINK TO DASHBOARD */}
      <Link href="/dashboard" className="hover:text-blue-800 transition-colors" aria-label="Go To Dashboard">
        <HomeIcon className="w-6 h-6" />
      </Link>
      {/* CURRENT PATHNAME WITHOUT DASHBOARD LINKS */}
      {
        pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const path = `/dashboard/${pathnames.slice(0, index + 1).join('/')}`
          return (
            <div key={index} className="flex items-center gap-2">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              {
                isLast ? (
                  <span className="font-medium text-gray-500 dark:text-gray-400">{getBreadcrumbNames(path)}</span>
                ) : (
                  <Link href={path} className="text-gray-500 hover:text-blue-800 dark:text-gray-400 transition-colors">
                    {getBreadcrumbNames(path)}
                  </Link>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}
