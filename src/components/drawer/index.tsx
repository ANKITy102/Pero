"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import ReplicaCard from "@/components/discover/recommendation";
import { Cpu } from "lucide-react";

type TrainReplicaDrawerProps = {
  replicas: {
    uuid: string;
    name: string;
    profileImage: string;
    shortDescription: string;
  }[];
};

export function TrainReplicaDrawer({ replicas }: TrainReplicaDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="text-white hover:cursor-pointer hover:text-green-300 flex items-center gap-1">
          <Cpu size={18} />
          Train
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-[#131316] pb-10 text-white">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader>
            <DrawerTitle className="text-white text-2xl font-bold">
              Train Your Replica
            </DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Select a replica you want to train.
            </DrawerDescription>
          </DrawerHeader>

          <Separator className="mt-4 mb-8 bg-gray-700" />


          <div className="grid grid-cols-1 md:grid-cols-3 max-h-[56vh] overflow-y-scroll custom-scrollbar gap-16 px-4 pb-6">
            {replicas.map((replica) => (
              <ReplicaCard
                key={replica.uuid}
                imageUrl={replica.profileImage}
                name={replica.name}
                replicaId={replica.uuid}
                description={replica.shortDescription}
                isTrain={true}
              />
            ))}
          </div>
          
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default TrainReplicaDrawer;
