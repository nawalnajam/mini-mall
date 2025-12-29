"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Props {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ _id, name, price, image }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition flex flex-col">
      
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-medium line-clamp-2">
          {name}
        </h3>

        <p className="text-purple-600 font-semibold text-base">
          Rs {price}
        </p>

        <button
          onClick={() => addToCart({ _id, name, price, image })}
          className="mt-auto bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
