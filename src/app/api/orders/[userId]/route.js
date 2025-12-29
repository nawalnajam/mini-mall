import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  const orders = await Order.find({
    userId: params.userId,
  }).sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
