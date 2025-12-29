import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({});
  return NextResponse.json(categories);
}

export async function POST(req) {
  await dbConnect();

  const { name } = await req.json();
  if (!name) return NextResponse.json({ message: "Name required" }, { status: 400 });

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return NextResponse.json({ message: "Category exists" }, { status: 400 });

    const category = await Category.create({ name });
    return NextResponse.json({ message: "Category added successfully", category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
