'use client'
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

export default function NewButton(
    {text, Icon, lang='AR', handleClick} : {text: string; Icon: IconType, lang?: "AR"  | "EN", handleClick: () => void}
) {
  return (
    <Button className={cn(
        "absolute bottom-5 cursor-pointer",
        lang === "AR" ? "left-5" : "right-5",
        "flex items-center gap-2 rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75",
        "dark:bg-white dark:text-blue-950 dark:hover:bg-neutral-100 dark:focus:ring-blue-800"
    )}
        onClick={handleClick}
    >
        <span><Icon size={24} /></span>
        <span className="hidden md:block">{text}</span>
    </Button>
  )
}
