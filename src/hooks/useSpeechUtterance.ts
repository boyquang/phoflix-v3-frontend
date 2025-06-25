"use client";

import { useCallback } from "react";

interface UseSpeechUtteranceProps {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

export const useSpeechUtterance = ({
  lang = "en-US",
  rate = 1,
  pitch = 1,
  voice,
}: UseSpeechUtteranceProps = {}) => {
  const createUtterance = useCallback(
    (
      text: string,
      options?: {
        onStart?: () => void;
        onEnd?: () => void;
        onError?: (e: SpeechSynthesisErrorEvent) => void;
      }
    ) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (voice) {
        utterance.voice = voice;
      }

      if (options?.onStart) utterance.onstart = options.onStart;
      if (options?.onEnd) utterance.onend = options.onEnd;
      if (options?.onError) utterance.onerror = options.onError;

      return utterance;
    },
    [lang, rate, pitch, voice]
  );

  return { createUtterance };
};
