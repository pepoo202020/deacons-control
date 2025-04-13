import LogoComponent from "@/ui/components/shared/logo_c";
import AppNameComponent from "@/ui/components/shared/app_name_c";
interface BrandComponentProps {
    isSplashScreen?: boolean
    size?: 'small' | 'medium' | 'large'
}

export default function BrandComponent( { isSplashScreen, size }: BrandComponentProps ) {
    return (
        <div className="flex items-center justify-center gap-2">
            {/* Logo COMPONENT */}
            <LogoComponent isSplashScreen={isSplashScreen} size={size} />
            {/* APP NAME COMPONENT */}
            <AppNameComponent isSplashScreen={isSplashScreen} />
        </div>
    )
}
