import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import ReplicaRequest from "@/lib/models/replicaRequest.model"; // Adjust the path if needed

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { userId, requestedName, description } = body;
    if (!userId || !requestedName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newRequest = await ReplicaRequest.create({
      userId,
      requestedName,
      description,
      status: "not_started",
    });
    return NextResponse.json(
      { success: true, message: "Request submitted", data: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Replica Request Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

