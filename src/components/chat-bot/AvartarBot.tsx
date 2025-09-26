"use client";

import { botAvatar } from "@/constants/image.contant";

const AvatarBot = () => {
  return (
    <div className="lg:w-10 lg:h-10 w-8 h-8 relative flex-shrink-0">
      <img
        src={botAvatar}
        alt="Bot Avatar"
        className="absolute inset-0 w-full h-full rounded-full object-cover"
      />
    </div>
  );
}
 
export default AvatarBot;