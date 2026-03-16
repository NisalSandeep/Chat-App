import React, { useEffect } from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import useChatStore from "../store/useChatStore";

const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if(isUsersLoading) {
    return (
      <UsersLoadingSkeleton />
    )
  }

  if(chats.length === 0) {
    return (
      <NoChatsFound />
    )
  }

  return (
     <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`mb-1 cursor-pointer rounded-xl p-3 transition-colors ${
            selectedUser?._id === chat._id
              ? "bg-cyan-500/15 border border-cyan-500/30"
              : "border border-transparent hover:bg-slate-700/40"
          }`}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-medium text-slate-100">{chat.fullName}</h4>
              <p className="truncate text-xs text-slate-400">Tap to open conversation</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
