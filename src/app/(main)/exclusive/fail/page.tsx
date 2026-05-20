import Link from "next/link";
import { XCircle, ArrowRight, RefreshCw } from "lucide-react";
import Container from "@/src/components/shared/Container";

export default function ExclusiveOfferFailPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center py-10">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-[2rem] border border-red-500/20 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
            
            {/* Header */}
            <div className="px-6 md:px-10 py-12 text-center border-b border-white/10">
              <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-14 h-14 text-red-500" />
              </div>

              <h1 className="text-4xl font-black text-white">
                পেমেন্ট ব্যর্থ হয়েছে
              </h1>

              <p className="mt-4 text-white/60">
                দুঃখিত, আপনার পেমেন্ট সম্পন্ন করা যায়নি।
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 space-y-5">
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
                <p className="text-white/80 leading-relaxed">
                  সম্ভাব্য কারণ:
                </p>

                <ul className="mt-3 space-y-2 text-white/60 list-disc pl-5">
                  <li>পেমেন্ট বাতিল হয়েছে</li>
                  <li>পর্যাপ্ত ব্যালেন্স নেই</li>
                  <li>নেটওয়ার্ক সমস্যা</li>
                  <li>OTP ভেরিফিকেশন সম্পন্ন হয়নি</li>
                </ul>
              </div>

              <Link
                href="/exclusive"
                className="flex items-center justify-center gap-3 rounded-2xl bg-red-500 hover:bg-red-600 transition-all px-6 py-5 text-white font-black text-lg"
              >
                <RefreshCw className="w-5 h-5" />
                আবার চেষ্টা করুন
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-white/60 hover:text-white transition-all"
              >
                হোমপেজে ফিরে যান
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}