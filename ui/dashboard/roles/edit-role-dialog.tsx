"use client";
import { showCustomToast } from "@/components/custom-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROLE_EDIT_DIALOG_DATA } from "@/constants/roles.data";
import { RoleWithUserRole } from "@/constants/types";
import updateRole from "@/servers/dashboard/roles/update-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  roleName: z.string().optional(),
  roleDescription: z.string().optional(),
});

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: role.name,
      roleDescription: role.description as string,
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const updateServer = await updateRole(
      role.id,
      data.roleName!,
      data.roleDescription!,
      lang
    );
    if (updateServer.success) {
      showCustomToast({
        name: updateServer.title,
        message: updateServer.message,
        avatar: "/icons/role-playing-game.png",
        type: "success",
        lang,
      });
    } else {
      showCustomToast({
        name: updateServer.title,
        message: updateServer.message,
        avatar: "/icons/role-playing-game.png",
        type: "error",
        lang,
      });
    }
    form.clearErrors(); // clear any validation errors
    onOpenChange(false);
  }
  function onCancel() {
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold pb-5">
            {ROLE_EDIT_DIALOG_DATA.title[lang]}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {ROLE_EDIT_DIALOG_DATA.formFields.name[lang]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={
                        ROLE_EDIT_DIALOG_DATA.formFieldsPlaceholders.name[lang]
                      }
                      {...field}
                      className="global-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {ROLE_EDIT_DIALOG_DATA.formFields.description[lang]}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        ROLE_EDIT_DIALOG_DATA.formFieldsPlaceholders
                          .description[lang]
                      }
                      {...field}
                      className="global-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col md:flex-row items-center md:justify-end gap-2 mt-5">
              <Button
                className="global-submit-btn"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    {lang === "AR" ? "جارٍ الإرسال..." : "Submitting..."}
                  </>
                ) : (
                  ROLE_EDIT_DIALOG_DATA.submitButton[lang]
                )}
              </Button>
              <Button
                onClick={onCancel}
                className="global-cancel-btn"
                type="button"
              >
                {ROLE_EDIT_DIALOG_DATA.cancelButton[lang]}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
