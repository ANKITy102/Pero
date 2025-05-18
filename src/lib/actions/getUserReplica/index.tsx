"use server";

import { auth } from "@/lib/auth";
import { Replica } from "@/lib/types/types";

export async function getUserReplicas() {
  try {
    const session = await auth(); // Will work since it's a server action

    if (!session || !session.user?.sensayUserId) {
      return {
        success: false,
        message: "Unauthorized",
        status: 401,
      };
    }

    const res = await fetch("https://api.sensay.io/v1/replicas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
        "X-API-Version": process.env.API_VERSION!,
        "X-USER-ID": session.user.sensayUserId,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch replicas",
        error: data,
        status: res.status,
      };
    }
     const userReplicas = data.items.filter(
      (replica: Replica) => replica.ownerID === session.user.sensayUserId
    );

    return {
      success: true,
      replicas: userReplicas,
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching replicas:", error);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
}
