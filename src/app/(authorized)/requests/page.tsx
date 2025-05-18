import RequestedCard from "@/components/requestedCard";
import { getAllReplicaRequests } from "@/lib/actions/getRequestedReplica";
import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const res = await getAllReplicaRequests();
  const session = await auth();
  const is_admin = session?.user.is_admin;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex mt-5 relative flex-col py-8">
        <div className="flex-1 px-12 py-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {is_admin ? "Manage Replica Requests" : "Your Requested Replicas"}
          </h2>

          {is_admin ? (
            <>
              <p className="text-white/80 mb-6">
                As an admin, you can view and manage all incoming replica requests from users.
                You can approve, reject, or mark replicas as in-progress — ensuring only high-quality replicas get created.
              </p>
              <ul className="text-white space-y-2 mb-6">
                <li>📩 Review incoming user requests for AI replicas</li>
                <li>🛠️ Update their status: Not Started, In Progress, Rejected, or Completed</li>
                <li>👀 Ensure the request aligns with platform guidelines</li>
              </ul>
              <div className="bg-yellow-100 text-yellow-900 text-sm p-3 rounded-md border-l-4 border-yellow-500">
                ⚠️ <strong>Note:</strong> A rejected replica will not be visible to anyone and is removed from the pipeline.
              </div>
            </>
          ) : (
            <>
              <p className="text-white/80 mb-6">
                Here you can track all the replicas you&apos;ve requested. Once approved by admins, they’ll be trained and available for interaction!
              </p>
              <ul className="text-white space-y-2 mb-6">
                <li>🧠 View status of your requested AI replicas</li>
                <li>🕒 Admins review each request manually — so it may take time</li>
                <li>🔄 You’ll be notified once your replica is ready to chat</li>
              </ul>
              <div className="bg-blue-100 text-blue-900 text-sm p-3 rounded-md border-l-4 border-blue-500">
                💡 <strong>Tip:</strong> The more meaningful and unique the replica idea, the higher its chance of approval!
              </div>
            </>
          )}
        </div>

        <div className="absolute top-5 left-0 w-8 h-8 border-t-2 border-r-2 -rotate-90 border-white/30"></div>
        <div className="absolute top-5 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-5 left-0 w-8 h-8 border-t-2 border-r-2 rotate-180 border-white/30"></div>
        <div className="absolute bottom-5 right-0 w-8 h-8 border-t-2 border-r-2 rotate-90 border-white/30"></div>
        <div className="absolute top-16 right-20 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      {res.data.length === 0 ? (
        <div className="text-white text-center text-lg py-20">
          🚫 No Requests Available.
        </div>
      ) : (
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {res.data.map((data, index) => (
            <RequestedCard
              key={index}
              _id={data._id}
              description={data.description}
              requestedName={data.requestedName}
              status={data.status}
              user={{
                name: data.userId.name,
                email: data.userId.email,
                is_admin: (!!is_admin),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
