"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter your address");
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?._id) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        items: cart.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        address,
        paymentMethod,
        total,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);   // ✅ Order placed successfully
      clearCart();
      router.push("/order-success"); // redirect to success page
    } else {
      alert(data.message || "Order failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Shipping Address</label>
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Cash on Delivery</option>
        </select>
      </div>

      <div className="mb-6 font-bold text-xl">
        Total: Rs{total}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cart.length === 0}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-bold"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
