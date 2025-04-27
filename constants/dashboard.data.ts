import { FaHome } from "react-icons/fa"

export const HEADER_DATA = {
    mainTitle: {
        EN: "Dashboard For",
        AR: "لوحة التحكم ال"
    },
}

export const MENU_NAV_DATA = [
    {
        title: {
            EN: "Home",
            AR: "الرئيسية"
        },
        icon: FaHome,
        link: '/dashboard',
        roles: ['admin', 'controller', 'teacher']
    }
]