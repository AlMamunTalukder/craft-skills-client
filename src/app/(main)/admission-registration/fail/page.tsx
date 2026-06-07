// app/admission-registration/fail/page.tsx
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdmissionFailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Please try again.
                </p>
                <Link href="/admission">
                    <Button className="w-full">Try Again</Button>
                </Link>
            </div>
        </div>
    );
}