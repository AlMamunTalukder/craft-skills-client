// "use client";
// import { useState, useEffect } from "react";
// import { X, ArrowRight, Mic2, ShieldCheck, Zap } from "lucide-react";

// const AdmissionPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Show popup on every full page reload
//     const timer = setTimeout(() => setIsOpen(true), 1200);
//     return () => clearTimeout(timer);
//   }, []);

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
//       {/* Backdrop - Only Close button works */}
//       <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-500" />

//       {/* Dialog Content */}
//       <div className="relative w-full max-w-[420px] bg-white rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
//         {/* The ONLY Close Button */}
//         <button 
//           onClick={closePopup}
//           className="absolute right-3 top-3 md:right-5 md:top-5 z-20 p-2 rounded-full bg-black/20 md:bg-white/10 hover:bg-black/40 md:hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20"
//         >
//           <X size={18} className="md:w-5 md:h-5" />
//         </button>

//         {/* Premium Header */}
//         <div className="relative h-32 md:h-44 bg-linear-to-br from-[#461289] via-[#4F0187] to-[#37016a] flex flex-col items-center justify-center text-center p-4">
//           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
//           <div className="relative z-10">
//             <div className="inline-flex p-2 md:p-4 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 mb-2 md:mb-3 shadow-xl">
//               <Mic2 className="text-purple-200 w-6 h-6 md:w-8 md:h-8" />
//             </div>
//             <div className="flex items-center gap-1.5 justify-center">
//               <Zap size={12} className="text-yellow-400 fill-yellow-400" />
//               <h4 className="text-white font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase">Limited Admission</h4>
//               <Zap size={12} className="text-yellow-400 fill-yellow-400" />
//             </div>
//           </div>
//         </div>

//         {/* Body Content */}
//         <div className="p-5 md:p-8">
//           <div className="text-center mb-5 md:mb-6">
//             <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-[1.2]">
//               উচ্চারণ ও ভয়েস আর্টিস্ট <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0187] to-[#8B5CF6]">
//                 ২টি কোর্স একসাথে!
//               </span>
//             </h2>
//           </div>

//           {/* Pricing Section */}
//           <div className="relative p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 mb-6 md:mb-8 overflow-hidden">
//              <div className="flex justify-between items-center relative z-10">
//               <div className="space-y-0.5 md:space-y-1">
//                 <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">অফার মূল্য</p>
//                 <div className="flex items-baseline gap-1 md:gap-2">
//                   <span className="text-2xl md:text-4xl font-black text-slate-900">৳৩,৪৯০</span>
//                   <span className="text-slate-400 line-through text-[10px] md:text-sm font-medium">৳১৫,০০০</span>
//                 </div>
//               </div>
//               <div className="bg-red-500 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-xl md:rounded-2xl shadow-lg shadow-red-200 flex flex-col items-center animate-pulse">
//                 <span className="text-[12px] md:text-[14px] font-black leading-none">৭৬%</span>
//                 <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter">OFF</span>
//               </div>
//             </div>
            
//             <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-200/60 flex items-center justify-between">
//                <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold flex items-center gap-1">
//                  <ShieldCheck size={12} className="md:w-3.5 md:h-3.5" /> No Hidden Charges
//                </p>
//                <p className="text-[9px] md:text-[10px] text-slate-400 font-medium italic">Valid for today</p>
//             </div>
//           </div>

//           {/* Primary CTA */}
//           <button className="w-full group relative flex items-center justify-center gap-2 md:gap-3 bg-[#4F0187] text-white py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-[#37016a] transition-all duration-300 shadow-xl shadow-purple-200 active:scale-[0.97]">
//             Admission Going On
//             <ArrowRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-1.5 transition-transform" />
//           </button>

//           <p className="text-center mt-3 md:mt-4 text-[10px] md:text-xs text-slate-400 font-medium">
//             *অফারটি শুধুমাত্র আজকের জন্য প্রযোজ্য
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmissionPopup;


"use client";
import { useState, useEffect } from "react";
import { X, ArrowRight, Mic2, ShieldCheck, Zap, Star } from "lucide-react";

const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay on page load
    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  // Course Data for the Popup
  const courses = [
    { name: "উচ্চারণ কোর্স", price: "৳৭,৫০০", offer: "৳১,৭৪৫" },
    { name: "ভয়েস আর্টিস্ট", price: "৳৭,৫০০", offer: "৳১,৭৪৫" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-500" 
        onClick={closePopup}
      />

      {/* Dialog Content */}
      <div className="relative w-full max-w-[450px] bg-white rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute right-3 top-3 md:right-5 md:top-5 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all border border-white/10"
        >
          <X size={18} className="md:w-5 md:h-5" />
        </button>

        {/* Header Section */}
        <div className="relative h-36 md:h-48 bg-gradient-to-br from-[#461289] via-[#4F0187] to-[#37016a] flex flex-col items-center justify-center text-center p-4">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <div className="relative z-10">
            <div className="inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 mb-3 shadow-xl">
              <Mic2 className="text-purple-200 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Star size={14} className="text-yellow-400 fill-yellow-400 animate-pulse" />
              <h4 className="text-white font-bold text-[10px] md:text-[12px] tracking-[0.2em] uppercase">
                Special Admission Offer
              </h4>
              <Star size={14} className="text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              আপনার পছন্দের কোর্সে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0187] to-[#8B5CF6]">
                ভর্তি চলছে সীমিত সময়ের জন্য!
              </span>
            </h2>
          </div>

          {/* Individual Course Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-red-500 text-[8px] text-white px-2 py-0.5 rounded-bl-lg font-bold">
                  76% OFF
                </div>
                <p className="text-[11px] font-bold text-slate-600 mb-1">{course.name}</p>
                <div className="flex flex-col items-center">
                   <span className="text-lg md:text-xl font-black text-[#4F0187]">{course.offer}</span>
                   <span className="text-[10px] text-slate-400 line-through">{course.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-between px-2 mb-6">
             <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck size={14} />
                <span className="text-[10px] md:text-xs font-bold">Verified Admission</span>
             </div>
             <div className="flex items-center gap-1.5 text-orange-500">
                <Zap size={14} className="fill-orange-500" />
                <span className="text-[10px] md:text-xs font-bold">Seats Filling Fast</span>
             </div>
          </div>

          {/* Main Action Button */}
          <button 
            onClick={() => {
                // You can scroll to form or redirect here
                closePopup();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="w-full group relative flex items-center justify-center gap-2 md:gap-3 bg-[#4F0187] text-white py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-[#37016a] transition-all duration-300 shadow-xl shadow-purple-200 active:scale-[0.97] cursor-pointer"
          >
            কোর্স বেছে নিন
            <ArrowRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <p className="text-center mt-4 text-[10px] md:text-xs text-slate-400 font-medium">
            *অফারটি শুধুমাত্র আজকের জন্য প্রযোজ্য
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;