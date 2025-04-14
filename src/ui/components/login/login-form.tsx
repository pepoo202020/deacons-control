'use client'

import LoginFormInfo from "@/ui/components/login/login-form-info";

import EmailInput from "@/ui/components/login/email-input";
import PasswordInput from "@/ui/components/login/password-input";
import StayLoggedIn from "@/ui/components/login/stay-logged-in";
import { login } from "@/server/actions/login.action";
import SubmitLoginButton from "./submit-login-button";
import Alert from "../shared/alert";
import { useState } from "react";
import { LoginFormValidation } from "@/app/validations/login-form-validation";

export default function LoginForm() {
    const [ alertData, setAlertData ] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error";
        title: string;
        position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    } | null>( null );
    const [ emailError, setEmailError ] = useState<string>( "" );
    const [ passwordError, setPasswordError ] = useState<string>( "" );

    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault(); // This prevents the page reload

        const form = e.currentTarget;
        const formData = new FormData( form );

        // Get form data
        const email = formData.get( "email" ) as string;
        const password = formData.get( "password" ) as string;
        const stayLoggedIn = Boolean( formData.get( "stayLoggedIn" ) );

        // Clear previous errors
        setEmailError( "" );
        setPasswordError( "" );
        setAlertData( null );

        // Client-side validation
        const isValid = LoginFormValidation( {
            email,
            password,
            stayLoggedIn,
            setEmailErrorMessage: setEmailError,
            setPasswordErrorMessage: setPasswordError
        } );

        if ( !isValid ) {
            return; // Stop here if validation fails
        }

        try {
            // Proceed with login if validation passes
            const loginResponse = await login( formData );

            setAlertData( {
                show: true,
                message: loginResponse.message,
                type: loginResponse.success ? "success" : "error",
                title: loginResponse.title,
                position: "top-center"
            } );
            form.reset();
        } catch ( error ) {
            console.error( 'Login error:', error );
        }
    }
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            {alertData && (
                <Alert
                    message={alertData.message}
                    type={alertData.type}
                    show={alertData.show}
                    position="top-center"
                    title={alertData.title}
                />
            )}
            <LoginFormInfo />
            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-5">
                {/* EMAIL INPUT */}
                <EmailInput errorMessage={emailError} />
                {/* PASSWORD INPUT */}
                <PasswordInput errorMessage={passwordError} />
                {/* CHECK IF STAY LOGGED IN */}
                <StayLoggedIn />
                {/* SUBMIT BUTTON */}
                <SubmitLoginButton />
            </form>
        </div>
    );
}