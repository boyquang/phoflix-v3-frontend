"use client";

import { useSpeechUtterance } from "@/hooks/useSpeechUtterance";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { RiUserVoiceFill } from "react-icons/ri";

interface TextToSpeechProps {
  text: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  icon?: React.ReactNode;
  textString?: string;
  lang?: "en-US" | "vi-VN";
  callback?: () => void;
}

const TextToSpeech = ({
  text,
  size = "xs",
  icon,
  lang = "en-US",
  textString = "Nghe nội dung",
  showText = true,
  callback,
}: TextToSpeechProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { createUtterance } = useSpeechUtterance({
    lang,
    rate: 1,
    pitch: 1,
  });

  const handleTextToSpeech = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = createUtterance(text, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });

    speechSynthesis.speak(utterance);

    if (callback) callback();
  };

  return (
    <Button
      onClick={handleTextToSpeech}
      size={size}
      className="bg-transparent border border-[#ffffff10] hover:bg-[#ffffff10] rounded-full"
    >
      {icon || <RiUserVoiceFill />}
      {showText && (
        <span className="text-xs text-gray-300">
          {isSpeaking ? "Dừng đọc" : textString}
        </span>
      )}
    </Button>
  );
};

export default TextToSpeech;
