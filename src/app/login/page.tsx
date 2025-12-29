"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Logged in successfully");
      router.push("/"); // redirect to homepage
    } else {
      alert(data.message);
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

      {/* Login Form */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logo2.jpg"
            alt="MiniMall"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-bold text-purple-600 mt-2">
        Mini Mall
          </h1>
          <p className="text-gray-500 mt-1">Login to your MiniMall account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="flex justify-between text-sm">
            <Link href="/register" className="text-purple-600 hover:underline">
              Create account
            </Link>
            <Link href="/forget-password" className="text-purple-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
