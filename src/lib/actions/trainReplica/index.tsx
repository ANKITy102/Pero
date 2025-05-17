'use server';

import { auth } from "@/lib/auth";

export async function trainReplica(replicaId: string, rawText: string) {
  const session = await auth();

  if (!session || !session.user?.sensayUserId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!rawText) {
    return {
      success: false,
      message: "rawText is required",
    };
  }

  try {
    // 1. Create a new knowledge base
    const createRes = await fetch(
      `https://api.sensay.io/v1/replicas/${replicaId}/training`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
          "X-API-Version": process.env.API_VERSION!,
          "X-USER-ID": `${session.user.sensayUserId}`,
        },
        body: JSON.stringify({}),
      }
    );

    const createData = await createRes.json();
    const knowledgeBaseID = createData.knowledgeBaseID;

    if (!knowledgeBaseID) {
      return {
        success: false,
        message: "Failed to create knowledge base",
      };
    }

    // 2. Train with rawText
    const trainRes = await fetch(
      `https://api.sensay.io/v1/replicas/${replicaId}/training/${knowledgeBaseID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
          "X-API-Version": process.env.API_VERSION!,
        },
        body: JSON.stringify({ rawText }),
      }
    );

    const trainData = await trainRes.json();

    if (!trainData.success) {
      return {
        success: false,
        message: "Training failed",
      };
    }
    console.log(trainData);
    return {
      success: true,
      message: "Replica trained successfully!",
      data: trainData,
    };
  } catch (err) {
    console.error("Training error:", err);
    return {
      success: false,
      message: "Internal error",
    };
  }
}
