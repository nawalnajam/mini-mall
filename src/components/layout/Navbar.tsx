"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

export default function Navbar() {
  const { cart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        setCategories(
          data.map((c: any) => (typeof c === "string" ? { _id: c, name: c } : c))
        )
      )
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

        <div className="md:flex gap-6 font-medium">
          {categories.length === 0 ? (
            <span className="text-gray-400">Loading...</span>
          ) : (
            categories.map((cat) => (
              <Link
                href={`/category/${cat.name.toLowerCase()}`}
                key={cat._id}
                className="hover:text-purple-600 capitalize"
              >
                {cat.name}
              </Link>
            ))
          )}
        </div>

        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-purple-600" />
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
