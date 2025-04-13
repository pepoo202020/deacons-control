import { cn } from "@/lib/utils"
import Image from "next/image"
interface LogoComponentProps {
    className?: string
    size?: 'small' | 'medium' | 'large'
    isSplashScreen?: boolean
}

export default function LogoComponent( { className, size, isSplashScreen }: LogoComponentProps ) {
    return <div className={cn( "flex items-center justify-center", className )}>
        {isSplashScreen && (
            <div className="w-20 h-20 relative">
                <Image src="/darkLogo.png" alt="logo" fill priority sizes="100%" />
            </div>
        )}
        <div className={
            cn(
                size === "small" ? "w-10 h-10" : size === "medium" ? "w-16 h-16" : "w-20 h-20",
                isSplashScreen ? "hidden" : "block",
                "dark:bg-[url('/darkLogo.png')] bg-[url('/light.jpg')]",
                "bg-no-repeat bg-center bg-contain",
            )
        } />
    </div>;
}

