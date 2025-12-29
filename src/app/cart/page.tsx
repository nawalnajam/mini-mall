"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart} = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT – ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="flex gap-4 border rounded-lg p-4"
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.productId.name}</h2>
                <p className="text-gray-600">
                  Rs {item.productId.price}
                </p>

              

                  <span>{item.quantity}</span>

                  
              

                  <button
                    onClick={() =>
                      removeFromCart(item.productId._id)
                    }
                    className="ml-auto text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            
          ))}
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-bold">
              Rs {total}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block mt-6 bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg text-lg font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
