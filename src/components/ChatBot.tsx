"use client";
import { IoMdChatbubbles } from "react-icons/io";

const ChatBot = () => {
  return (
    <button
      className="fixed bottom-3 right-6 p-2 text-white bg-[#4F6ACA] rounded-full shadow-lg transition-all duration-300 z-50"
      aria-label="Scroll to Top"
    >
      <IoMdChatbubbles className="h-7 w-7" />
    </button>
  );
};

export default ChatBot;
