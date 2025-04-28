import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";

type CustomToastProps = {
  id: string;
  avatar?: string;
  name: string;
  message: string;
  lang?: "AR" | "EN";
  type?: "success" | "error" | "loading" | "custom";
};
export const CustomToaster = ({
  id,
  avatar,
  name,
  message,
  lang = "AR",
  type = "custom"
}: CustomToastProps) => {
  return (
    <div
      className={cn(
        `animate-enter max-w-md w-full  shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/5`,
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : type === "loading"
          ? "bg-blue-500"
          : "bg-white",
      )}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {avatar ? (
              <Image
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt={name}
                width={40}
                height={40}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className={lang ===  'AR' ? "mr-3 flex-1" : "ml-3 flex-1"}>
            <p className={
                cn(
                  "text-sm font-bold ",
                  type === "custom" ? "text-gray-800" : "text-white"
                )
            }>{name}</p>
            <p className={
                cn(
                    "mt-1 text-sm ",
                    type === "custom"? "text-gray-500" : "text-white"
                )
            }>{message}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(id)}
          className={cn(
            "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-500",
            type === "custom"? "bg-red-800 text-white" : "bg-white text-red-800"
          )}
        >
          {lang === "AR" ? "إغلاق" : "Close"}
        </button>
      </div>
    </div>
  );
};

export function showCustomToast({
    avatar,
    name,
    message,
    lang = "AR",
    type = "custom",
  }: Omit<CustomToastProps, "id">) {
    const id = toast.custom((t) => (
      <CustomToaster
        id={t.id}
        avatar={avatar}
        name={name}
        message={message}
        lang={lang}
        type={type}
      />
    ));
    return id;
  }