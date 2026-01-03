import { CreditCard, Send } from "lucide-react";
import Image from "next/image";
import TextInput from "../../FormInputs/TextInput";
import FormSelect from "../../FormInputs/FormSelect";

const paymentOptions = [
  { id: "bkash", name: "বিকাশ", logo: "/img/bkash.svg", number: "01830327579", type: "এজেন্ট (ক্যাশ আউট)" },
  { id: "rocket", name: "রকেট", logo: "/img/Rocket.svg", number: "018211813339", type: "পার্সোনাল (সেন্ড মানি)" },
  { id: "nagad", name: "নগদ", logo: "/img/nagad.svg", number: "01704682820", type: "পার্সোনাল (সেন্ড মানি)" },
];

const paymentMethods = [
  { label: "বিকাশ", value: "BKASH" },
  { label: "নগদ", value: "NAGAD" },
  { label: "রকেট", value: "ROCKET" },
];

export default function PaymentSection() {
  return (
    <>
      {/* Numbers Display */}
      <div className="bg-emerald-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
        <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> পেমেন্ট নাম্বার সমূহ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentOptions.map((method) => (
            <div key={method.id} className="bg-white rounded-xl border border-emerald-200 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg p-0 flex items-center justify-center">
                 <Image src={method.logo} alt={method.name} width={45} height={45} className="object-contain" />
              </div>
              <div>
                <p className="font-medium text-lg">{method.number}</p>
                <p className="text-xs text-gray-500">{method.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="bg-emerald-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
        <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> পেমেন্ট তথ্য
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect name="paymentMethod" label="পেমেন্ট মেথড *" options={paymentMethods} required />
          <TextInput label="সেন্ডার নাম্বার *" name="senderNumber" icon={Send} />
        </div>
      </div>
    </>
  );
}