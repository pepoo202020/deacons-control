import { LOGIN_FORM_STAY_LOGGED_IN_LABEL } from "@/data/constants";



export default function StayLoggedIn() {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" name="stayLoggedIn" />
            <label htmlFor="stayLoggedIn">{LOGIN_FORM_STAY_LOGGED_IN_LABEL.value.AR}</label>
        </div>
    )
}
