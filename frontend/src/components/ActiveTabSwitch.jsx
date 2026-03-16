import React from 'react'
import useChatStore from '../store/useChatStore';

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="m-2 rounded-xl border border-slate-700/60 bg-slate-800/40 p-1">
      <button
        onClick={() => setActiveTab("chats")}
        className={`w-1/2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          activeTab === "chats" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`w-1/2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          activeTab === "contacts" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        Contacts
      </button>
    </div>
  )
}

export default ActiveTabSwitch