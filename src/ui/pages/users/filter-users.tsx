'use client'

import { Search, Filter, X } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Role } from '@prisma/client';
import { translateRolesName } from '@/app/utils/translate-roles-name';

interface FilterUsersProps {
  onFilterChange: (filters: FilterState) => void;
  roles: Role[];
  classes?: string[];
}

export interface FilterState {
  search: string;
  roles: string[];
  classes: string[];
}

const texts = {
  filters: { EN: "Filters", AR: "التصفية" },
  search: { EN: "Search users", AR: "البحث عن المستخدمين" },
  roles: { EN: "Roles", AR: "الصلاحيات" },
  dateRange: { EN: "Date Range", AR: "النطاق الزمني" },
  classes: { EN: "Classes", AR: "الفصول" },
  from: { EN: "From", AR: "من" },
  to: { EN: "To", AR: "إلى" },
  clear: { EN: "Clear", AR: "مسح" },
  apply: { EN: "Apply", AR: "تطبيق" },
  selectRole: { EN: "Select roles", AR: "اختر الصلاحيات" },
  selectClass: { EN: "Select classes", AR: "اختر الفصول" },
} as const;

export default function FilterUsers({ onFilterChange, roles, classes = [] }: FilterUsersProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    roles: [],
    classes: []
  });

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      search: '',
      roles: [],
      classes: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  }, [onFilterChange]);

  // Handle click outside for both search and filters
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle search click outside
      if (searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.search-button')) {
        setIsSearchOpen(false);
      }

      // Handle filters click outside
      if (filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.filters-button')) {
        setIsFiltersOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Function to get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.roles.length) count++;
    if (filters.classes.length) count++;
    return count;
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex items-center gap-4 w-full">
        {/* Search Button with Count */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="search-button relative p-2 rounded-lg text-gray-500 hover:text-gray-700 
                   dark:text-gray-400 dark:hover:text-gray-200 
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   transition-colors duration-200"
          aria-label={texts.search.AR}
        >
          <Search className="h-5 w-5" />
          {filters.search && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white
                         rounded-full text-xs flex items-center justify-center">
              1
            </span>
          )}
        </button>

        {/* Filters Button with Count */}
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="filters-button relative p-2 rounded-lg text-gray-500 hover:text-gray-700 
                   dark:text-gray-400 dark:hover:text-gray-200 
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   transition-colors duration-200 flex items-center gap-2"
          aria-label={texts.filters.AR}
        >
          <Filter className="h-5 w-5" />
          <span className="font-medium">{texts.filters.AR}</span>
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white
                         rounded-full text-xs flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Sliding Search Input */}
      <div className={`fixed top-5 left-0 right-0 z-50 px-5 transform transition-all duration-300 ease-in-out
                      ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 
                      dark:border-gray-700 p-2 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            placeholder={texts.search.AR}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 
                     text-gray-900 dark:text-white placeholder-gray-500
                     text-base"
            dir="rtl"
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              if (filters.search) {
                handleFilterChange({ search: '' });
              }
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
                     text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sliding Filters Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl 
                   transform transition-transform duration-300 ease-in-out z-50
                   ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}
        ref={filtersRef}
      >
        {/* Filters Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {texts.filters.AR}
            </h3>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400
                           px-2 py-0.5 rounded-full text-sm">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsFiltersOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 
                     dark:text-gray-400 dark:hover:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-gray-700
                     transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="p-4 space-y-6 h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Clear Filters Button */}
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearFilters}
              className="w-full py-2 px-4 bg-red-50 dark:bg-red-900/30 
                       text-red-600 dark:text-red-400 rounded-lg
                       hover:bg-red-100 dark:hover:bg-red-900/50
                       transition-colors duration-200 flex items-center justify-between gap-2"
            >
              {texts.clear.AR}
              <X className="h-4 w-4" />

            </button>
          )}

          {/* Roles Filter with Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {texts.roles.AR}
              </label>
              {filters.roles.length > 0 && (
                <span className="text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 
                             dark:text-blue-400 px-2 py-0.5 rounded-full">
                  {filters.roles.length}
                </span>
              )}
            </div>
            <select
              multiple
              value={filters.roles}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange({ roles: values });
              }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       min-h-[100px]  py-2 overflow-y-auto"
              dir="rtl"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id} className="pr-2">
                  {translateRolesName(role.name, 'AR')}
                </option>
              ))}
            </select>
          </div>



          {/* Classes Filter with Count */}
          {classes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {texts.classes.AR}
                </label>
                {filters.classes.length > 0 && (
                  <span className="text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 
                               dark:text-blue-400 px-2 py-0.5 rounded-full">
                    {filters.classes.length}
                  </span>
                )}
              </div>
              <select
                multiple
                value={filters.classes}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  handleFilterChange({ classes: values });
                }}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         min-h-[100px]  py-2 overflow-y-auto"
                dir="rtl"
              >
                {classes.map((className) => (
                  <option key={className} value={className} className="pr-2">
                    {className}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(isFiltersOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
          onClick={() => {
            setIsFiltersOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </div>
  );
}