"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import ReplicaCard from "@/components/discover/recommendation";
import { Cpu } from "lucide-react";

const dummyReplicas = [
  {
    replicaId: "1",
    name: "APJ Abdul Kalam",
    description: "Missile Man of India and former President of India",
    imageUrl: "https://sensay.io/assets/default-replica-profile.webp",
  },
  {
    replicaId: "2",
    name: "Swami Vivekananda",
    description: "Spiritual leader and philosopher who inspired generations.",
    imageUrl: "https://sensay.io/assets/default-replica-profile.webp",
  },
  {
    replicaId: "3",
    name: "Ratan Tata",
    description: "Indian industrialist and former chairman of Tata Group.",
    imageUrl: "https://sensay.io/assets/default-replica-profile.webp",
  },

  {
    replicaId: "4",
    name: "Swami Vivekananda",
    description: "Spiritual leader and philosopher who inspired generations.",
    imageUrl: "https://sensay.io/assets/default-replica-profile.webp",
  },
  {
    replicaId: "5",
    name: "Ratan Tata",
    description: "Indian industrialist and former chairman of Tata Group.",
    imageUrl: "https://sensay.io/assets/default-replica-profile.webp",
  },
];

export function TrainReplicaDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="text-white hover:cursor-pointer hover:text-green-300 flex items-center gap-1">
          {" "}
          <Cpu size={18} />
          Train
        </div>
      </DrawerTrigger>
        <DrawerContent className="bg-[#131316]  text-white">
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
              {dummyReplicas.map((replica) => (
                <ReplicaCard
                  key={replica.replicaId}
                  imageUrl={replica.imageUrl}
                  name={replica.name}
                  replicaId={replica.replicaId}
                  description={replica.description}
                />
              ))}
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-52 mx-auto text-black hover:cursor-pointer"
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
    </Drawer>
  );
}

export default TrainReplicaDrawer;
