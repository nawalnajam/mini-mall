import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("📦 ORDER BODY:", body);

    const order = await Order.create(body);

    console.log("✅ ORDER SAVED:", order._id);

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId: order._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ORDER SAVE FAILED:", error);

    return NextResponse.json(
      { message: "Order save failed", error: error.message },
      { status: 500 }
    );
  }
}

