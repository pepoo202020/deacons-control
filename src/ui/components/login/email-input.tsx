import { LOGIN_FORM_EMAIL_LABEL } from "@/data/constants";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

interface EmailInputProps {
    errorMessage?: string;
    value: string;
    onChange: ( value: string ) => void;
}
export default function EmailInput( { errorMessage, value, onChange }: EmailInputProps ) {
    return (
        <div className="w-full flex flex-col items-start">
            <label htmlFor="email" className="
                text-xs sm:text-sm tracking-wide mb-1
            ">
                {LOGIN_FORM_EMAIL_LABEL.value.AR}
            </label>
            <div className="relative w-full">
                <div className="
                    flex items-center justify-center
                    absolute inset-0 bottom-0
                    w-10 bg-gray-100 dark:bg-gray-800
                    rounded-r-md
                ">
                    <MailIcon className="w-5 h-5" />
                </div>
                <input id="email" type="email" placeholder="example@email.com" value={value} onChange={( e ) => onChange( e.target.value )} className={
                    cn(
                        "text-sm sm:text-base relative w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none rounded-md px-12 py-2",
                        // error styles
                        errorMessage && "border-red-500 focus:border-red-500"
                    )
                } />
            </div>
            {/* error message */}
            <p className="text-xs text-red-500 mt-2">
                {errorMessage}
            </p>
        </div>
    )
}
