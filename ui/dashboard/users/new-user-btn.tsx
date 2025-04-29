"use client";

import NewButton from "@/components/newButton";
import { NEW_USER_BUTTON_DATA } from "@/constants/users.data";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import NewUserDialog from "./new-user-dialog";

export default function NewUserBtn({ lang = "AR" }: { lang?: "AR" | "EN" }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <NewButton
        Icon={IoMdAdd}
        handleClick={handleClick}
        lang={lang}
        text={NEW_USER_BUTTON_DATA[lang]}
      />
      <NewUserDialog open={open} onOpenChange={handleClick} />
    </>
  );
}
