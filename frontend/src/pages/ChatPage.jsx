import React from "react";
import  useChatStore  from "../store/useChatStore";
import { BoraderAnimatedContainer } from "../components/BoraderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/noConversationPlaceHolder";


const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative h-dvh w-full min-h-0">
      <BoraderAnimatedContainer>
        {/* LEFT SIDE */}
        <div
          className={`${
            selectedUser ? "hidden md:flex" : "flex"
          } w-full md:w-[360px] md:min-w-[320px] md:max-w-[420px] bg-slate-800/60 backdrop-blur-sm flex-col border-b border-slate-700/50 md:border-b-0 md:border-r md:border-slate-700/50`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
            {activeTab == "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div
          className={`${
            selectedUser ? "flex" : "hidden md:flex"
          } flex-1 flex-col bg-slate-900/50 backdrop-blur-sm min-w-0`}
        >
          {selectedUser ? <ChatContainer />: <NoConversationPlaceHolder />}
        </div>
      </BoraderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
