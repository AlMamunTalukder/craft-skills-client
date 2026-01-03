import { User, Phone, Mail, MessageSquare, Briefcase, Facebook } from "lucide-react";
import TextInput from "../../FormInputs/TextInput";
import TextArea from "../../FormInputs/TextAreaInput";

export default function PersonalInfo() {
  return (
    <div className="bg-blue-50 rounded-2xl p-4 md:p-6 border border-blue-100">
      <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" /> ব্যক্তিগত তথ্য
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="পূর্ণ নাম *"
          name="name"
          icon={User}
          className="border-blue-200"
        />
        <TextInput
          label="মোবাইল নাম্বার *"
          name="phone"
          icon={Phone}
          className="border-blue-200"
        />
        <TextInput
          label="ইমেইল ঠিকানা"
          name="email"
          icon={Mail}
          className="border-blue-200"
        />
        <TextInput
          label="হোয়াটসঅ্যাপ"
          name="whatsapp"
          icon={MessageSquare}
          className="border-blue-200"
        />
        <TextInput
          label="পেশা"
          name="occupation"
          icon={Briefcase}
          className="border-blue-200"
        />
        <TextInput
          label="ফেসবুক প্রোফাইল"
          name="facebook"
          icon={Facebook}
          className="border-blue-200"
        />
      </div>
      <div className="mt-4">
        <TextArea name="address" label="ঠিকানা" rows={3} />
      </div>
    </div>
  );
}
