'use client'

import { Role } from "@prisma/client";
import FilterUsers, { FilterState } from "@/ui/pages/users/filter-users";

interface UsersFiltersSectionProps {
  roles: Role[];
  classes: string[];
}

export default function UsersFiltersSection({ roles, classes }: UsersFiltersSectionProps) {
  const handleFilterChange = (filters: FilterState) => {
    console.log(filters);
    // Implement your filter logic here
  };

  return (
    <FilterUsers
      onFilterChange={handleFilterChange}
      roles={roles}
      classes={classes}
    />
  );
} 