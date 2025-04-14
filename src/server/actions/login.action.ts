"use server"

import { LoginFormValidation } from "@/app/validations/login-form-validation";

const LoginMessages = {
    success : {
        title : {EN: "Login successful", AR: "تم تسجيل الدخول بنجاح"},
        message : {EN: "You have successfully logged in", AR: "لقد قمت بتسجيل الدخول بنجاح"}
    },
    error : {
        title : {EN: "Invalid form data", AR: "بيانات الدخول غير صالحة"},
        message : {EN: "Please check your form data", AR: "يرجى التحقق من بيانات الدخول"}
    }
}

export const login = async (formData : FormData) => {
    // get the formData
    const email = formData.get( "email" ) as string;
    const password = formData.get( "password" ) as string;
    const stayLoggedIn = formData.get( "stayLoggedIn" );

    const rawFormData = {
        email,
        password,
        stayLoggedIn: stayLoggedIn === "on"
    }

    // validate the formData
    const isFormValid = LoginFormValidation(
        rawFormData
    );

    if ( !isFormValid ) {
       return {
        success : false,
        title : LoginMessages.error.title.AR,
        message : LoginMessages.error.message.AR
       }
    }
   
    return {
        success : true,
        title : LoginMessages.success.title.AR,
        message : LoginMessages.success.message.AR
    }
    
}