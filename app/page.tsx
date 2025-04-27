import Brand from "@/components/brand";
import { MAIN_PAGE_DATA } from "@/constants/main-page.data";

export default function Home() {
  const lang = 'AR';
  return (
    <main className="main-page p-2">
      <div className="flex-1 flex flex-col items-center justify-center">
      {/* brand */}
      <Brand size="LG" splashScreen={true} />
      {/* main info page */}
      <h1 className="text-white font-semibold mt-2">{MAIN_PAGE_DATA.mainSubTitle[lang]}</h1>
      </div>
      <div className="text-center font-light space-y-1">
        <h3 >
          {MAIN_PAGE_DATA.createdBy[lang]}
          <span className="mx-1">{MAIN_PAGE_DATA.createdByName[lang]}</span>
        </h3>
        <h2 className="text-yellow-500">
          {MAIN_PAGE_DATA.createdByAssistant[lang]}
        </h2>
        <h5>{MAIN_PAGE_DATA.version[lang]}</h5>
      </div>
    </main>
  );
}
