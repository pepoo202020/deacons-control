import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FaCheck } from "react-icons/fa";

export const StepperIndicator = ({
  currentStep,
  successPreStep,
  Icon,
  text,
  isLastStep,
}: {
  currentStep: boolean;
  successPreStep: boolean;
  Icon: IconType;
  text: string;
  isLastStep?: boolean;
}) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center flex-col relative",
          currentStep ? "text-sky-600" : "text-white"
        )}
      >
        <div
          className={cn(
            "rounded-full transition duration-500 ease-in-out h-12 w-12 border-2  flex items-center justify-center",
            currentStep
              ? "border-sky-600"
              : successPreStep
              ? "border-green-600"
              : "border-sky-600",
            successPreStep
              ? "bg-green-600"
              : currentStep
              ? "bg-white"
              : "bg-sky-600"
          )}
        >
          {successPreStep ? <FaCheck size={30} /> : <Icon size={30} />}
        </div>
        <div
          className={cn(
            "text-center mt-2 text-xs font-medium uppercase",
            successPreStep ? "text-green-600" : "text-sky-600"
          )}
        >
          {text}
        </div>
      </div>
      {!isLastStep && (
        <div
          className={cn(
            "flex-auto border-t-2 pt-5 transition duration-500 ease-in-out",
            currentStep
              ? "border-sky-600"
              : successPreStep
              ? "border-green-600"
              : "border-sky-600"
          )}
        />
      )}
    </>
  );
};
