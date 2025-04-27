import { cn } from "@/lib/utils";

export default function Logo(
    {size, splashScreen = false,} : { size: 'SM' | 'MD' | 'LG', splashScreen?: boolean }
) {
  return (
    <div
        className={
            cn(
                splashScreen ? 'bg-[url(/dark-logo.png)]' : 'bg-[url(/light-logo.jpg)] dark:bg-[url(/dark-logo.png)]',
                size === 'SM' ? 'w-20 h-20' : size === 'MD' ? 'w-28 h-28' : 'w-32 h-32',
                'bg-center bg-contain bg-no-repeat'
            )
        }
    />
  )
}
