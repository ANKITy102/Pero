import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose"; // adjust the path as needed

export async function GET() {
  try {
    await connectToDB();
    return NextResponse.json({ success: true, message: "Connected to DB successfully!" });
  } catch (error) {
    console.error("API Test Error:", error);
    return NextResponse.json({ success: false, message: "Connection failed", error });
  }
}
