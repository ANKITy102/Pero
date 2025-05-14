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


/*

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import ReplicaRequest from "@/lib/models/replicaRequest.model";
import { auth } from "@/auth"; // Adjust path if different

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const { requestedName, description } = body;

    if (!requestedName) {
      return NextResponse.json(
        { success: false, message: "requestedName is required" },
        { status: 400 }
      );
    }

    await connectToDB();

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
    console.error("Error creating replica request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

*/