"use client";

import { BsEmojiDizzy } from "react-icons/bs";
import { MdKeyboardAlt, MdKeyboardVoice } from "react-icons/md";
import { RiUserVoiceFill, RiVoiceprintFill } from "react-icons/ri";

interface LanguageIconProps {
  language: "vietsub" | "thuyet-minh" | "long-tieng" | "undetermined" | string;
}

const LanguageIcon = ({ language }: LanguageIconProps) => {
  if (language.includes("vietsub")) return <MdKeyboardAlt />;
  if (language.includes("thuyet-minh")) return <RiUserVoiceFill />;
  if (language.includes("long-tieng")) return <MdKeyboardVoice />;
  if (language.includes("undetermined")) return <BsEmojiDizzy />;

  return <RiVoiceprintFill />;
};

export default LanguageIcon;
