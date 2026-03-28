"use client";

import { useState, useEffect, useRef } from "react";
import { X, Bot, MessageSquareMore } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_QA = [
  {
    q: "ভর্তি প্রক্রিয়া ও কোর্স ফি পরিশোধ পদ্ধতি কী?",
    a: "১. এডমিশন পেইজে যান।\n২. ফি পরিশোধ করে ভর্তি কনফার্ম বাটনে ক্লিক করুন।\n৩. ফরম পূরণ করুন।\n৪. পেমেন্ট স্ক্রিনশট 01700999093 (WhatsApp) এ পাঠান।\n৫. প্রয়োজনে কল করুন: 01700999093, 01310726000",
  },
  {
    q: "কোর্স ফি কি একসাথে পরিশোধ করতে হবে?",
    a: "জি, কোর্স ফি একসাথেই পরিশোধ করতে হবে। ভেঙে ভেঙে বা কিস্তিতে দেওয়ার সুযোগ নেই।",
  },
  {
    q: "ভর্তি বাতিলের কি কোনো সুযোগ আছে?",
    a: "দুঃখিত, ভর্তি কনফার্ম করার পর তা বাতিলের কোনো সুযোগ নেই। তাই ভেবে-চিন্তে ভর্তি হওয়ার অনুরোধ রইলো।",
  },
  {
    q: "৫০টি ক্লাসে কি শুদ্ধভাবে কথা বলা সম্ভব?",
    a: "অবশ্যই! আমাদের ৫০টি ক্লাস, ৩০০০ মিনিটের ভিডিও প্রেজেন্টেশন এবং নিয়মিত চর্চা অনুসরণ করলে আপনি অবশ্যই শুদ্ধ ভাষায় কথা বলতে পারবেন। আমরা এটি নিশ্চিতভাবে বলতে পারি।",
  },
  {
    q: "সোশ্যাল মিডিয়ায় আপনাদের সাথে কীভাবে যুক্ত হবো?",
    a: "আমাদের সাথে যুক্ত হওয়ার লিঙ্কসমূহ:\n🌐 ওয়েবসাইট: https://craftinstitutebd.com/\n👥 ফেইসবুক গ্রুপ: https://www.facebook.com/groups/craftinstitute/\n📺 ইউটিউব: https://youtube.com/@CraftInstitute99\n📢 টেলিগ্রাম: https://t.me/craftinstitute2",
  },
];

export default function Messenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "আপনাকে কিভাবে সহযোগীতা করতে পারি?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const formatText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const phoneRegex = /(01[3-9]\d{8})/g;
    const parts = text.split(/((?:https?:\/\/[^\s]+)|(?:01[3-9]\d{8}))/g);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
            {part}
          </a>
        );
      }
      if (phoneRegex.test(part)) {
        return (
          <a key={i} href={`tel:${part}`} className="text-blue-500 underline">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleReply = (question: string, answer: string) => {
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-[100] right-4 md:right-6 z-[9999] font-sans flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            // Responsive width and height
            className="mb-4 w-[calc(100vw-32px)] sm:w-96 h-[500px] max-h-[75vh] md:max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-100"
          >
            {/* Header */}
            <div className="bg-purple-600 p-4 text-white flex justify-between items-center shadow-lg shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-purple-400 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Support Assistant</p>
                  <p className="text-[10px] text-purple-200 uppercase tracking-tight">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-purple-700 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-50/30 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] p-3 rounded-2xl text-[13px] md:text-sm whitespace-pre-line shadow-sm border ${
                    msg.role === "user" 
                      ? "bg-purple-600 text-white rounded-tr-none border-purple-500" 
                      : "bg-white text-gray-800 border-purple-100 rounded-tl-none"
                  }`}>
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-purple-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions Footer */}
            <div className="p-3 border-t border-purple-100 bg-white shrink-0 overflow-x-hidden">
              <p className="text-[10px] uppercase font-bold text-purple-400 mb-2 px-1">Suggested Questions</p>
              <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                {DEFAULT_QA.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleReply(item.q, item.a)}
                    className="text-[11px] md:text-xs py-2 px-3 bg-purple-50 text-purple-700 rounded-xl border border-purple-100 hover:bg-purple-600 hover:text-white transition-all text-left leading-snug"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button with Mobile-Optimized Tooltip */}
      <div className="group relative flex items-center">
        {!isOpen && (
          <span className="hidden md:block absolute right-14 px-3 py-1 bg-white text-purple-700 text-xs font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-purple-100">
            আপনাকে কিভাবে সাহায্য করতে পারি?
          </span>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 md:p-2 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all border-2 border-white/20"
        >
          {isOpen ? <X size={22} /> : <MessageSquareMore size={22} />}
        </motion.button>
      </div>
    </div>
  );
}