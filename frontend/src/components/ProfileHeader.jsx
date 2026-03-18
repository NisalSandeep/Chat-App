import React from "react";
import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if(!file) return


    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  };

  return (
    <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-800/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */} {isUpdatingProfile && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white text-xs">Updating...</span></div>}
          <div className="avater online relative">
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Inner glow on hover */}
              <div className="absolute inset-0.5 rounded-full bg-slate-800 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"></div>
              
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="user image"
                className="size-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Creative overlay with icons */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300 z-20">
                <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-white font-semibold text-sm">Edit</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-1 items-center">
          {/* LOGOUT BTN */}
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-colors" onClick={logout}>
            <LogOutIcon className="size-5 " />
          </button>
          {/* SOUND TOGGLE BTN */}
          <button
            className="rounded-full p-2 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5 " />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
