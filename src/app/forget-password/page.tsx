"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Password reset link sent! Check your email.");
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden">

      {/* 🔮 Purple Bubbles Background */}
      <div className="absolute inset-0 bubbles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      {/* Forget Password Form */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logo2.jpg"
            alt="MiniMall"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-bold text-purple-600 mt-2">
            Reset Password
          </h1>
          <p className="text-purple-500 mt-1">Enter your email to reset password</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="flex justify-between text-sm">
            <Link href="/login" className="text-gray-600 hover:underline">
              Back to Login
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
