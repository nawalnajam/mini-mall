"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState<any>({});

  // ✅ localStorage ONLY in useEffect
  useEffect(() => {
    const storedAddress = localStorage.getItem("checkoutAddress");
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
  }, []);

  // ✅ safe reduce
  const total = (cart || []).reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        address,
        total,
      }),
    });

    clearCart();
    router.push("/order-success");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Review Order</h1>

      <h2 className="font-semibold mt-4">Shipping Address</h2>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>{address.city}</p>

      <h2 className="font-semibold mt-6">Items</h2>
      {cart.map((item) => (
        <div key={item.productId._id} className="flex justify-between">
          <span>{item.productId.name}</span>
          <span>
            Rs {item.productId.price} × {item.quantity}
          </span>
        </div>
      ))}

      <hr className="my-4" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>Rs {total}</span>
      </div>

      <button
        onClick={placeOrder}
        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg"
      >
        Place Order
      </button>
    </div>
  );
}
