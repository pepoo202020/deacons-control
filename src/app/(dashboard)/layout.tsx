import HeaderC from "@/ui/components/dashboard/header/header-c";
import Nav from "@/ui/components/dashboard/nav/nav";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <HeaderC />
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                {children}
            </div>
            <Nav />
        </div>
    )
}
