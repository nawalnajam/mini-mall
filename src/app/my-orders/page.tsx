"use client";

import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    fetch(`/api/orders/${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order: any) => (
        <div
          key={order._id}
          className="border rounded-lg p-6 mb-4"
        >
          <p className="font-semibold">
            Order ID: {order._id}
          </p>

          <p>Status: {order.status}</p>
          <p>Total: Rs {order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
