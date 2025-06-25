"use client";

import { useEffect } from "react";

interface UseDisposeVideoJsProps {
  playerRef: React.RefObject<any>;
}

const useDisposeVideoJs = ({ playerRef }: UseDisposeVideoJsProps) => {
  // Hủy bỏ trình phát Video.js khi thành phần chức năng bị ngắt kết nối
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);
};

export default useDisposeVideoJs;
