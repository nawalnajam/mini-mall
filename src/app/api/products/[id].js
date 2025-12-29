import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  try {
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
