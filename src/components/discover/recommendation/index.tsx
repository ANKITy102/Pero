import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CardProps {
  imageUrl: string;
  name:string;
  replicaId:string;
  description: string;
  isTrain?:boolean
  chatCount?:number
}

const Index: React.FC<CardProps> = ({ imageUrl,name,replicaId,description, isTrain=false, chatCount=0 }) => {
  const totalTalks = Math.floor(Math.random() * (200 - 10 + 1)) + 10;
  return (
    <Link
    href={isTrain?`/train/${replicaId}`:`/chat/${replicaId}`}
    className="bg-[#080808] bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_70%)]
  h-[19rem] flex flex-col rounded-3xl w-full overflow-hidden"
    >
      <div className="relative h-[54%] w-full">
        <img
          src={imageUrl}
          alt="Card image"
          className="absolute inset-0 w-full h-full object-cover object-top rounded-t-3xl"
        />
        <div className="absolute w-full h-full bg-gradient-to-br from-black/50 via-black/10 to-black/50 z-10 rounded-t-3xl"></div>
      </div>
      <div className="p-3 flex flex-col h-[46%] justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-1 text-gray-400 mb-2">
          <MessageSquare className="h-4 w-4 translate-y-[1px] " />
          <span className="text-xs">Total Talks : {chatCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default Index;
