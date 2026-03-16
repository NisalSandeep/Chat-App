import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

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
    <div className="flex h-[72px] flex-shrink-0 items-center justify-between border-b border-slate-700/50 bg-slate-800/70 px-4 md:px-5">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-10 rounded-full md:w-11">
            <img src={selectedUser.profilePic || "/avatar.png"} alt="profile" />
          </div>
        </div>
        <div>
          <h3 className="text-slate-100 font-medium leading-tight">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-slate-400">online</p>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
      >
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
