import AuthRegistrationForm from "@/src/components/AuthRegistrationForm";
import Link from "next/link";
import Image from "next/image";

export default async function RegisterForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white border rounded-xl">
        <div className="flex flex-col items-center">
          <Link href="/" className="">
            <Image
              src="/img/headerlogo.png"
              alt="Craft Institute Logo"
              width={150}
              height={150}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
        <AuthRegistrationForm />
        {/* Already have account link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
