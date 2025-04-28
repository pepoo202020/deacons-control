import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROLE_EDIT_DIALOG_DATA } from "@/constants/roles.data";
import { RoleWithUserRole } from "@/constants/types";

export default function EditRoleDialog({
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
            {ROLE_EDIT_DIALOG_DATA.title[lang]}
            {role.id}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
