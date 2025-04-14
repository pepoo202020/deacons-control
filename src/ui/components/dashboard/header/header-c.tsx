import MainRoleTitle from "@/ui/components/dashboard/header/main-role-title";
import BrandComponent from "@/ui/components/shared/brand_c";
import RolesChanger from "@/ui/components/dashboard/header/roles-changer";
import UserInfo from "@/ui/components/dashboard/header/user-info";
import { cn } from "@/lib/utils";

// Example usage in header-c.tsx:

// const mockRoles = [
//     {
//         id: '1',
//         name: { AR: 'مدير المنصة', EN: 'Platform Admin' },
//         permissions: ['all']
//     },
//     {
//         id: '2',
//         name: { AR: 'مشرف', EN: 'Supervisor' },
//         permissions: ['view', 'edit']
//     },
//     {
//         id: '3',
//         name: { AR: 'مستخدم', EN: 'User' },
//         permissions: ['view']
//     }
// ];
/*
// In HeaderC component:
const [currentRole, setCurrentRole] = useState(mockRoles[0]);

<RolesChanger 
  currentRole={currentRole}
  roles={mockRoles}
  onRoleChange={setCurrentRole}
/>
*/

export default function HeaderC() {
    return (
        <header className={cn(
            "w-full h-16 min-h-[64px] bg-blue-950 text-white flex items-center justify-between px-4",
            "sticky top-0 z-50",
        )}>
            {/* Logo */}
            <BrandComponent isSplashScreen={false} size="small" />
            {/* MAIN ROLE TITLE */}
            <MainRoleTitle />
            {/* LEFT SIDE (ROLES CHANGER + USER INFO) */}
            <div className="flex items-center gap-4">
                {/* ROLES CHANGER */}
                <RolesChanger />
                {/* USER INFO */}
                <UserInfo />
            </div>

        </header>
    )
}
