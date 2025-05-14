import React from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";
const index = () => {
  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-12 border-b-1 border-teal-800">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <div className="flex items-center">
            <span className="text-5xl italic font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Pero
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 rounded-full p-2">
          <User className="h-5 w-5 text-white" />
        </button>
        <button className="text-white">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default index;
