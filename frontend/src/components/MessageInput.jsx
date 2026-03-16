import React, { useState, useRef } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import useChatStore from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if ((!text.trim() && !imagePreview) || isSending) return; // Don't send empty messages or double-submit

    if (isSoundEnabled) {
      playRandomKeyStrokeSound();
    }
    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="border-t border-slate-700/50 bg-slate-800/70 px-3 py-3 md:px-4 backdrop-blur-sm">
      {imagePreview && (
        <div className="mx-auto mb-3 flex w-full max-w-4xl items-center">
          <div className="relative rounded-xl border border-slate-700/60 bg-slate-800/50 p-1">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 rounded-lg object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="mx-auto flex w-full max-w-4xl items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-700/70 bg-slate-800/80 text-slate-400 transition-all duration-200 hover:border-slate-500 hover:text-slate-100 ${
            imagePreview ? "border-cyan-500/70 text-cyan-400" : ""
          }`}
          aria-label="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          className="h-11 flex-1 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 text-slate-100 placeholder-slate-400 outline-none transition-all duration-200 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/30"
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) {
              playRandomKeyStrokeSound();
            }
          }}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSending}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white transition-all hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
