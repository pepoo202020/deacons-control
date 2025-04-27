'use client'
import { MENU_NAV_DATA } from "@/constants/dashboard.data";
import { HomeIcon, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  name: string;
  href: string;
  isLast: boolean;
}

const newPathName = {
  EN: "New",
  AR: "جديد",
}

export default function Breadcrumbs({lang = "AR"}: {lang?: 'AR' | 'EN'}) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // Remove empty strings and 'dashboard' from path
    const pathSegments = pathname.split('/').filter(Boolean).filter(name => name !== 'dashboard');

    // Generate breadcrumb items with proper paths and names
    return pathSegments.map((name, index) => {
      const path = `/dashboard/${pathSegments.slice(0, index + 1).join('/')}`;
      // Try to find matching nav item
      const navItem = MENU_NAV_DATA.find(link => link.link === path);

      // Handle the name display logic
      let displayName: string;

      if (navItem) {
        // If we have a matching nav item, use its Arabic name
        displayName = navItem.title[lang];
      } else if (name.toLowerCase() === 'new') {
        // If the segment is 'new', use the Arabic translation
        displayName = newPathName.AR;
      } else {
        // For any other segment, capitalize and format it
        displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      }

      return {
        name: displayName,
        href: path,
        isLast: index === pathSegments.length - 1,
      }
    });
  }
  const breadcrumbs = generateBreadcrumbs();
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {/* Dashboard Home Link */}
      <Link
        href="/dashboard"
        className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
        aria-label="Go to Dashboard"
      >
        <HomeIcon className="w-5 h-5" />
      </Link>

      {breadcrumbs.length > 0 && (
        <ChevronLeftIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      )}

      {/* Breadcrumb Items */}
      <div className="flex items-center gap-2 flex-wrap">
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {item.isLast ? (
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {item.name}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
                <ChevronLeftIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
