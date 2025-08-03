"use client";

import dynamic from "next/dynamic";
import { setShowSnowEffect } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const SwitchCustom = dynamic(() => import("@/components/shared/SwitchCustom"), {
  ssr: false,
});

const SwitchSnowEffect = () => {
  const dispatch: AppDispatch = useDispatch();
  const { events, showSnowEffect } = useSelector(
    (state: RootState) => state.system
  );

  return (
    <SwitchCustom
      disabled={!events["chiristmas"].status}
      defaultChecked={showSnowEffect ? showSnowEffect : false}
      callback={(checked: boolean) => {
        dispatch(setShowSnowEffect(checked));
      }}
    />
  );
};

export default SwitchSnowEffect;
