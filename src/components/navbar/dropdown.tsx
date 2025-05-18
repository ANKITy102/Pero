"use client";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, User, CreditCard, Inbox } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function DropdownMenuComp({ imageUrl }: { imageUrl: string }) {
  const LOGOUT = async () => {
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={imageUrl}
          width={40}
          height={40}
          alt="User Profile"
          className="rounded-full min-h-9 border-2 border-green-400 hover:cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50 translate-x-4 bg-green-100"
        sideOffset={8}
        align="end"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-400" />

        <DropdownMenuItem className="hover:cursor-pointer">
          <Link href="/profile" className="flex gap-2">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <Link href="/requests" className="flex gap-2">
            <Inbox className="mr-2 h-4 w-4" />
            Requests
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          Subscription
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:cursor-pointer">
          <div className="flex gap-x-2" onClick={() => LOGOUT()}>
            <LogOut className="mr-2 h-4 w-4 text-red-600 " />
            <div className="text-red-600">Logout</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
