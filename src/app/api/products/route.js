import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

/* ===================== GET PRODUCTS ===================== */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let products;
  if (category) {
    // Fetch products by category (case-insensitive)
    products = await Product.find({ category: category.toLowerCase() });
  } else {
    // Fetch all products
    products = await Product.find({});
  }

  return NextResponse.json(products);
}

/* ===================== ADD PRODUCT ===================== */
export async function POST(req) {
  await dbConnect();

  try {
    const { name, description, price, category, image, stock } = await req.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { message: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({ name, description, price, category: category.toLowerCase(), image, stock });

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
