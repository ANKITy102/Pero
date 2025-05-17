"use server";

import ReplicaRequest from "@/lib/models/replicaRequest.model";
import { auth } from "@/lib/auth";
import { connectToDB } from "@/lib/mongoose";

export const getAllReplicaRequests = async () => {
  await connectToDB();
  const session = await auth();

  if (!session || !session.user) {
    return { success: false, message: "Unauthorized", data: [] };
  }

  try {
    let requests;

    if (session.user.is_admin) {
      // Admin: get all requests
      requests = await ReplicaRequest.find({ status: { $ne: "rejected" } })
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .lean();
      
    } else {
      // Normal user: only get their own requests
      requests = await ReplicaRequest.find({ userId: session.user.id })
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .lean();
    }
    requests = requests.map(req => JSON.parse(JSON.stringify(req)));

    return { success: true, data: requests };
  } catch (error) {
    console.error("Error fetching replica requests:", error);
    return { success: false, message: "Server error", data: [] };
  }
};
