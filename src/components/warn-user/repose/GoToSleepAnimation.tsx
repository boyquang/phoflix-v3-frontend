"use client";

import {
  setOpenAlertRepose,
  setShowAnimationReposeUser,
} from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FaMoon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const GoToSleepAnimation = () => {
  const { showAnimation } = useSelector(
    (state: RootState) => state.system.warnUser.repose
  );
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowAnimationReposeUser(false));
    dispatch(setOpenAlertRepose(false));
    document.body.classList.remove("repose-user");
  };

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(handleClose, 30 * 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <>
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <FaMoon
                size={64}
                className="mx-auto text-yellow-400 animate-pulse"
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-4 md:text-2xl text-lg font-bold text-white max-w-sm"
              >
                Đã đến lúc bạn nên nghỉ ngơi sau những giờ phút giải trí.Chúc
                bạn ngủ ngon và có một đêm an lành! 😴
              </motion.h2>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GoToSleepAnimation;
