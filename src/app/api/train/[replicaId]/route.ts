import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";

export async function POST(
  req: Request,
  { params }: { params: { replicaId: string } }
) {
  const { replicaId } = params;
  const { rawText } = await req.json();
  const session = await auth();
//   const session = {
//       user:{
//           sensayUserId:"admin"
//       }
//   }

  if (!session || !session.user?.sensayUserId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  if (!rawText) {
    return NextResponse.json(
      { success: false, message: "rawText is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Create new knowledge base
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
      return NextResponse.json(
        { success: false, message: "Failed to create knowledge base" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { success: false, message: "Training failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Replica trained successfully!",
      data: trainData
    });
  } catch (err) {
    console.error("Training error:", err);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
