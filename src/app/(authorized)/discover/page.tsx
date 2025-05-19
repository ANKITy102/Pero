import React from "react";
import Header from "@/components/discover/header";
import Recommendation from "@/components/discover/recommendation";
import { getReplicas } from "@/lib/actions/getReplicas";
import { auth } from "@/lib/auth";
import { Replica } from "@/lib/types/types";
import Banner from "@/components/discover/reviews";
const DiscoverPage = async () => {
  const res = await getReplicas();
  const session = await auth();
  // res.replicas.item  contains replicas
  if (!res.success) {
    return (
      <div className="text-6xl text-red-500">
        Something went wrong: {res.message}
      </div>
    );
  }
  return (
    <div className="min-h-screen  text-white">
      <div className="container max-w-7xl mx-auto p-4 md:p-6">
        <Header />
        <Banner />
        {session?.user.is_admin && (
          <div className="mt-10">
            <h2 className="text-xl font-medium mb-4">For you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {res.replicas?.items &&
                res.replicas.items.map((replica: Replica, i: number) => {
                  return (
                    <Recommendation
                      key={i}
                      description={replica.introduction}
                      imageUrl={replica.profile_image}
                      name={replica.name}
                      replicaId={replica.uuid}
                      chatCount={replica.chat_history_count}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {!session?.user.is_admin && (
          <>
            <div className="mt-10">
              <h2 className="text-xl font-medium mb-4">For you</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {res.replicas?.items &&
                  res.replicas.items.map((replica: Replica, i: number) => {
                    if (replica.ownerID != session?.user.sensayUserId)
                      return (
                        <Recommendation
                          key={i}
                          description={replica.introduction}
                          imageUrl={replica.profile_image}
                          name={replica.name}
                          replicaId={replica.uuid}
                          chatCount={replica.chat_history_count}
                        />
                      );
                  })}
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-xl font-medium mb-4">Your replica</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {res.replicas?.items &&
                  res.replicas.items.map((replica: Replica, i: number) => {
                    if (replica.ownerID == session?.user.sensayUserId)
                      return (
                        <Recommendation
                          key={i}
                          description={replica.introduction}
                          imageUrl={replica.profile_image}
                          name={replica.name}
                          replicaId={replica.uuid}
                          chatCount={replica.chat_history_count}
                        />
                      );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
