"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function PaymentCallbackInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState("পেমেন্ট যাচাই হচ্ছে...");

    useEffect(() => {
        const status = searchParams.get("status");
        const tran_id = searchParams.get("tran_id");

        if (status !== "success" || !tran_id) {
            router.replace("/exclusive/fail");
            return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

        const verify = async () => {
            try {
                setMessage("পেমেন্ট নিশ্চিত করা হচ্ছে...");

                const res = await fetch(`${API_URL}/exclusive-offer/verify-payment?tran_id=${tran_id}`);
                const data = await res.json();

                if (data.success && data.data) {
                    const p = data.data;
                    const params = new URLSearchParams({
                        name: p.name || "",
                        amount: String(p.price || 199),
                        phone: p.phone || "",
                        email: p.email || "",
                        tran_id: tran_id,
                    });
                    router.replace(`/exclusive/success?${params.toString()}`);
                } else {
                    router.replace("/exclusive/fail");
                }
            } catch {
                router.replace("/exclusive/fail");
            }
        };

        verify();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F26422] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-white text-xl font-bold">{message}</p>
                <p className="text-white/40 text-sm mt-3">অনুগ্রহ করে পেজ বন্ধ করবেন না</p>
            </div>
        </div>
    );
}

export default function PaymentCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#F26422] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PaymentCallbackInner />
        </Suspense>
    );
}