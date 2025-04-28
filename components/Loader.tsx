// components/ui/Loader.tsx
"use client";

import { cn } from "@/lib/utils";

type LoaderProps = {
  lang?: "AR" | "EN";
  className?: string;
};

export default function Loader({ lang = "AR", className }: LoaderProps) {
  return (
    <div
      className={cn("main-page", className)}
      dir={lang === "AR" ? "rtl" : "ltr"}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white" />
      <p className="text-sm font-medium text-gray-600 font-cairo">
        {lang === "AR" ? "جارٍ التحميل..." : "Loading..."}
      </p>
    </div>
  );
}
