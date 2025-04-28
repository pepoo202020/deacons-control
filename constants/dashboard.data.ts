import { FaHome, FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

export const HEADER_DATA = {
  mainTitle: {
    EN: "Dashboard For",
    AR: "لوحة التحكم ال",
  },
};

export const MENU_NAV_DATA = [
  {
    title: {
      EN: "Home",
      AR: "الرئيسية",
    },
    icon: FaHome,
    link: "/dashboard",
    roles: ["admin", "controller", "teacher"],
  },
  {
    title: {
      EN: "Roles",
      AR: "الادوار",
    },
    icon: RiAdminFill,
    link: "/dashboard/roles",
    roles: ["admin", "controller"],
  },
  {
    title: {
      EN: "Users",
      AR: "المستخدمين",
    },
    icon: FaUsers,
    link: "/dashboard/users",
    roles: ["admin", "controller"],
  },
];
