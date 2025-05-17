
"use server"
import { auth } from "@/lib/auth";
import ReplicaRequest from "@/lib/models/replicaRequest.model";

export const updateRequestStatus = async ({
  requestId,
  status,
}: {
  requestId: string;
  status: "not_started" | "in_progress" | "rejected" | "completed";
}) => {
  try {
    const session = await auth();

    if (!session || !session.user.is_admin ) {
      return { success: false, message: "Unauthorized" };
    }

    await ReplicaRequest.findByIdAndUpdate(requestId, {
      status,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, message: "Server error" };
  }
};