"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = {
  productId: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  /* 🔐 Load logged-in user */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* 🔄 FETCH CART (SAFE VERSION) */
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart?userId=${user._id}`);

        if (!res.ok) {
          setCart([]);
          return;
        }

        const text = await res.text(); // ✅ IMPORTANT

        if (!text) {
          setCart([]);
          return;
        }

        const data = JSON.parse(text);
        setCart(data.products || []);
      } catch (error) {
        console.error("❌ Failed to fetch cart", error);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  /* ➕ ADD TO CART */
  const addToCart = async (product: Product) => {
    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!product?._id) {
      console.error("❌ Product _id missing", product);
      return;
    }

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        productId: product._id,
        quantity: 1,
      }),
    });

    // 🔄 refresh cart (SAFE)
    try {
      const res = await fetch(`/api/cart?userId=${user._id}`);
      const text = await res.text();

      if (!text) {
        setCart([]);
        return;
      }

      const data = JSON.parse(text);
      setCart(data.products || []);
    } catch {
      setCart([]);
    }
  };

  /* ➖ REMOVE FROM CART */
  const removeFromCart = async (productId: string) => {
    if (!user) return;

    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, productId }),
    });

    setCart((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );
  };

  /* 🧹 CLEAR CART */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useCart = () => useContext(CartContext);
