import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to MongoDB first

    const cart = await Cart.findOne({ userId }).populate(
      "products.productId"
    ).lean(); // .lean() for plain JS objects

    return NextResponse.json(cart || { products: [] });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
