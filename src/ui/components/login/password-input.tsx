'use client'
import { LOGIN_FORM_PASSWORD_LABEL } from "@/data/constants";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff, LockIcon } from "lucide-react";
import { useState } from "react";
interface PasswordInputProps {
    errorMessage?: string;
    value: string;
    onChange: ( value: string ) => void;
}
export default function PasswordInput( { errorMessage, value, onChange }: PasswordInputProps ) {
    const [ showPassword, setShowPassword ] = useState<boolean>( false );
    return (
        <div className="w-full flex flex-col items-start">
            <label htmlFor="password" className="
                text-xs sm:text-sm tracking-wide mb-1
            ">
                {LOGIN_FORM_PASSWORD_LABEL.value.AR}
            </label>
            <div className="relative w-full">
                <div className="
                    flex items-center justify-center
                    absolute inset-0 bottom-0
                    w-10 bg-gray-100 dark:bg-gray-800
                    rounded-r-md
                ">
                    <LockIcon className="w-5 h-5" />
                </div>
                <input id="password" type={showPassword ? "text" : "password"} placeholder="********" value={value} onChange={( e ) => onChange( e.target.value )} className={
                    cn(
                        "text-sm sm:text-base relative w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none rounded-md px-12 py-2",
                        // error styles
                        errorMessage && "border-red-500 focus:border-red-500"
                    )
                } />
                <button type="button" className="absolute left-0 top-0 bottom-0 rounded-r-md px-2" onClick={() => setShowPassword( !showPassword )}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            </div>
            {/* error message */}
            <p className="text-xs text-red-500 mt-2">
                {errorMessage}
            </p>
        </div>
    )
}
