"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // ✅ SAFE cart count (error kabhi nahi aayega)
  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO + NAME */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo2.jpg"
            alt="MiniMall Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-purple-600">
            MiniMall
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-6 font-medium">
          {["bags", "shoes", "clothes", "makeup"].map((cat) => (
            <Link
              href={`/category/${cat}`}
              key={cat}
              className="hover:text-purple-600 capitalize"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* CART & LOGIN */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-purple-600" />

            {/* 🔴 CART COUNT BADGE */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/login">
            <User className="w-6 h-6 hover:text-purple-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
