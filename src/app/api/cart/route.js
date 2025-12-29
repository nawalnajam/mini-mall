import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

/* ===================== GET CART ===================== */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userId required" },
      { status: 400 }
    );
  }

  const cart = await Cart.findOne({ userId }).populate(
    "products.productId"
  );

  return NextResponse.json(cart ?? { userId, products: [] });
}

/* ===================== ADD TO CART ===================== */
export async function POST(req) {
  await dbConnect();

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { userId, productId, quantity = 1 } = body;

  if (!userId || !productId) {
    console.log("❌ Missing data:", { userId, productId });
    return NextResponse.json(
      { message: "userId and productId required" },
      { status: 400 }
    );
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const index = cart.products.findIndex(
      p => p.productId.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
  }

  return NextResponse.json(
    { message: "Added to cart", cart },
    { status: 200 }
  );
}

/* ===================== UPDATE QTY ===================== */
export async function PUT(req) {
  await dbConnect();
  const { userId, productId, quantity } = await req.json();

  const cart = await Cart.findOne({ userId });
  if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  const item = cart.products.find(p => p.productId.toString() === productId);

  if (item) {
    item.quantity = quantity;
    await cart.save();
  }

  return NextResponse.json({ message: "Cart updated", cart });
}

/* ===================== DELETE ITEM ===================== */
export async function DELETE(req) {
  await dbConnect();
  const { userId, productId } = await req.json();

  const cart = await Cart.findOne({ userId });
  if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  cart.products = cart.products.filter(p => p.productId.toString() !== productId);
  await cart.save();

  return NextResponse.json({ message: "Item removed", cart });
}
