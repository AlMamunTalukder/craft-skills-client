"use client";
import { useEffect, useState } from "react";
import { X, Clock, AlertCircle, Phone } from "lucide-react";

interface VisitorStatus {
    status: 'active' | 'blocked' | 'registered';
    stage?: number;
    remainingMs?: number;
    expiryTime?: string;
    isBlocked: boolean;
    registered: boolean;
    message?: string;
    stageLabel?: string;
}

export default function ExclusiveTimerPopup() {
    const [status, setStatus] = useState<VisitorStatus | null>(null);
    const [showPopup, setShowPopup] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

        fetch(`${API_URL}/exclusive/visitor-status`, {
            credentials: 'include', // ✅ Important: send cookies
        })
            .then(res => res.json())
            .then(data => {
                console.log("Visitor status:", data);
                if (data.success) {
                    setStatus(data);
                    if (data.status === 'blocked') {
                        // Show blocked message
                    } else if (data.status === 'registered') {
                        setShowPopup(false);
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching visitor status:", error);
            });
    }, []);

    useEffect(() => {
        if (!status || status.status !== 'active' || !status.remainingMs) return;

        const interval = setInterval(() => {
            const expiry = new Date(status.expiryTime!).getTime();
            const remaining = Math.max(0, expiry - Date.now());

            if (remaining <= 0) {
                clearInterval(interval);
                window.location.reload();
                return;
            }

            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (3600000)) / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [status]);

    const handleRegister = () => {
        setShowPopup(false);
        const el = document.getElementById('registration-form');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!status) return null;
    if (status.registered) return null;
    if (!showPopup) return null;

    // Blocked state
    if (status.status === 'blocked') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="relative bg-gradient-to-br from-red-900/90 to-black rounded-2xl p-6 max-w-md w-full shadow-2xl border border-red-500/30">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">⏰ সময় শেষ! ⏰</h2>
                        <p className="text-red-300 mb-4">আপনার এক্সক্লুসিভ অফারের সময় শেষ হয়ে গেছে।</p>
                        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                            <p className="text-white/70 text-sm">দয়া করে প্রশাসনের সাথে যোগাযোগ করুন</p>
                            <div className="flex items-center justify-center gap-2 mt-2 text-white">
                                <Phone className="w-4 h-4" />
                                <span className="font-semibold">01862439099</span>
                            </div>
                        </div>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition"
                        >
                            হোম পেজে ফিরে যান
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Active state
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative bg-gradient-to-br from-orange-600/90 to-black rounded-2xl p-6 max-w-md w-full shadow-2xl border border-orange-500/30">
                <button
                    onClick={() => setShowPopup(false)}
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

                    <h2 className="text-2xl font-bold text-white mb-2">🎯 এক্সক্লুসিভ অফার!</h2>

                    <p className="text-orange-300 text-sm mb-4">
                        আপনার জন্য বাকি আছে {status.stageLabel}
                    </p>

                    <div className="flex justify-center gap-3 text-4xl font-mono font-bold text-white mb-6">
                        <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
                            {String(timeLeft.hours).padStart(2, '0')}
                            <span className="text-xs block text-orange-300">ঘণ্টা</span>
                        </div>
                        <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
                            {String(timeLeft.minutes).padStart(2, '0')}
                            <span className="text-xs block text-orange-300">মিনিট</span>
                        </div>
                        <div className="bg-black/50 px-4 py-3 rounded-xl min-w-[70px]">
                            {String(timeLeft.seconds).padStart(2, '0')}
                            <span className="text-xs block text-orange-300">সেকেন্ড</span>
                        </div>
                    </div>

                    <button
                        onClick={handleRegister}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition transform hover:scale-[1.02]"
                    >
                        এখনই রেজিস্ট্রেশন করুন
                    </button>

                    <p className="text-xs text-white/40 mt-4">
                        দেরি করবেন না! অফার শেষ হয়ে যাচ্ছে।
                    </p>
                </div>
            </div>
        </div>
    );
}