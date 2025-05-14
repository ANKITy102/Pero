import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose"; // Adjust the path if needed
import User from "@/lib/models/user.model"; // Adjust the path if needed

// Handling POST request for /api/signup
export async function POST(req: Request) {
  try {
    const { name, username, password } = await req.json(); // Parse request body
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (
      !username ||
      username.trim().length < 3 ||
      !usernameRegex.test(username)
    ) {
      return NextResponse.json(
        { message: "Username must be at least 3 characters and alphanumeric" },
        { status: 400 }
      );
    }
    if (
      !password ||
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 6 characters and include letters and numbers",
        },
        { status: 400 }
      );
    }


    await connectToDB();
    // Check if user with the same email or username already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    if (!process.env.ORGANIZATION_SECRET || !process.env.API_VERSION) {
      throw new Error("Missing required environment variables");
    }
    // Call the Sensay API to create a new user and get the user UUID
    const resSensay = await fetch("https://api.sensay.io/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ORGANIZATION-SECRET": "60dac319b161b033ec23aa86d617ca17c9622c980d4b372b6d8f14149f2192df",
        "X-API-Version": "2025-05-10",
      },
      body: JSON.stringify({id:username})
    });
    const sensayUser = await resSensay.json();
    await User.create({
      name,
      username,
      password: hashedPassword,
      sensayUserId: sensayUser.id,
      is_admin: false, // Default to false
      image:
        "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_640.png",
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating the user",
        error: (error as Error)?.message ?? "Unexpected error",
      },
      { status: 500 }
    );
  }
}
