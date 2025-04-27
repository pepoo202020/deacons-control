import DashboardHeader from "@/ui/dashboard/header";
import MenuNav from "@/ui/dashboard/menu-nav";

export default function DashboardLayout(
    {children}: {children: React.ReactNode}
) {
  return (
    <main className="flex flex-col h-full w-full overflow-hidden">
        {/* header */}
        <DashboardHeader />
        <div className="flex-1 p-1 bg-whit dark:bg-neutral-950 text-neutral-950 dark:text-white">
          {children}
        </div>
        {/* menu nav */}
        <MenuNav />
    </main>
  )
}
