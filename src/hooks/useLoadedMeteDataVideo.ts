"use client";

import { useEffect, useRef, useState } from "react";

interface UseLoadedMetaDataVideoProps {
  playerRef: any;
}

const useLoadedMetaDataVideo = ({ playerRef }: UseLoadedMetaDataVideoProps) => {
  const [isReady, setIsReady] = useState(false);

  // Theo dõi khi metadata đã load xong
  useEffect(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;

    const handleLoaded = () => {
      setIsReady(true);
    };

    player.on("loadedmetadata", handleLoaded);

    return () => {
      player.off("loadedmetadata", handleLoaded);
    };
  }, [playerRef]);

  return isReady;
};

export default useLoadedMetaDataVideo;
