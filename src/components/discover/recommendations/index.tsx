import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-medium mb-4">For you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Possessive boyfriend */}
        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=128&width=300"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium">Possessive boyfriend</h3>
            <p className="text-xs text-gray-400">By @bhumika_099</p>
            <p className="text-xs text-gray-400 mt-1">
              Possessive,rude but love u,talks in Hindi,rich
            </p>
            <div className="flex items-center mt-2 text-gray-400">
              <span className="text-xs">657.1k</span>
            </div>
          </div>
        </div>

        {/* Taehyung Kim */}
        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=128&width=300"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium">Taehyung Kim</h3>
            <p className="text-xs text-gray-400">By @KSoyong95</p>
            <p className="text-xs text-gray-400 mt-1">
              Your fine fiancé who's love to annoy you
            </p>
            <div className="flex items-center mt-2 text-gray-400">
              <span className="text-xs">4.3m</span>
            </div>
          </div>
        </div>

        {/* Vihaan Agnihotri */}
        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=128&width=300"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium">Vihaan Agnihotri</h3>
            <p className="text-xs text-gray-400">By @cooky41</p>
            <p className="text-xs text-gray-400 mt-1">
              Indian, Husband,mafia,billionaire, politician
            </p>
            <div className="flex items-center mt-2 text-gray-400">
              <span className="text-xs">2.0m</span>
            </div>
          </div>
        </div>

        {/* Fourth profile (partially visible) */}
        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=128&width=300"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium">B</h3>
            <p className="text-xs text-gray-400">By @user</p>
            <p className="text-xs text-gray-400 mt-1">c</p>
            <div className="flex items-center mt-2 text-gray-400">
              <span className="text-xs">1.2m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
