import React from "react";
import  useChatStore  from "../store/useChatStore";
import { BoraderAnimatedContainer } from "../components/BoraderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";


const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative h-dvh w-full min-h-0">
      <BoraderAnimatedContainer>
        {/* LEFT SIDE */}
        <div
          className={`${
            selectedUser ? "hidden md:flex" : "flex"
          } glass-surface w-full md:w-[360px] md:min-w-[320px] md:max-w-[420px] flex-col border-b md:border-b-0 md:border-r`}
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
          } glass-surface min-w-0 flex-1 flex-col`}
        >
          {selectedUser ? <ChatContainer />: <NoConversationPlaceHolder />}
        </div>
      </BoraderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
