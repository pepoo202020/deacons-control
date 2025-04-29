"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const predefinedPatterns = [
  {
    name: "At least 8 characters, 1 number, 1 letter",
    regex: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    example: "Password1",
  },
  {
    name: "At least 12 characters, 1 uppercase, 1 special character",
    regex: "^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{12,}$",
    example: "Secure@123456",
  },
  {
    name: "Letters and numbers only, 6-20 characters",
    regex: "^[A-Za-z0-9]{6,20}$",
    example: "abc123",
  },
];

export default function PrePasswordPatterns({
  selectedPattern,
  onSelectPattern,
  onOpenChange,
  lang = "AR",
}: {
  selectedPattern: string;
  onSelectPattern: (pattern: string) => void;
  onOpenChange: (open: boolean) => void;
  lang?: "AR" | "EN";
}) {
  const [customPattern, setCustomPattern] = useState<string>("");
  const handleSelectPattern = (pattern: string) => {
    onSelectPattern(pattern);
    setCustomPattern("");
    onOpenChange(false);
  };
  return predefinedPatterns.map((pattern: any) => (
    <div
      key={pattern.regex}
      className={cn(
        "border rounded-md mb-2",
        selectedPattern === pattern.regex
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200"
      )}
      onClick={() => handleSelectPattern(pattern.regex)}
    >
      <div className="space-y-1">
        <p className="text-xs text-gray-500  p-2">
          {lang === "AR" ? "مثال:" : "Example:"} {pattern.regex}
        </p>
      </div>
    </div>
  ));
}
