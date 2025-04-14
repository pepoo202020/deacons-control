'use client'

import { ASC_FILTERATION_OPTIONS } from "@/data/constants";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SortOrder = 'asc' | 'desc';

interface FilterRolesProps {
  onSortChange?: (order: SortOrder) => void;
  defaultOrder?: SortOrder;
}

const SORTBY = {
  EN: 'Sort By',
  AR: "فرز حسب"
}

export default function FilterRoles({ onSortChange, defaultOrder = 'asc' }: FilterRolesProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultOrder);
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".filter-roles")) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSortChange = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
    onSortChange?.(newOrder);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md 
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors filter-roles
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {SORTBY.AR}
        {sortOrder === 'asc' ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg 
                      border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            {
              ASC_FILTERATION_OPTIONS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSortChange(item.name.toLowerCase() as SortOrder)}
                  className="flex items-center justify-between gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700
                          focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                >
                  {item.value.AR}
                  {item.name === "ASC" ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}