'use client'

import { User, Role, UserRole } from '@prisma/client';
import { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  UserCog,
  Shield,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export interface UserWithRoles extends User {
  userRoles: (UserRole & {
    role: Role;
  })[];
}

interface UsersTableProps {
  users: UserWithRoles[];
  roles: Role[];
}

type SortField = 'name' | 'email' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const texts = {
  headers: {
    name: { EN: "Name", AR: "الاسم" },
    email: { EN: "Email", AR: "البريد الإلكتروني" },
    roles: { EN: "Roles", AR: "الصلاحيات" },
    joinDate: { EN: "Join Date", AR: "تاريخ الانضمام" },
    actions: { EN: "Actions", AR: "الإجراءات" },
  },
  actions: {
    editUser: { EN: "Edit User", AR: "تعديل المستخدم" },
    manageRoles: { EN: "Manage Roles", AR: "إدارة الصلاحيات" },
    deleteUser: { EN: "Delete User", AR: "حذف المستخدم" },
  },
  noUsers: { EN: "No users found", AR: "لا يوجد مستخدمين" },
} as const;

export function UsersTable({ users, roles }: UsersTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Sort users
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;

      switch (sortField) {
        case 'name':
          return a.name.localeCompare(b.name) * modifier;
        case 'email':
          return a.email.localeCompare(b.email) * modifier;
        case 'createdAt':
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * modifier;
        default:
          return 0;
      }
    });
  }, [users, sortField, sortOrder]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
            {/* Name Header */}
            <th className="px-4 py-3 text-right">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300
                         hover:text-gray-900 dark:hover:text-white"
              >
                {texts.headers.name.AR}
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>

            {/* Email Header */}
            <th className="px-4 py-3 text-right">
              <button
                onClick={() => handleSort('email')}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300
                         hover:text-gray-900 dark:hover:text-white"
              >
                {texts.headers.email.AR}
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>

            {/* Roles Header */}
            <th className="px-4 py-3 text-right">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {texts.headers.roles.AR}
              </span>
            </th>

            {/* Join Date Header */}
            <th className="px-4 py-3 text-right">
              <button
                onClick={() => handleSort('createdAt')}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300
                         hover:text-gray-900 dark:hover:text-white"
              >
                {texts.headers.joinDate.AR}
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>

            {/* Actions Header */}
            <th className="px-4 py-3 text-right">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {texts.headers.actions.AR}
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50
                       transition-colors duration-200"
            >
              {/* Name */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 
                                flex items-center justify-center text-blue-600 dark:text-blue-400
                                font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user.email}
                </span>
              </td>

              {/* Roles */}
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {user.userRoles?.map((userRole) => (
                    <span
                      key={userRole.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs
                               bg-purple-100 dark:bg-purple-900/50 
                               text-purple-700 dark:text-purple-300"
                    >
                      {userRole.role.name}
                    </span>
                  ))}
                </div>
              </td>

              {/* Join Date */}
              <td className="px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {format(new Date(user.createdAt), 'dd MMM yyyy', { locale: ar })}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => {/* Handle edit */ }}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                             dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 
                             rounded-lg transition-colors duration-200"
                    title={texts.actions.editUser.AR}
                  >
                    <UserCog className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {/* Handle roles */ }}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                             dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 
                             rounded-lg transition-colors duration-200"
                    title={texts.actions.manageRoles.AR}
                  >
                    <Shield className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {/* Handle delete */ }}
                    className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 
                             dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 
                             rounded-lg transition-colors duration-200"
                    title={texts.actions.deleteUser.AR}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {texts.noUsers.AR}
          </p>
        </div>
      )}
    </div>
  );
}