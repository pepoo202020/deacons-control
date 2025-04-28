import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NEW_ROLE_DIALOG_CONTENT } from "@/constants/roles.data";
import NewRoleForm from "./newRoleForm";

export default function NewRoleModal(
    {open, onOpenChange, lang= 'AR'} : {open: boolean, onOpenChange: (open: boolean) => void; lang?: 'AR' | 'EN'}
) {
   const onDialogChange = (open: boolean) => {
    onOpenChange(open)
   } 
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent >
            <DialogHeader>
                <DialogTitle className="text-center font-semibold text-blue-950 dark:text-white">{NEW_ROLE_DIALOG_CONTENT.title[lang]}</DialogTitle>
                <DialogDescription className="text-center">{NEW_ROLE_DIALOG_CONTENT.description[lang]}</DialogDescription>
            </DialogHeader>
            <NewRoleForm onDialogChange={onDialogChange} />
        </DialogContent>
    </Dialog>
  )
}
