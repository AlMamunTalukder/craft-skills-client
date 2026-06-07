import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Container from "@/src/components/shared/Container";

export default function ExclusiveOfferCancelPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center py-10">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-[2rem] border border-yellow-500/20 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="px-6 md:px-10 py-12 text-center border-b border-white/10">
              <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="w-14 h-14 text-yellow-400" />
              </div>

              <h1 className="text-4xl font-black text-white">
                পেমেন্ট বাতিল হয়েছে
              </h1>

              <p className="mt-4 text-white/60">
                আপনি পেমেন্ট প্রক্রিয়া সম্পন্ন করেননি।
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 space-y-5">
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
                <p className="text-white/70 leading-relaxed">
                  আপনার রেজিস্ট্রেশন এখনো সম্পন্ন হয়নি।
                  পুনরায় চেষ্টা করুন।
                </p>
              </div>

              <Link
                href="/admission"
                className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all px-6 py-5 text-black font-black text-lg"
              >
                আবার পেমেন্ট করুন
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