import { cn } from "@/lib/utils"

interface LoaderCProps {
    inButton: boolean
    size: "small" | "medium" | "large"
}

const TEXT_LOADING = {
    EN: "Loading...",
    AR: "جاري التحميل..."
}
export default function LoaderC( { inButton, size }: LoaderCProps ) {
    return (
        <div className={cn(
            inButton ? "relative bg-transparent" : "absolute inset-0 bg-blue-950 w-screen h-screen flex flex-col items-center justify-center ",
            "text-white"
        )}>
            {/* LOADER */}
            <div className={cn(
                "border-white/10 rounded-full",
                size === "small" ? "w-5 h-5" : size === "medium" ? "w-14 h-14" : "w-20 h-20",
                "flex items-center justify-center relative",
                inButton ? "mb-0" : "mb-4"
            )}>
                <div className={
                    cn(
                        "border-white border-4 rounded-full border-r-transparent animate-spin",
                        "w-full h-full"

                    )
                } />
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-1/2 h-1/2",
                    "border-white/50 border-4 rounded-full border-r-transparent animate-spin",
                )} />
            </div>
            {/* TEXT */}
            {!inButton && (
                <p className={
                    cn(
                        size === "small" ? "text-xs" : size === "medium" ? "text-lg font-semibold" : "text-xl font-bold",
                    )
                }>
                    {TEXT_LOADING.AR}
                </p>
            )}
        </div>
    )
}
