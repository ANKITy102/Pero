
import { Star, BookmarkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
interface WaveCardType{
    imageUrl:string,
    name:string,
    description:string,
    talks:number
}
export default function WaveCard({imageUrl,name,description,talks}:WaveCardType) {
  return (
    <Card className="max-w-sm overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={imageUrl} alt="Blue waves pattern" fill className="object-cover" />
      </div>
      <CardContent className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">{talks}</div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
          <BookmarkIcon className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}
