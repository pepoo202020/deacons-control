import { loginFormSchema } from "@/lib/formsData/login-form-data";

interface LoginFormValidationIF {
    email: string;
    setEmailErrorMessage: ( errorMessage: string ) => void;
    password: string;
    setPasswordErrorMessage: ( errorMessage: string ) => void;
    stayLoggedIn: boolean;
}

const EMAIL_REQUIRED_ERROR_MESSAGE = {
    AR: "يجب إدخال البريد الإلكتروني",
    EN: "Email is required"
};

const PASSWORD_REQUIRED_ERROR_MESSAGE = {
    AR: "يجب إدخال كلمة المرور",
    EN: "Password is required"
};

export const LoginFormValidation = ({ email, password, stayLoggedIn, setEmailErrorMessage, setPasswordErrorMessage }: LoginFormValidationIF) => {
    const rawFormData = {
        email: email,
        password: password,
        stayLoggedIn: stayLoggedIn
    }

    if (!email) {
        setEmailErrorMessage( EMAIL_REQUIRED_ERROR_MESSAGE.AR );
        if ( !password ) {
            setPasswordErrorMessage( PASSWORD_REQUIRED_ERROR_MESSAGE.AR );
        }
        return;
    }
    if (!password) {
        setPasswordErrorMessage( PASSWORD_REQUIRED_ERROR_MESSAGE.AR );
        return;
    }


    const validatedData = loginFormSchema.safeParse( rawFormData );
    if ( !validatedData.success ) {
        console.error( validatedData.error );
        // find the error message
        const emailErrorMessage = validatedData.error.errors.find( issue => issue.path[ 0 ] === "email" );
        const passwordErrorMessage = validatedData.error.errors.find( issue => issue.path[ 0 ] === "password" );
        if ( emailErrorMessage ) {
            setEmailErrorMessage( emailErrorMessage.message );
        }
        if ( passwordErrorMessage ) {
            setPasswordErrorMessage( passwordErrorMessage.message );
        }
        return;
    }

    console.log( validatedData.data );
}
