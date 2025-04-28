import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ROLE_CARD_DATA,
  ROLE_PROFILE_DIALOG_DATA,
} from "@/constants/roles.data";
import { RoleWithUserRole } from "@/constants/types";
import { FaUsers } from "react-icons/fa";

export default function RoleProfile({
  lang = "AR",
  role,
  open,
  onOpenChange,
  onEditChange,
  onAssignChange,
  onDeleteChange,
}: {
  lang?: "AR" | "EN";
  role: RoleWithUserRole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditChange: () => void;
  onAssignChange: () => void;
  onDeleteChange: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold mb-2">
            {role.name}
          </DialogTitle>
          <DialogDescription className="text-center">
            {role.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {ROLE_PROFILE_DIALOG_DATA.assignedUsers[lang]} (
              {role.UserRole.length})
            </h4>
          </div>
          {role.UserRole.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              {ROLE_PROFILE_DIALOG_DATA.noUsers[lang]}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {role.UserRole.map((userRole) => (
                <div
                  key={userRole.userId}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {userRole.userId[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {userRole.userId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col md:flex-row items-center justify-center w-full flex-wrap">
          <Button
            onClick={onEditChange}
            className="global-edit-btn"
            type="button"
          >
            {ROLE_CARD_DATA.actions.edit[lang]}
          </Button>
          <Button
            onClick={onAssignChange}
            className="global-assign-btn"
            type="button"
          >
            {ROLE_CARD_DATA.actions.assignUsers[lang]}
          </Button>
          <Button
            onClick={onDeleteChange}
            className="global-delete-btn"
            type="button"
          >
            {ROLE_CARD_DATA.actions.delete[lang]}
          </Button>
          <Button className="global-cancel-btn" type="button">
            {ROLE_PROFILE_DIALOG_DATA.close[lang]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
