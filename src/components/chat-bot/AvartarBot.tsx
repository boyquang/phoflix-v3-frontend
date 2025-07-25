"use client";

const AvatarBot = () => {
  return (
    <div className="w-8 h-8 relative">
      <img
        src="/images/bot.jpg"
        alt="Bot Avatar"
        className="absolute inset-0 w-full h-full rounded-full object-cover"
      />
    </div>
  );
}
 
export default AvatarBot;