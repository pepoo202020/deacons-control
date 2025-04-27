import { LOADING_DATA } from "@/constants/loading.data";

export default function Loading() {
    const lang = 'AR';
  return (
    <div className="main-page">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white" />
        <p className="mt-4 text-white text-lg animate-pulse">
            {LOADING_DATA[lang]}
        </p>
    </div>
  )
}
