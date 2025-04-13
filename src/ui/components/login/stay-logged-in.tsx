import { LOGIN_FORM_STAY_LOGGED_IN_LABEL } from "@/data/constants";

interface StayLoggedInProps {
    stayLoggedIn: boolean;
    setStayLoggedIn: ( stayLoggedIn: boolean ) => void;
}

export default function StayLoggedIn( { stayLoggedIn, setStayLoggedIn }: StayLoggedInProps ) {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" checked={stayLoggedIn} onChange={( e ) => setStayLoggedIn( e.target.checked )} />
            <label htmlFor="stayLoggedIn">{LOGIN_FORM_STAY_LOGGED_IN_LABEL.value.AR}</label>
        </div>
    )
}
