"use client";
import { StepperIndicator } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NEW_USER_DIALOG_DATA } from "@/constants/users.data";
import React, { useState } from "react";

import { AiOutlineUserAdd } from "react-icons/ai";
import UserAccountForm, { userAccountSchema } from "./user-account-form";
import { z } from "zod";
import { MdAdminPanelSettings, MdAssignmentInd } from "react-icons/md";
import PasswordPatternDialog from "./password-pattern-dialog";

export default function NewUserDialog({
  open,
  onOpenChange,
  lang = "AR",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: "AR" | "EN";
}) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [passwordPattern, setPasswordPattern] = useState<string>("");
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [patternDialogOpen, setPatternDialogOpen] = useState<boolean>(false);

  const totalSteps = 3;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = () => {
    if (!isLastStep) setActiveStep((cur) => cur + 1);
  };
  const handleBack = () => {
    if (!isFirstStep) setActiveStep((cur) => cur - 1);
  };

  async function handleUserAccountSubmit(
    data: z.infer<typeof userAccountSchema>
  ) {
    console.log(data);
  }

  const handleSubmit = () => {
    onOpenChange(false);
    setActiveStep(0);
    setPasswordPattern("");
    setSendEmail(false);
  };
  const handleSkip = () => {
    onOpenChange(false);
    setActiveStep(0);
    setPasswordPattern("");
    setSendEmail(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setActiveStep(0);
    setPasswordPattern("");
    setSendEmail(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-semibold text-blue-950 dark:text-white">
              {NEW_USER_DIALOG_DATA.title[lang]}
            </DialogTitle>
            <DialogDescription className="text-center">
              {NEW_USER_DIALOG_DATA.description[lang]}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 w-full">
            <div className="flex items-center justify-between">
              <StepperIndicator
                currentStep={activeStep === 0}
                successPreStep={activeStep > 0}
                Icon={AiOutlineUserAdd}
                text={NEW_USER_DIALOG_DATA.stepsIndicators.account[lang]}
              />

              <StepperIndicator
                currentStep={activeStep === 1}
                successPreStep={activeStep > 1}
                Icon={MdAdminPanelSettings}
                text={NEW_USER_DIALOG_DATA.stepsIndicators.assignRole[lang]}
              />

              <StepperIndicator
                currentStep={activeStep === 2}
                successPreStep={false}
                Icon={MdAssignmentInd}
                text={NEW_USER_DIALOG_DATA.stepsIndicators.assignClass[lang]}
                isLastStep={true}
              />
            </div>
            {activeStep === 0 && (
              <UserAccountForm
                handleSubmit={handleUserAccountSubmit}
                lang={lang}
                passwordPatternText={passwordPattern}
                setPasswordPatternText={setPasswordPattern}
                setSendEmail={setSendEmail}
                openPatternDialog={() => setPatternDialogOpen(true)}
                isSubmitting={isSubmitting}
              />
            )}
            {activeStep === 1 && <AssignRoleStep />}
            {activeStep === 2 && <AssignClassesStep />}
          </div>
          <div className="flex w-full gap-2 flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Button
                onClick={activeStep === 2 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    {NEW_USER_DIALOG_DATA.buttons.isSubmitting[lang]}
                  </>
                ) : activeStep === 2 ? (
                  NEW_USER_DIALOG_DATA.buttons.submit[lang]
                ) : (
                  NEW_USER_DIALOG_DATA.buttons.next[lang]
                )}
              </Button>
              <Button onClick={handleSkip} disabled={isSubmitting}>
                {NEW_USER_DIALOG_DATA.buttons.skip[lang]}
              </Button>
              <Button
                onClick={handleBack}
                disabled={isFirstStep || isSubmitting}
              >
                {NEW_USER_DIALOG_DATA.buttons.back[lang]}
              </Button>
            </div>
            <Button onClick={handleCancel} disabled={isSubmitting}>
              {NEW_USER_DIALOG_DATA.buttons.cancel[lang]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <PasswordPatternDialog
        open={patternDialogOpen}
        onOpenChange={setPatternDialogOpen}
        lang={lang}
        selectedPattern={passwordPattern}
        onSelectPattern={setPasswordPattern}
      />
    </>
  );
}

const AssignRoleStep = () => {
  return <div>Assign Role</div>;
};

const AssignClassesStep = () => {
  return <div>Assign Classes</div>;
};
