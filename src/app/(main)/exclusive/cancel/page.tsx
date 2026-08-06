import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Container from "@/src/components/shared/Container";

export default function ExclusiveOfferCancelPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center py-10">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl md:rounded-4xl border border-yellow-500/20 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-3 md:px-4 py-2 text-center border-b border-white/10">
              <div className="mx-auto mb-3 md:mb-6 w-15 md:w-24 h-15 md:h-24 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="w-9 md:w-14 h-9 md:h-14 text-yellow-400" />
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white">  
                পেমেন্ট বাতিল হয়েছে
              </h1>

              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-2 my-5">
                <p className="text-white/70 leading-relaxed">
                  আপনার রেজিস্ট্রেশন সম্পন্ন হয়নি। <br/> পুনরায় চেষ্টা করুন।
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
             

              <Link
                href="/exclusive"
                className="w-52 mx-auto flex items-center justify-center  gap-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all px-6 py-2 text-black font-black text-lg"
              >
                আবার পেমেন্ট করুন
              </Link>

              <Link
                href="/exclusive"
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
