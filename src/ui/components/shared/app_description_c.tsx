import { APP_DESCRIPTION } from "@/data/constants"
import { cn } from "@/lib/utils"
interface AppDescriptionComponentProps {
    isSplashScreen?: boolean
    size?: 'small' | 'medium' | 'large'
    className?: string
}

export default function AppDescriptionComponent( { isSplashScreen, size, className }: AppDescriptionComponentProps ) {
    return (
        <div className={cn(
            "text-sm max-w-xl text-center",
            isSplashScreen ? "text-sm" : size === "small" ? "text-xs" : size === "medium" ? "text-sm" : "text-base",
            className
        )}>
            {APP_DESCRIPTION.value.AR}
        </div>
    )
}
