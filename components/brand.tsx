import { cn } from "@/lib/utils";
import Logo from "./logo";
import { MAIN_PAGE_DATA } from "@/constants/main-page.data";

export default function Brand(
    {size, splashScreen = false, lang = 'AR' } : { size: 'SM' | 'MD' | 'LG', splashScreen?: boolean, lang?: 'AR' | 'EN' }
) {
  return (
    <div className={
        cn(
           "flex items-center gap-2",
           
        )
    } dir={lang === 'EN' ? "ltr" : "rtl"}>
        {/* logo */}
        <Logo size={size} splashScreen={splashScreen} />
        {/* application name */}
        <div className={
            cn(
                size === 'SM'? 'text-xl' : size === 'MD'? 'text-2xl' : 'text-5xl',
                'flex flex-col items-start justify-center gap-2',
                'font-bold',
                splashScreen ? 'text-white' : 'text-blue-950 dark:text-white',
                
            )
        }>
            {
                MAIN_PAGE_DATA.mainTitle[lang].split(' ').map((char, index) => {
                    return <span key={index}>{char}</span>
                })
            }
        </div>
    </div>
  )
}
