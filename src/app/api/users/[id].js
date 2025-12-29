import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop(); // last part of URL

  const user = await User.findById(id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  const body = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
