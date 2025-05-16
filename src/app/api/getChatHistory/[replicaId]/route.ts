import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { replicaId: string } }) {
  try {
    const session = await auth();
    if (!session || !session.user?.sensayUserId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    // const session = {
    //     user:{
    //         sensayUserId:"user1"
    //     }
    // }
    const replicaId = params.replicaId;

    const res = await fetch(`https://api.sensay.io/v1/replicas/${replicaId}/chat/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Version": process.env.API_VERSION!,
        "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
        "X-USER-ID": session.user.sensayUserId,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "Failed to fetch chat history", details: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Chat History Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
