import { cn } from "@/lib/utils";

const mainRoleTitle = "مدير المنصة"

export default function MainRoleTitle() {
  return (
    <div className={cn(
      "text-2xl font-bold flex flex-col items-center justify-center",
      "text-blue-950 dark:text-white",
      "hidden md:block"
    )}>
      {mainRoleTitle}
    </div>
  )
}
