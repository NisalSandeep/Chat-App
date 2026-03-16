import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.08)_1px,transparent_0)] bg-[size:20px_20px] px-3 py-4 md:px-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-2">
            {messages.map((msg) => {
              return (
                <div
                  key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble relative ${
                      msg.senderId === authUser._id
                        ? "rounded-2xl rounded-br-md border border-cyan-400/30 bg-cyan-600/90 text-white"
                        : "rounded-2xl rounded-bl-md border border-slate-600/60 bg-slate-800/95 text-slate-100"
                    }`}
                    style={{ maxWidth: "min(80%, 520px)" }}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="mb-2 h-48 w-full rounded-lg object-cover"
                      />
                    )}
                    {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                    <p className="mt-1 flex items-center justify-end gap-1 text-[11px] opacity-75">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
