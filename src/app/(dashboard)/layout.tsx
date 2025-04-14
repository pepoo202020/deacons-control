import HeaderC from "@/ui/components/dashboard/header/header-c";

export default function DashboardLayout( { children }: { children: React.ReactNode } ) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <HeaderC />
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                {children}
            </div>
            <div className="w-full h-16 bg-blue-950 text-white flex items-center justify-center">
                nav
            </div>
        </div>
    )
}
