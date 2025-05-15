"use client";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, User, CreditCard } from "lucide-react";
import { signOut } from "next-auth/react";

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
        className="w-50 translate-x-4"
        sideOffset={8}
        align="end"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          Subscription
        </DropdownMenuItem>

        <DropdownMenuItem className="">
          <div className="flex gap-x-2" onClick={() => LOGOUT()}>
            <LogOut className="mr-2 h-4 w-4 text-red-600 " />
            <div className="text-red-600">Logout</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
