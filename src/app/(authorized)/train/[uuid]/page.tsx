import TrainReplica from "@/components/trainReplica";
import { getReplica } from "@/lib/actions/getReplica";
import React, { FC } from "react";


const Page = async ({
  params,
}: {
  params: Promise<{ uuid: string }>
}) => {
  const { uuid: replicaId } = await params;
  const response2 = await getReplica(replicaId);
  if (!response2 || response2.success == false) {
    return (
      <div className="  text-white">
        <div className="container text-4xl max-w-5xl mx-auto p-4 md:p-6">
          Something went wrong. Try again!
        </div>
      </div>
    );
  }
  return (
    <div>
      <TrainReplica
        replicaId={replicaId}
        replicaName={response2.replica.name}
      />
    </div>
  );
};

export default Page;
