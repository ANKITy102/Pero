import {  BookmarkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WaveCardType {
  imageUrl: string;
  name: string;
  description: string;
  talks: number;
}

export default function WaveCard({
  imageUrl,
  name,
  description,
  talks,
}: WaveCardType) {
  return (
    <Card className="max-w-sm m-auto flex overflow-hidden py-0">
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt="Blue waves pattern"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="px-5 py-5">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="mt-2 text-gray-600">{description}</p>

        <div className="mt-4 flex items-center justify-between text-md text-gray-700">
          <div>{talks}</div>
          <div>
            <BookmarkIcon size={40} className="h-5 w-5 hover:cursor-pointer text-gray-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}