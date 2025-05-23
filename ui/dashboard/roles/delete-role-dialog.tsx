import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DELETE_ROLE_DIALOG } from "@/constants/roles.data";
import { RoleWithUserRole } from "@/constants/types";

export default function DeleteRoleDialog({
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            {DELETE_ROLE_DIALOG.title[lang]}
            {role.id}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
