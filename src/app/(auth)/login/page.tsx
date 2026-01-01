import LoginForm from "@/src/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default async function LogForm() {
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
        <LoginForm />
        {/* Already have account link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          নতুন ব্যবহারকারী?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
