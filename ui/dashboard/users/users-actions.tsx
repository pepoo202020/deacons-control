import { BsThreeDotsVertical } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FilterUsersSheet from "./filter-users-sheet";
export default function UsersActions() {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* filter */}
      <FilterUsersSheet />
      {/* more actions */}
      <div>
        <BsThreeDotsVertical size={24} />
      </div>
    </div>
  );
}
