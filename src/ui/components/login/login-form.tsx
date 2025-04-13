'use client'

import LoginFormInfo from "@/ui/components/login/login-form-info";
import EmailInput from "@/ui/components/login/email-input";
import { useState } from "react";
import PasswordInput from "@/ui/components/login/password-input";
import { LOGIN_FORM_SUBMIT_BUTTON_LABEL } from "@/data/constants";
import StayLoggedIn from "@/ui/components/login/stay-logged-in";
import { LoginFormValidation } from "@/app/validations/login-form-validation";
export default function LoginForm() {
    const [ email, setEmail ] = useState<string>( "" );
    const [ emailErrorMessage, setEmailErrorMessage ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>( "" );
    const [ stayLoggedIn, setStayLoggedIn ] = useState<boolean>( false );
    async function handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        // reset error message
        setEmailErrorMessage( "" );
        setPasswordErrorMessage( "" );


        LoginFormValidation( { email, password, stayLoggedIn, setEmailErrorMessage, setPasswordErrorMessage } );
    }



    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <LoginFormInfo />
            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-5">
                {/* EMAIL INPUT */}
                <EmailInput value={email} onChange={( value ) => {
                    setEmail( value )
                    setEmailErrorMessage( "" )
                }} errorMessage={emailErrorMessage} />
                {/* PASSWORD INPUT */}
                <PasswordInput value={password} onChange={( value ) => {
                    setPassword( value )
                    setPasswordErrorMessage( "" )
                }} errorMessage={passwordErrorMessage} />
                {/* CHECK IF STAY LOGGED IN */}
                <StayLoggedIn stayLoggedIn={stayLoggedIn} setStayLoggedIn={setStayLoggedIn} />
                {/* SUBMIT BUTTON */}
                <button type="submit" className="w-full bg-blue-950 text-white px-4 py-2 rounded-md">
                    {LOGIN_FORM_SUBMIT_BUTTON_LABEL.value.AR}
                </button>
            </form>
        </div>
    );
}