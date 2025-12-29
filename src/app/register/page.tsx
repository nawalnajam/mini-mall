"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, isAdmin: false }),
      });

      const data = await res.json();
      if (res.status !== 201) return alert(data.message);

      // Auto login
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (loginRes.status === 200) {
        localStorage.setItem("user", JSON.stringify(loginData.user));
        alert("Account created & logged in!");
        router.push("/"); // redirect to homepage
      } else {
        alert(loginData.message);
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

      {/* Register Form */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logo2.jpg"
            alt="MiniMall"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-bold text-purple-600 mt-2">
            Create Account
          </h1>
          <p className="text-gray-500 mt-1">Sign up to start shopping with MiniMall</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="flex justify-between text-sm">
            <Link href="/login" className="text-purple-600 hover:underline">
              Already have an account?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Register & Login
          </button>
        </form>
      </div>
    </div>
  );
}
