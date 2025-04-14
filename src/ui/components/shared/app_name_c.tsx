import { APP_NAME } from "@/data/constants"
import { cn } from "@/lib/utils"

interface AppNameComponentProps {
    isSplashScreen?: boolean
    size?: 'small' | 'medium' | 'large'
    className?: string
}
export default function AppNameComponent({ isSplashScreen, size, className }: AppNameComponentProps) {
    const appNameSplit = APP_NAME.value.AR.split(" ")
    return (
        <div className={cn(
            "text-2xl font-bold flex flex-col items-center justify-center",
            isSplashScreen ? "text-4xl items-start" : size === "small" ? "text-sm" : size === "medium" ? "text-2xl" : "text-3xl",
            className
        )}>
            {appNameSplit.map((name, index) => (
                <span key={index}>{name}</span>
            ))}
        </div>
    )
}
