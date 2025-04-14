import HeaderC from "@/ui/components/dashboard/header/header-c";
import Nav from "@/ui/components/dashboard/nav/nav";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <HeaderC />
            <main className="flex-1 w-full overflow-y-auto bg-gray-300 dark:bg-gray-800">
                <div className="h-full">
                    {children}
                </div>
            </main>
            <Nav />
        </div>
    )
}
