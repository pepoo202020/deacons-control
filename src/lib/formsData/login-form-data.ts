import { z } from "zod";

const EMAIL_ERROR_MESSAGE : {AR: string, EN: string} = {
    AR: "يرجى إدخال بريد إلكتروني صالح",
    EN: "Please enter a valid email"
}

const PASSWORD_MIN_LENGTH_ERROR_MESSAGE : {AR: string, EN: string} = {
    AR: "يجب أن يكون كلمة المرور أطول من 8 أحرف",
    EN: "Password must be at least 8 characters long"
}





export const loginFormSchema = z.object({
    email: z.string().email({ message: EMAIL_ERROR_MESSAGE.AR }),
    password: z.string().min(8, { message: PASSWORD_MIN_LENGTH_ERROR_MESSAGE.AR }),
    stayLoggedIn: z.boolean().optional()
})
