"use client";

import { BsEmojiDizzy } from "react-icons/bs";
import { MdKeyboardAlt, MdKeyboardVoice } from "react-icons/md";
import { RiUserVoiceFill } from "react-icons/ri";

interface LanguageIconProps {
  language: "vietsub" | "thuyet-minh" | "long-tieng" | "undetermined" | string;
}

const LanguageIcon = ({ language }: LanguageIconProps) => {
  return (
    <>
      {language === "vietsub" && <MdKeyboardAlt />}
      {language === "thuyet-minh" && <RiUserVoiceFill />}
      {language === "long-tieng" && <MdKeyboardVoice />}
      {language === "undetermined" && <BsEmojiDizzy />}
    </>
  );
};

export default LanguageIcon;
