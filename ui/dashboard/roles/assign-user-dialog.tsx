"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ASSIGN_USERS_ROLE_DIALOG } from "@/constants/roles.data";
import { RoleWithUserRole, UserWithUserRole } from "@/constants/types";
import getAllUsers from "@/servers/dashboard/users/get-all";
import { useEffect, useState } from "react";

export default function AssignUserRoleDialog({
  lang = "AR",
  role,
  open,
  onOpenChange,
}: {
  lang?: "AR" | "EN";
  role: RoleWithUserRole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [users, setUsers] = useState<UserWithUserRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const userOfRole = role.UserRole.map((ur) => ur.userId);
    setSelectedUsers(userOfRole);
  }, [role]);

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((pre) =>
      pre.includes(userId)
        ? pre.filter((id) => id !== userId)
        : [...pre, userId]
    );
  };
  const handleSubmit = () => {
    console.log("Selected Users:", selectedUsers);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold pb-5">
            {ASSIGN_USERS_ROLE_DIALOG.title[lang]}
          </DialogTitle>
        </DialogHeader>
        {/* search component */}
        <div className="p-4 space-y-4">
          {/* users  */}
          {users.length === 0 ? (
            <p className="text-sm text-gray-500">
              {ASSIGN_USERS_ROLE_DIALOG.noUsers[lang]}
            </p>
          ) : (
            <div className="max-h-[400px] overflow-y-auto space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                >
                  <Label
                    htmlFor={`user-${user.id}`}
                    className="flex-1 text-sm font-medium text-blue-950"
                  >
                    {user.name || user.email}
                  </Label>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleUserToggle(user.id)}
                    id={`user-${user.id}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col md:flex-row justify-end gap-2">
          <Button
            className="global-submit-btn"
            onClick={handleSubmit}
            disabled={loading || users.length === 0}
          >
            {ASSIGN_USERS_ROLE_DIALOG.buttons.save[lang]}
          </Button>
          <Button
            className="global-cancel-btn"
            onClick={() => onOpenChange(false)}
          >
            {ASSIGN_USERS_ROLE_DIALOG.buttons.cancel[lang]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
