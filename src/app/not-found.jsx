"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center animate-fadeIn">
        <Image
          src="https://yemca-services.net/404.png" // Replace with a valid image path in the public folder
          alt="404 Illustration"
          width={320}
          height={320}
          className="mx-auto animate-float shadow-xl rounded-lg"
        />

        <h1 className="text-7xl font-extrabold text-blue-700 mt-6">
        </h1>
        <p className="text-xl text-gray-700 mt-2">
          We can&apos;t seem to find the page you&apos;re looking for.
        </p>

        {/* Return Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
