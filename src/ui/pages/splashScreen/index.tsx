'use client'
import AppDescriptionComponent from "@/ui/components/shared/app_description_c";
import BrandComponent from "@/ui/components/shared/brand_c";
import { GET_STARTED_BUTTON, DEVELOPED_BY, APP_VERSION } from "@/data/constants";
import { useRouter } from "next/navigation";
export default function SplashScreen() {
    const router = useRouter();


    const handleGetStarted = () => {
        router.push( '/login' );
    }

    return <div className="
        flex flex-col items-center justify-center min-h-screen bg-[#1E263B] text-white
        p-5
    ">
        <div className="flex flex-col gap-5 items-center justify-center flex-1">
            {/* Brand COMPONENT */}
            <BrandComponent isSplashScreen={true} />

            {/* APP DESCRIPTION COMPONENT */}
            <AppDescriptionComponent isSplashScreen={true} />
            {/* GET STARTED BUTTON */}
            <button onClick={handleGetStarted} className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300">{GET_STARTED_BUTTON.value.AR}</button>
        </div>

        <p className="text-sm text-center flex flex-col gap-0.5">
            {DEVELOPED_BY.value.AR}
            <span className="text-xs text-gray-400">
                {APP_VERSION.value.AR}
            </span>
        </p>

    </div>;
}

