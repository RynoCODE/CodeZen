// app/api/auth/signup/route.ts
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const client = await clientPromise;
  const db = client.db();

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await hash(password, 12);

  // Store the new user in the database
  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
