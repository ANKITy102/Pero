import RequestedCard from "@/components/requestedCard";
import { getAllReplicaRequests } from "@/lib/actions/getRequestedReplica";
import React from "react";

const page = async () => {
  const res = await getAllReplicaRequests();
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {res.data.map((data, index) => {
          return (
            <RequestedCard
              key = {index}
              _id={data._id}
              description={data.description}
              requestedName={data.requestedName}
              status={data.status}
              user={{ name: data.userId.name , email: data.userId.email, is_admin:data.userId.is_admin }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
