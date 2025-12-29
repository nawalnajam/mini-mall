"use client";

import { useState } from "react";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Product added successfully");
      setForm({ name: "", price: "", category: "", image: "" });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add Product (Admin)</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          placeholder="Product name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="bags">Bags</option>
          <option value="shoes">Shoes</option>
          <option value="makeup">Makeup</option>
          <option value="clothes">Clothes</option>
        </select>

        <input
          placeholder="/images/products/bags/bag1.jpg"
          className="border p-2 w-full"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
