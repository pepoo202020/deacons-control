'use client'
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
interface AlertProps {
    message: string;
    type: "success" | "error";
    show?: boolean;
    duration?: number;
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    title: string;

}
export default function Alert( { message, type, show = true, duration = 1500, position, title }: AlertProps ) {
    const [ isShow, setIsShow ] = useState( show );
    useEffect( () => {
        setIsShow( show );
        const timer = setTimeout( () => {
            setIsShow( false );
        }, duration );
        return () => clearTimeout( timer );
    }, [ duration, show ] );

    const onClose = () => {
        setIsShow( false );
    }
    if ( !show ) {
        return null;
    }
    return (
        <div className={cn(
            "fixed top-5 z-50 max-w-xs w-full transition-all duration-300 ease-in-out rounded-md flex items-center justify-center",
            position === "top-right" && "right-5",
            position === "top-left" && "left-5",
            position === "bottom-right" && "right-5",
            position === "bottom-left" && "left-5",
            position === "top-center" && "left-1/2 -translate-x-1/2",
            position === "bottom-center" && "left-1/2 -translate-x-1/2",
            show ? "opacity-100" : "opacity-0",
            show ? "translate-y-0" : "translate-y-10",
            type === "success" && "bg-green-500",
            type === "error" && "bg-red-500",
            "px-4 py-2",
            isShow ? "opacity-100" : "opacity-0",
            isShow ? "translate-y-0" : "translate-y-10",

        )}>
            <div className="w-full h-full flex flex-col items-start justify-between relative">
                <div className="flex items-center justify-between gap-2">
                    {type === 'success' && <CheckCircleIcon className="w-4 h-4 text-white" />}
                    {type === 'error' && <XCircleIcon className="w-4 h-4 text-white" />}
                    <h5 className="text-white text-sm font-bold">{title}</h5>
                </div>
                <p className="text-white text-xs  px-2">{message}</p>
                <button onClick={onClose} className="text-white text-xs font-semibold absolute left-0 top-0">X</button>
            </div>
        </div>
    )
}
