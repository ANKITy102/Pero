import React from "react";
import Header from "@/components/discover/header";
import Reviews from "@/components/discover/reviews";
import Recommendation from "@/components/discover/recommendation";
import { getReplicas } from "@/lib/actions/getReplicas";

const DiscoverPage = async () => {
 const res = await getReplicas();
 // res.replicas.item  contains replicas
 if (!res.success) {
   return <div className="text-6xl text-red-500">Something went wrong: {res.message}</div>;
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="container max-w-7xl mx-auto p-4 md:p-6">
        <Header />
        <Reviews />
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">For you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {res.replicas?.items && res.replicas.items.map((replica:any, i:number) => {
              return <Recommendation
                key={i}
                description={replica.introduction}
                imageUrl={replica.profile_image}
                name={replica.name}
                replicaId={replica.uuid}
              />
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
