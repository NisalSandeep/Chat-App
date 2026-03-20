import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineusers } = useAuthStore();
  const isOnline = onlineusers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      } 
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-700/50 bg-slate-800/70 px-3 md:h-[72px] md:px-5">
      <div className="min-w-0 flex items-center gap-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-9 rounded-full md:w-11">
            <img src={selectedUser.profilePic || "/avatar.png"} alt="profile" />
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium leading-tight text-slate-100 md:text-base">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-sky-300/90">{isOnline ? "Online":  "Offline"}</p>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="ml-2 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
      >
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
