import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { CiFilter } from "react-icons/ci";

export default function FilterUsersSheet({
  lang = "AR",
}: {
  lang?: "AR" | "EN";
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CiFilter size={24} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={lang === "AR" ? "right" : "left"}>
        <SheetHeader className="text-left">
          <SheetTitle>users filter</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
