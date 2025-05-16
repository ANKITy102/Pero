"use server";

import { auth } from "@/lib/auth";

export async function getChatResponse(replicaId: string, content: string) {
  try {
    const session = await auth();

    if (!session || !session.user?.sensayUserId) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }

    const res = await fetch(`https://api.sensay.io/v1/replicas/${replicaId}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Version": process.env.API_VERSION!,
        "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
        "X-USER-ID": session.user.sensayUserId,
      },
      body: JSON.stringify({ content }),
    });

    const responseData = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: "Chat failed",
        details: responseData,
        status: res.status,
      };
    }

    return {
      success: true,
      data: responseData,
      status: 200,
    };
  } catch (error) {
    console.error("Chat API Error:", error);
    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
}
