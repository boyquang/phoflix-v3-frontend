"use client";

import { useState, useRef, useEffect } from "react";
import { handleShowToaster } from "@/lib/utils";
import { IconButton } from "@chakra-ui/react";
import { MdKeyboardVoice, MdStop } from "react-icons/md";
interface VoiceButtonProps {
  callback: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  rounded?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

const VoiceButton = ({
  callback,
  size = "md",
  rounded = "full",
}: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      setIsSupported(true);
    }
  }, []);

  const handleVoiceSearch = () => {
    // Nếu đang nghe thì dừng lại
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      handleShowToaster("Thông báo", "Đã dừng lắng nghe giọng nói.");
      return;
    }

    if (!("webkitSpeechRecognition" in window)) {
      handleShowToaster("Thông báo", "Trình duyệt không hỗ trợ tính năng này.");
      return;
    }

    // Kích hoạt rung thông báo trên thiết bị di động
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Khởi tạo đối tượng SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Lưu đối tượng recognition vào ref để có thể dừng nó sau này
    recognitionRef.current = recognition;

    // Thiết lập các thuộc tính cho đối tượng recognition
    recognition.lang = "vi-VN"; // Ngôn ngữ nhận diện
    recognition.continuous = false; // Không lặp lại liên tục
    recognition.interimResults = false; // Kết quả tạm thời không được trả về

    recognition.onstart = () => {
      setIsListening(true);
      handleShowToaster("Thông báo", "Đang lắng nghe giọng nói...");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;

      callback(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      handleShowToaster(
        "Thông báo",
        "Có lỗi xảy ra trong quá trình nhận diện."
      );
      setIsListening(false);
    };

    // Bắt đầu ghi âm
    recognition.start();
  };

  if (!isSupported) return null;

  return (
    <IconButton
      onClick={handleVoiceSearch}
      size={size}
      rounded={rounded}
      className={`bg-transparent rounded-full hover:bg-[#ffffff2f] ${
        isListening ? "text-red-500" : ""
      }`}
      aria-label={isListening ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
    >
      {isListening ? <MdStop /> : <MdKeyboardVoice />}
    </IconButton>
  );
};

export default VoiceButton;
