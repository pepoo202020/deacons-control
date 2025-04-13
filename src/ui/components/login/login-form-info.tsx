
import { LOGIN_FORM_TITLE, LOGIN_FORM_DESCRIPTION } from "@/data/constants";

export default function LoginFormInfo() {
    return <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">
            {LOGIN_FORM_TITLE.value.AR}
        </h1>
        <p className="text-sm text-gray-500">
            {LOGIN_FORM_DESCRIPTION.value.AR}
        </p>
    </div>;
}