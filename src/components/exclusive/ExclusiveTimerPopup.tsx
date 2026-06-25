"use client";
import { useEffect, useState } from "react";
import { X, Clock, AlertCircle, Phone, MessageCircle } from "lucide-react";
import { pushEvent } from "@/src/utils/dataLayer";

interface VisitorStatus {
  status: "active" | "blocked" | "registered";
  stage?: number;
  remainingMs?: number;
  expiryTime?: string;
  isBlocked: boolean;
  registered: boolean;
  message?: string;
  stageLabel?: string;
}

const stageContent: Record<
  number,
  {
    heading: string;
    description: string;
    sub: string;
    button: string;
  }
> = {
  1: {
    heading: "মাথা নষ্ট ডিসকাউন্ট!",
    description: "৫,০০০ টাকার লাইভ ওয়ার্কশপ",
    sub: "মাত্র ১৯৯ টাকায়! অফারটি শেষ হতে আর মাত্র কিছু সময় বাকি",
    button: "১৯৯ টাকায় এখনই জয়েন করুন",
  },
  2: {
    heading: "আপনি কি অফারটি মিস করেছেন?",
    description: "আপনার জন্য কিছু সময় বাড়ানো হলো!",
    sub: "",
    button: "দ্রুত জয়েন করুন",
  },
  3: {
    heading: "সর্বশেষ সতর্কতা!",
    description: "অফারটি বন্ধ হচ্ছে",
    sub: "১৯৯ টাকা নাকি ৫,০০০ টাকা? সিদ্ধান্ত আপনার।",
    button: "১৯৯ টাকায় এখনই জয়েন করুন",
  },
};

const STAGE_DURATIONS = [
  3 * 60 * 60 * 1000, // 3 hours
  1 * 60 * 60 * 1000, // 1 hour
  15 * 60 * 1000, // 15 minutes
];

const PHONE_NUMBER = "8801700999093";
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}`;

export default function ExclusiveTimerPopup() {
  const [status, setStatus] = useState<VisitorStatus | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ===== DEVELOPMENT SKIP LOGIC – COMMENTED OUT FOR PRODUCTION =====

  /*
    const isDev = process.env.NODE_ENV === 'development';
    const [devStage, setDevStage] = useState<number | null>(null);
    const [devExpiry, setDevExpiry] = useState<Date | null>(null);
    const [devIsBlocked, setDevIsBlocked] = useState(false);
    */
  // ===== END OF SKIP LOGIC =====

  // Load initial status from backend
  useEffect(() => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    fetch(`${API_URL}/exclusive/visitor-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus(data);
          if (data.status === "registered") {
            setShowPopup(false);
          }
          // ===== DEV INIT – COMMENTED OUT =====
          /*
                    if (isDev && data.status === 'active' && data.stage) {
                        setDevStage(data.stage);
                        const expiry = new Date(data.expiryTime!);
                        setDevExpiry(expiry);
                    }
                    */
        }
      })
      .catch((error) => {
        console.error("Error fetching visitor status:", error);
      });
  }, []); // Removed isDev dependency (commented out)

  // Timer effect – uses backend expiry (no dev override)
  useEffect(() => {
    if (!status || status.status !== "active" || !status.remainingMs) return;

    // Use backend expiry time
    const expiry = new Date(status.expiryTime!);

    const interval = setInterval(() => {
      const remaining = Math.max(0, expiry.getTime() - Date.now());

      if (remaining <= 0) {
        clearInterval(interval);
        window.location.reload();
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // ===== SKIP HANDLER – COMMENTED OUT =====
  /*
    const handleSkip = () => {
        if (!isDev) return;
        // ... skip logic
    };
    */

  // Determine active stage and content
  const getActiveStage = (): number => {
    // Use backend stage (no dev override)
    return status?.stage || 1;
  };

  const getIsBlocked = (): boolean => {
    return status?.status === "blocked";
  };

  const getIsRegistered = (): boolean => {
    return status?.status === "registered";
  };

  // const handleRegister = () => {
  //     setShowPopup(false);
  //     const el = document.getElementById('registration-form');
  //     if (el) {
  //         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     }
  // };

  const handleRegister = () => {
    // ✅ GTM Event: add_to_cart
    pushEvent("add_to_cart", {
      ecommerce: {
        currency: "BDT",
        value: 199,
        items: [
          {
            item_id: "exclusive_offer_199",
            item_name: "Voice & Public Speaking Masterclass",
            item_category: "exclusive_offer",
            price: 199,
            quantity: 1,
          },
        ],
      },
    });

    setShowPopup(false);
    const el = document.getElementById("registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Close current popup (does not affect timer)
  const handleClose = () => {
    setShowPopup(false);
  };

  if (getIsRegistered()) return null;
  if (!showPopup) return null;

  // === BLOCKED STATE ===
  if (getIsBlocked()) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative bg-gradient-to-br from-red-900/90 to-black rounded-2xl p-6 max-w-md w-full shadow-2xl border border-red-500/30">
          {/* ===== DEV SKIP BUTTON – COMMENTED OUT ===== */}
          {/* 
                    {isDev && (
                        <button
                            onClick={handleSkip}
                            className="absolute top-2 left-2 text-xs text-white/40 hover:text-white/80 transition"
                        >
                            Skip (dev)
                        </button>
                    )}
                    */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              ১৯৯ টাকার অফারটি শেষ!
            </h2>
            <p className="text-red-300 text-lg font-semibold">
              বর্তমান প্রাইস ৫,০০০ টাকা
            </p>
            <p className="text-white/70 text-sm mt-4 mb-6">
              বিশেষ অনুরোধে কোনো সুযোগ আছে কি না জানতে এখনই কল অথবা মেসেজ দিন!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              হোয়াটসঅ্যাপে মেসেজ করুন
            </a>
            <p className="text-xs text-white/40 mt-4">
              অথবা কল করুন: <span className="font-semibold">০১৭০০৯৯৯০৯৩</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // === ACTIVE STAGES ===
  const stage = getActiveStage();
  const content = stageContent[stage] || stageContent[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-br from-orange-600/90 to-black rounded-2xl p-6 max-w-md w-full shadow-2xl border border-orange-500/30">
        {/* ===== DEV SKIP BUTTON – COMMENTED OUT ===== */}
        {/* 
                {isDev && (
                    <button
                        onClick={handleSkip}
                        className="absolute top-2 left-2 text-xs text-white/40 hover:text-white/80 transition"
                    >
                        Skip (dev)
                    </button>
                )}
                */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-4">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
              সীমিত সময়ের অফার
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {content.heading}
          </h2>
          <p className="text-white text-lg font-semibold">
            {content.description}
          </p>
          {content.sub && (
            <p className="text-orange-200 text-sm mt-2">{content.sub}</p>
          )}

          <div className="flex justify-center gap-3 text-4xl font-mono font-bold text-white my-6">
            <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
              {String(timeLeft.hours).padStart(2, "0")}
              <span className="text-xs block text-orange-300">ঘণ্টা</span>
            </div>
            <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
              {String(timeLeft.minutes).padStart(2, "0")}
              <span className="text-xs block text-orange-300">মিনিট</span>
            </div>
            <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
              {String(timeLeft.seconds).padStart(2, "0")}
              <span className="text-xs block text-orange-300">সেকেন্ড</span>
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            {content.button}
          </button>
        </div>
      </div>
    </div>
  );
}
