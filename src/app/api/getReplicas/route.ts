import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.sensayUserId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // const session = {
    //     user:{
    //         sensayUserId:"user2"
    //     }
    // }
    
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
      return NextResponse.json(
        { success: false, message: "Failed to fetch replicas", error: data },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { success: true, replicas: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching replicas:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
