'use client'

import { LOGIN_FORM_SUBMIT_BUTTON_LABEL } from "@/data/constants";
import { useFormStatus } from "react-dom";
import LoaderC from "../shared/loader-c";

export default function SubmitLoginButton() {
    const { pending } = useFormStatus();

    return <button type="submit" className="w-full bg-blue-950 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300 flex items-center justify-center">
        {pending ? <LoaderC inButton={true} size="small" /> : LOGIN_FORM_SUBMIT_BUTTON_LABEL.value.AR}
    </button>
}
