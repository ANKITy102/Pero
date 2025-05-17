import CreateReplica from "@/components/create";
import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div className="flex min-h-screen container">
      <CreateReplica is_admin={!!session?.user.is_admin} />
    </div>
  );
};

export default page;
