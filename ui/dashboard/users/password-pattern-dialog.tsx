"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NEW_USER_DIALOG_DATA,
  PASSWORD_PATTERN_DIALOG_DATA,
} from "@/constants/users.data";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import PrePasswordPatterns from "./pre-password-patterns";

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

export default function PasswordPatternDialog({
  open,
  onOpenChange,
  lang = "AR",
  selectedPattern,
  onSelectPattern,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: "AR" | "EN";
  selectedPattern: string;
  onSelectPattern: (pattern: string) => void;
}) {
  const [customPattern, setCustomPattern] = useState<string>("");

  const handleSelectPattern = (pattern: string) => {
    onSelectPattern(pattern);
    setCustomPattern("");
    onOpenChange(false);
  };

  const handleSaveCustomPattern = () => {
    if (customPattern) {
      onSelectPattern(customPattern);
      setCustomPattern("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center pb-2">
            {PASSWORD_PATTERN_DIALOG_DATA.title[lang]}
          </DialogTitle>
          <DialogDescription className="text-center">
            {PASSWORD_PATTERN_DIALOG_DATA.description[lang]}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4" dir={lang === "AR" ? "rtl" : "ltr"}>
          <div className="space-y-2">
            <h3 className="text-sm font-medium font-cairo">
              {PASSWORD_PATTERN_DIALOG_DATA.previousPatterns[lang]}
            </h3>
            <PrePasswordPatterns
              onOpenChange={onOpenChange}
              onSelectPattern={onSelectPattern}
              selectedPattern={selectedPattern}
              lang={lang}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium font-cairo">
              {lang === "AR" ? "نمط مخصص" : "Custom Pattern"}
            </h3>
            <Input
              type="text"
              placeholder={
                lang === "AR" ? "أدخل نمط Regex" : "Enter Regex pattern"
              }
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              className="global-input rounded-md border-gray-300 font-cairo"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setCustomPattern("");
              onOpenChange(false);
            }}
            className="font-cairo"
          >
            {lang === "AR" ? "إلغاء" : "Cancel"}
          </Button>
          <Button
            onClick={handleSaveCustomPattern}
            disabled={!customPattern}
            className="font-cairo"
          >
            {lang === "AR" ? "حفظ النمط المخصص" : "Save Custom Pattern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
