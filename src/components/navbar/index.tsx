import React from "react";
import Link from "next/link";
import { Activity, Compass, Cpu, LayoutDashboard, LogIn, MessageCircle, Settings, Sliders, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Send } from "lucide-react";
import Image from "next/image";
import { DropdownMenuComp } from "./dropdown";
import { auth } from "@/lib/auth";
import TrainReplicaDrawer from "@/components/drawer";
export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}

const index = async () => {
  const session = await auth();
  return (
    <nav className="container  mx-auto flex items-center justify-between py-4 px-4 md:px-14 border-b-1 border-teal-800">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <div className="flex items-center">
            <span className="text-5xl italic font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Pero
            </span>
          </div>
        </Link>
      </div>
      {session?.user ? (
        <div className="flex items-center space-x-6">
          <Link
            href="/discover"
            className="text-white hover:text-green-300 flex items-center gap-1"
          >
            <LayoutDashboard size={18} />
            Discover
          </Link>
          <Link
            href="/create"
            className="text-white hover:text-green-300 flex items-center gap-1"
          >
            <Sparkles size={18} />
            Create
          </Link>
          <Link
            href="/request"
            className="text-white hover:text-green-300 flex items-center gap-1"
          >
            <MessageCircle  size={18} />
            Request
          </Link>
          <div
            className="text-white hover:text-green-300 flex items-center gap-1"
          >
            <TrainReplicaDrawer/>
          </div>

          <DropdownMenuComp imageUrl={session.user.image} />
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/register">
            <Button
              variant="secondary"
              className="text-lg font-md hover:cursor-pointer bg-transparent text-green-300 hover:text-black"
            >
              <UserPlus className="scale-125" /> Sign up
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="secondary"
              className="text-lg font-md hover:cursor-pointer bg-transparent text-green-300 hover:text-black"
            >
              <LogIn className="scale-125" /> Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default index;
