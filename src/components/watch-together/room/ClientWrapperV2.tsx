"use client";

import { getRoomData } from "@/store/async-thunks/watch-together-v2.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ClientWrapperV2Props {
  roomId: string;
}

const ClientWrapperV2 = ({ roomId }: ClientWrapperV2Props) => {
  const { fetched, roomData } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();

  console.log("roomData", roomData);

  useEffect(() => {
    if (status !== "authenticated" || !roomId || fetched) return;

    dispatch(
      getRoomData({
        roomId: roomId as string,
        accessToken: session?.user.accessToken || "",
      })
    );
  }, [status, roomId, dispatch, session?.user.accessToken, fetched]);

  return <div className="min-h-screen"></div>;
};

export default ClientWrapperV2;
