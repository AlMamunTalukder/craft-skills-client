"use client";
import Link from "next/link";
import { FaFacebookMessenger } from "react-icons/fa";

const FBMessenger = () => {
  const messengerUrl = "https://m.me/craft99";

  return (
    <Link
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-[10px] right-4 md:right-6 p-2 text-white bg-[#0084FF] rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 flex items-center justify-center"
      aria-label="Chat on Messenger"
    >
      {/* Tooltip */}
      <span className="absolute right-11 px-3 py-1 bg-white text-gray-800 text-xs font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Messenger-এ ম্যাসেজ করুন।
      </span>

      <FaFacebookMessenger className="h-6 w-6" />
    </Link>
  );
};

export default FBMessenger;