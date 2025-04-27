import { checkUserSession } from "@/lib/auth"

export const checkSession = async () => {
    const user = await checkUserSession();
    if (user) {
        return true;
    } else {
        return false;}
}