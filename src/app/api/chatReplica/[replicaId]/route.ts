import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, { params }: { params: { replicaId: string } }) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const session = await auth();
    if (!session || !session.user?.sensayUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const session = {
    //   user: {
    //     sensayUserId: "user1"
    //   }
    // };

    const replicaId = params.replicaId;

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

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "Chat failed", details: errorData }, { status: res.status });
    }

    const responseData = await res.json();
    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
