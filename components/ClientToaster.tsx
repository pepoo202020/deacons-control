"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster({lang = 'AR'} : {lang?: 'AR' | 'EN'}) {
  return <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      style: {
        direction: lang === 'AR' ? 'rtl' : 'ltr',
        textAlign: lang === 'AR'? 'right' : 'left',
      }
    }}
  />;
}