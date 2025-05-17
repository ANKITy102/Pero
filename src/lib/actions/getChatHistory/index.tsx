"use server";
import { auth } from "@/lib/auth";
export async function getChatHistory(replicaId: string) {
  try {
    const session = await auth();

    if (!session || !session.user?.sensayUserId) {
      return {
        success: false,
        message: "Unauthorized",
        status: 401,
      };
    }
    const res = await fetch(`https://api.sensay.io/v1/replicas/${replicaId}/chat/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Version": process.env.API_VERSION!,
        "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
        "X-USER-ID": session.user.sensayUserId,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch chat history",
        error: data,
        status: res.status,
      };
    }

    return {
      success: true,
      data,
      status: 200,
    };
  } catch (err) {
    console.error("Chat History Error:", err);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
}