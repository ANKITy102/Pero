"use server";

import { connectToDB } from "@/lib/mongoose";
import ReplicaRequest from "@/lib/models/replicaRequest.model";

export async function requestReplica({
  userId,
  requestedName,
  description,
}: {
  userId?: string | null;
  requestedName: string;
  description?: string;
}) {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User Id not found",
      };
    }
    await connectToDB();
    if (!userId || !requestedName) {
      return { success: false, message: "Missing required fields" };
    }
    const newRequest = await ReplicaRequest.create({
      userId,
      requestedName,
      description,
      status: "not_started",
    });
    // Convert mongoose document to plain JS object
    const plainRequest = newRequest.toObject();
    plainRequest._id = plainRequest._id.toString();
    plainRequest.userId = plainRequest.userId.toString();
    plainRequest.createdAt = plainRequest.createdAt.toISOString();
    plainRequest.updatedAt = plainRequest.updatedAt.toISOString();

    return {
      success: true,
      message: "Request submitted",
      data: plainRequest,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
