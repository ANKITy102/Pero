import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.sensayUserId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    // const session = {
    //     user:{
    //         sensayUserId:"admin"
    //     }
    // }

    const body = await req.json();
    const { name, shortDescription, greeting, slug, isPrivate = false } = body;

    if (!name || !shortDescription || !greeting || !slug) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

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

    if (!res.ok) {
      return NextResponse.json({ success: false, message: "Failed to create replica", error: data }, { status: res.status });
    }

    return NextResponse.json({ success: true, replica: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating replica:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
