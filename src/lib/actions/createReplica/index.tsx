"use server";

import { auth } from "@/lib/auth";

export async function createReplica({
  name,
  shortDescription,
  greeting,
  slug,
  image,
  isPrivate = true,
}: {
  name: string;
  shortDescription: string;
  greeting: string;
  slug: string;
  image:string;
  isPrivate?: boolean;
}) {
  try {
    const session = await auth();
    console.log("got here1", session);
    if (!session || !session.user?.sensayUserId) {
      return { success: false, message: "Unauthorized" };
    }
    if (session.user.is_admin) isPrivate = false;
    const res = await fetch("https://api.sensay.io/v1/replicas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
        "X-API-Version": process.env.API_VERSION!,
      },
      body: JSON.stringify({
        name,
        shortDescription,
        greeting,
        profileImage:image,
        ownerID: session.user.sensayUserId,
        private: isPrivate,
        slug,
        llm: {
          provider: "openai",
          model: "gpt-4o",
        },
      }),
    });
    
    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: "Failed to create replica",
        error: data,
      };
    }
    console.log("finally,",data);
    return { success: true, replica: data };
  } catch (error) {
    console.error("Error in createReplica:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
