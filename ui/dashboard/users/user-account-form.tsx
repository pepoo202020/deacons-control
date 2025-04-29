import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NEW_USER_DIALOG_DATA } from "@/constants/users.data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PrePasswordPatterns from "./pre-password-patterns";

export const userAccountSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  sendEmail: z.boolean(),
  passwordPattern: z.boolean(),
});

export default function UserAccountForm({
  handleSubmit,
  lang = "AR",
  passwordPatternText,
  setPasswordPatternText,
  setSendEmail,
  openPatternDialog,
  isSubmitting,
}: {
  handleSubmit: (data: z.infer<typeof userAccountSchema>) => void;
  lang?: "AR" | "EN";
  passwordPatternText: string;
  setPasswordPatternText: (value: string) => void;
  setSendEmail: (value: boolean) => void;
  openPatternDialog: () => void;
  isSubmitting: boolean;
}) {
  const form = useForm<z.infer<typeof userAccountSchema>>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      sendEmail: false,
      passwordPattern: false,
    },
  });
  const passwordPattern = form.watch("passwordPattern");
  const sendEmail = form.watch("sendEmail");

  useEffect(() => {
    setSendEmail(sendEmail);
    if (!passwordPattern) {
      setPasswordPatternText("");
    }
  }, [sendEmail, passwordPattern, setSendEmail, setPasswordPatternText]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 mt-5"
      >
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {NEW_USER_DIALOG_DATA.formFields.userAccount.name.label[lang]}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={
                    NEW_USER_DIALOG_DATA.formFields.userAccount.name
                      .placeholder[lang]
                  }
                  {...field}
                  className="global-input"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {NEW_USER_DIALOG_DATA.formFields.userAccount.email.label[lang]}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={
                    NEW_USER_DIALOG_DATA.formFields.userAccount.email
                      .placeholder[lang]
                  }
                  {...field}
                  className="global-input"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* PASSWORD */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  NEW_USER_DIALOG_DATA.formFields.userAccount.password.label[
                    lang
                  ]
                }
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={
                    NEW_USER_DIALOG_DATA.formFields.userAccount.password
                      .placeholder[lang]
                  }
                  {...field}
                  className="global-input"
                  disabled={isSubmitting || passwordPattern}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* SEND EMAIL */}
        <FormField
          control={form.control}
          name="sendEmail"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormLabel className="font-cairo">
                {NEW_USER_DIALOG_DATA.formFields.userAccount.sendEmail[lang]}
              </FormLabel>
            </FormItem>
          )}
        />
        {/* PASSWORD PATTERN */}
        <div className="w-full flex items-center justify-between">
          <FormField
            control={form.control}
            name="passwordPattern"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormLabel>
                  {
                    NEW_USER_DIALOG_DATA.formFields.userAccount.passwordPattern[
                      lang
                    ]
                  }
                </FormLabel>
              </FormItem>
            )}
          />
          {form.getValues("passwordPattern") && (
            <Button
              type="button"
              onClick={openPatternDialog}
              className="bg-sky-600 hover:bg-sky-700 font-cairo"
              disabled={isSubmitting}
            >
              {
                NEW_USER_DIALOG_DATA.formFields.userAccount.addPasswordPattern[
                  lang
                ]
              }
            </Button>
          )}
        </div>
        {/* Accordion of the previews patterns */}
        {passwordPattern && passwordPatternText && (
          <div className="mt-2 p-2 bg-gray-100 rounded-md font-cairo">
            <p className="text-sm text-gray-700">
              {lang === "AR"
                ? "نمط كلمة المرور المحدد:"
                : "Selected Password Pattern:"}{" "}
              <code className="text-indigo-600">{passwordPatternText}</code>
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
