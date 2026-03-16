import React from 'react'
import { useEffect } from "react";
import  useChatStore  from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ContactList = () => {
  const { getAllContacts,allContacts, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if(isUsersLoading) {
    return (
      <UsersLoadingSkeleton />
    )
  }

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className={`mb-1 cursor-pointer rounded-xl p-3 transition-colors ${
            selectedUser?._id === contact._id
              ? "bg-cyan-500/15 border border-cyan-500/30"
              : "border border-transparent hover:bg-slate-700/40"
          }`}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-medium text-slate-100">{contact.fullName}</h4>
              <p className="truncate text-xs text-slate-400">Start a new chat</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList